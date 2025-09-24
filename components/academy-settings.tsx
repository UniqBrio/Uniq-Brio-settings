"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Settings, 
  Calendar, 
  Users, 
  Bell, 
  DollarSign, 
  Award, 
  Clock, 
  BookOpen,
  Building,
  ExternalLink,
  CreditCard,
  User
} from "lucide-react"
import BranchGridIcon from "@/components/ui/branch-grid-icon"
import BranchWiseSettings from "@/components/settings/branch-wise-settings"

// Import all the settings components
import GeneralSettings from "@/components/settings/general-settings"
import CategorySettings from "@/components/settings/category-settings"
import LeavePolicySettings from "@/components/settings/leave-policy-settings"
import NotificationSettings from "@/components/settings/notification-settings"
import UserManagementSettings from "@/components/settings/user-management-settings"
import FinancialSettings from "@/components/settings/financial-settings"
import AwardsSettings from "@/components/settings/awards-settings"
import ReminderSettings from "@/components/settings/reminder-settings"
import PaymentSettings from "@/components/settings/payment-settings"
import ProfileSettings from "@/components/settings/profile-settings"

export default function AcademySettings() {
  const [activeTab, setActiveTab] = useState("general")

  const settingsTabs = [
   
    {
      id: "general",
      label: "General Settings",
      icon: <Settings className="h-4 w-4" />,
      component: GeneralSettings
    },
    // {
    //   id: "categories", 
    //   label: "Categories",
    //   icon: <BookOpen className="h-4 w-4" />,
    //   component: CategorySettings
    // },
    {
      id: "leave-policies",
      label: "Leave Policies", 
      icon: <Calendar className="h-4 w-4" />,
      component: LeavePolicySettings
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="h-4 w-4" />,
      component: NotificationSettings
    },
    {
      id: "payments",
      label: "Payment Settings",
      icon: <CreditCard className="h-4 w-4" />,
      component: PaymentSettings
    },
    {
      id: "profile",
      label: "Profile Settings",
      icon: <User className="h-4 w-4" />,
      component: ProfileSettings
    }
    // {
    //   id: "user-management",
    //   label: "User Management",
    //   icon: <Users className="h-4 w-4" />,
    //   component: UserManagementSettings
    // },
    // {
    //   id: "financials",
    //   label: "Financial Settings", 
    //   icon: <DollarSign className="h-4 w-4" />,
    //   component: FinancialSettings
    // },
    // {
    //   id: "awards",
    //   label: "Awards & Recognition",
    //   icon: <Award className="h-4 w-4" />,
    //   component: AwardsSettings
    // }
    // Reminders tab removed - content now available in Notifications page
  ]

  return (
    <div className="container mx-auto ">
      {/* Header */}
      {/* Settings Content */}
      <Card className="w-full min-h-[600px] flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col flex-1">
          <div className="sticky top-0 z-20 bg-gray-50">
            <div className="flex justify-between items-start px-4 pt-4" >
              <div>
                <h1 className="text-3xl font-bold text-purple-700 mb-2">Academy Settings</h1>
                <p className="text-gray-600">
                  Comprehensive settings management for your academy with advanced configuration options.
                </p>
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                onClick={() => window.open('#', '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                Academy Settings Page Reference
              </Button>
            </div>
            <div className="border-b">
              <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 min-h-20 md:grid-cols-5 lg:grid-cols-5 gap-3 bg-transparent px-2 pb-4 justify-center z-10 relative bg-none mb-10">
                {settingsTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex flex-col items-center justify-center w-70 h-9 px-3 py-2 rounded-lg border-2 transition-all font-medium text-sm
                      data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:border-purple-500
                      data-[state=inactive]:bg-[#fafbfc] data-[state=inactive]:text-orange-500 data-[state=inactive]:border-orange-400"
                  >
                    {tab.icon}
                    <span className="whitespace-nowrap mt-1">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="p-6">
              {settingsTabs.map((tab) => {
                const Component = tab.component as React.ComponentType<any>
                // Ensure tab.id is always a string
                if (!tab.id) return null;
                return (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0">
                    {Component ? <Component /> : null}
                  </TabsContent>
                )
              })}
            </div>
          </div>
        </Tabs>
      </Card>
    </div>
  )
}