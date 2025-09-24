import MainLayout from "@/components/main-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function FinancialIncomePage() {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Financial Income</h1>
        <Card>
          <CardHeader>
            <CardTitle>Income Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Income tracking and analytics will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}