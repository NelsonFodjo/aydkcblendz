import { CalendarDays, UserPlus, MapPin, Sparkles, Megaphone } from 'lucide-react'
import { formatTimestamp } from '../../utils/formatters'

const COLORS = ['bg-lime', 'bg-gold', 'bg-coral', 'bg-ink', 'bg-neutral']

function Card({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="text-ink" size={16} />
        <h3 className="font-display font-semibold text-sm text-ink">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function EmptyState() {
  return <p className="text-sm text-neutral text-center py-10">No data yet</p>
}

function RegistrationTimeline({ data }) {
  const max = Math.max(...data.map((d) => d.count), 1)
  return (
    <Card icon={CalendarDays} title="Registration Timeline">
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex items-end gap-2 h-40">
          {data.map((d) => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full bg-lime rounded-t-md transition-all duration-500"
                  style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count > 0 ? '4px' : 0 }}
                />
              </div>
              <span className="text-[10px] text-neutral">
                {new Date(d.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
              </span>
              <span className="text-xs font-medium text-ink">{d.count}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

function RecentActivity({ data }) {
  return (
    <Card icon={UserPlus} title="Recent Registrations">
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {data.map((r) => (
            <div key={r.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-lime/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-ink">{(r.name || '?')[0].toUpperCase()}</span>
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm text-ink truncate">{r.name || 'Unknown'}</p>
                <p className="text-xs text-neutral truncate">
                  {r.deanery}
                  {r.created_at && ` · ${formatTimestamp(r.created_at)}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

function DeaneryChart({ data }) {
  return (
    <Card icon={MapPin} title="By Deanery">
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-2.5">
          {data.map((d, i) => {
            const max = data[0]?.count || 1
            return (
              <div key={d.deanery}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="truncate font-medium text-ink">{d.deanery}</span>
                  <span className="text-neutral ml-2 shrink-0">{d.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${COLORS[i % COLORS.length]}`}
                    style={{ width: `${(d.count / max) * 100}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}

function ProductChart({ data }) {
  return (
    <Card icon={Sparkles} title="Product Interest">
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="space-y-2">
          {data.map((d, i) => (
            <li key={d.product} className="flex items-center gap-2 text-sm">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${COLORS[i % COLORS.length]}`} />
              <span className="flex-1 truncate text-ink">{d.product}</span>
              <span className="text-neutral">{d.percentage}%</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

function SourceChart({ data }) {
  const max = Math.max(...data.map((d) => d.count), 1)
  return (
    <Card icon={Megaphone} title="How They Found Us">
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-2.5">
          {data.map((d, i) => (
            <div key={d.source}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="truncate font-medium text-ink">{d.source}</span>
                <span className="text-neutral ml-2 shrink-0">{d.count}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${COLORS[i % COLORS.length]}`}
                  style={{ width: `${(d.count / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

export default function InsightsPanel({ stats }) {
  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RegistrationTimeline data={stats.dailyRegistrations} />
        </div>
        <RecentActivity data={stats.recentRegistrations} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DeaneryChart data={stats.topDeaneries} />
        <ProductChart data={stats.productBreakdown} />
        <SourceChart data={stats.sourceBreakdown} />
      </div>
    </div>
  )
}
