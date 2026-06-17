import { Users, CheckCircle, Clock, TrendingUp } from 'lucide-react'

export default function StatsCards({ stats }) {
  const items = [
    { label: 'Total Interest', value: stats.total, icon: Users },
    { label: 'Verified', value: stats.verified, icon: CheckCircle },
    { label: 'Pending', value: stats.pending, icon: Clock },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: TrendingUp },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((item) => (
        <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-neutral uppercase tracking-wide">
              {item.label}
            </p>
            <div className="w-8 h-8 rounded-lg bg-lime/15 flex items-center justify-center shrink-0">
              <item.icon className="text-ink" size={16} />
            </div>
          </div>
          <p className="font-display font-bold text-2xl sm:text-3xl text-ink">{item.value}</p>
          {item.label === 'Conversion Rate' && (
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-lime rounded-full transition-all duration-500"
                style={{ width: `${stats.conversionRate}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
