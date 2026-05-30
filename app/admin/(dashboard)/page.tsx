import { AdminDashboardHome } from "@/components/admin/dashboard-home"
import { getPortfolio } from "@/lib/cms/queries/get-portfolio"
import { isDatabaseConfigured } from "@/lib/cms/db"

export default async function AdminDashboardPage() {
  const portfolio = await getPortfolio()

  return (
    <AdminDashboardHome portfolio={portfolio} dbConnected={isDatabaseConfigured()} />
  )
}
