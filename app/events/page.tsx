import MainLayout from "@/components/main-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function EventsPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Events</h1>
        <Card>
          <CardHeader>
            <CardTitle>Event Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Event management and scheduling will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}