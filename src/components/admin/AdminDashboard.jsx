import { useState } from 'react'
import { LogOut, RefreshCw, QrCode, Users, Keyboard, BarChart3, Sparkles } from 'lucide-react'
import { useAdminStats } from '../../hooks/useRegistrations'
import StatsCards from './StatsCards'
import InsightsPanel from './InsightsPanel'
import ScannerPanel from './ScannerPanel'
import RegistrantsPanel from './RegistrantsPanel'
import ManualEntryPanel from './ManualEntryPanel'
import RafflePanel from './RafflePanel'

const TABS = [
  { id: 'insights', label: 'Insights', icon: BarChart3 },
  { id: 'scanner', label: 'Scanner', icon: QrCode },
  { id: 'list', label: 'List', icon: Users },
  { id: 'manual', label: 'Manual', icon: Keyboard },
  { id: 'raffle', label: 'Raffle', icon: Sparkles },
]

export default function AdminDashboard() {
  const [tab, setTab] = useState('insights')
  const [refreshing, setRefreshing] = useState(false)
  const { stats, loading, refresh } = useAdminStats()

  function handleLogout() {
    sessionStorage.removeItem('kcblendz-admin-authed')
    window.location.reload()
  }

  async function handleRefresh() {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="font-display font-bold text-ink text-sm sm:text-base">KcBlendz Admin</h1>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 text-neutral hover:text-ink text-sm px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-neutral hover:text-ink text-sm px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6">
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <StatsCards stats={stats} />

            <div>
              <div className="flex gap-1 sm:gap-2 mb-4 bg-white rounded-xl p-1.5 shadow-soft">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTab(id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg py-2.5 font-medium text-xs sm:text-sm transition-colors duration-200 min-h-11 ${
                      tab === id ? 'bg-lime text-ink' : 'text-neutral hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={16} className="shrink-0" />
                    <span className="truncate">{label}</span>
                  </button>
                ))}
              </div>

              {tab === 'insights' && <InsightsPanel stats={stats} />}
              {tab === 'scanner' && <ScannerPanel />}
              {tab === 'list' && (
                <RegistrantsPanel stats={stats} loading={loading} refresh={refresh} />
              )}
              {tab === 'manual' && <ManualEntryPanel />}
              {tab === 'raffle' && <RafflePanel stats={stats} />}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 h-24" />
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 h-80" />
    </div>
  )
}
