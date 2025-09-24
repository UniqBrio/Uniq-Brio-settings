import MainLayout from "@/components/main-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function FinancialExpensesPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Financial Expenses</h1>
        <Card>
          <CardHeader>
            <CardTitle>Expenses Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Expense tracking and analytics will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}