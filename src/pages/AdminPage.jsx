import { useState } from 'react'
import AdminPinGate from '../components/admin/AdminPinGate'
import AdminDashboard from '../components/admin/AdminDashboard'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('kcblendz-admin-authed') === 'true',
  )

  if (!authenticated) {
    return <AdminPinGate onAuthenticated={() => setAuthenticated(true)} />
  }

  return <AdminDashboard />
}
