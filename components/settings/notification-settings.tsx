"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Mail, MessageSquare, Users, Calendar, AlertTriangle, Edit } from "lucide-react"

interface NotificationCategory {
  id: string
  name: string
  description: string
  notifications: NotificationType[]
}

interface NotificationType {
  id: string
  name: string
  description: string
  channels: {
    email: boolean
    sms: boolean
    push: boolean
    inApp: boolean
  }
  template: string
  variables: string[]
  isActive: boolean
}

export default function NotificationSettings() {
  const [categories, setCategories] = useState<NotificationCategory[]>([
    {
      id: "class-schedule",
      name: "Class & Schedule",
      description: "Notifications related to classes, schedules, and course activities",
      notifications: [
        {
          id: "class-reminder",
          name: "Class Reminder",
          description: "Notify students about upcoming classes",
          channels: { email: true, sms: true, push: true, inApp: true },
          template: "Dear {{studentName}}, your {{courseName}} class is scheduled for {{classTime}} on {{date}}. Please join on time.",
          variables: ["studentName", "courseName", "classTime", "date", "instructor"],
          isActive: true
        },
        {
          id: "schedule-change",
          name: "Schedule Change",
          description: "Notify about any changes in class schedules",
          channels: { email: true, sms: false, push: true, inApp: true },
          template: "SCHEDULE UPDATE: Your {{courseName}} class has been rescheduled from {{oldTime}} to {{newTime}} on {{date}}.",
          variables: ["courseName", "oldTime", "newTime", "date", "reason"],
          isActive: true
        },
        {
          id: "class-cancelled",
          name: "Class Cancelled",
          description: "Notify about class cancellations",
          channels: { email: true, sms: true, push: true, inApp: true },
          template: "CANCELLED: Your {{courseName}} class on {{date}} at {{time}} has been cancelled. {{reason}}",
          variables: ["courseName", "date", "time", "reason", "makeupDate"],
          isActive: true
        }
      ]
    },
    {
      id: "staff-management",
      name: "Staff & Management",
      description: "Notifications for staff members and management activities",
      notifications: [
        {
          id: "leave-request",
          name: "Leave Request",
          description: "Notify managers about leave requests",
          channels: { email: true, sms: false, push: true, inApp: true },
          template: "Leave Request: {{staffName}} has requested {{leaveType}} from {{startDate}} to {{endDate}}. Reason: {{reason}}",
          variables: ["staffName", "leaveType", "startDate", "endDate", "reason"],
          isActive: true
        },
        {
          id: "attendance-alert",
          name: "Attendance Alert",
          description: "Alert about staff attendance issues",
          channels: { email: true, sms: false, push: false, inApp: true },
          template: "ATTENDANCE ALERT: {{staffName}} has been marked absent for {{date}}. Current month attendance: {{percentage}}%",
          variables: ["staffName", "date", "percentage", "manager"],
          isActive: true
        }
      ]
    },
    {
      id: "system-updates",
      name: "Reminder",
      description: "System notifications and important updates",
      notifications: [
        {
          id: "payment-due",
          name: "Payment Due",
          description: "Remind students about pending payments",
          channels: { email: true, sms: true, push: false, inApp: true },
          template: "Payment Reminder: Your {{courseName}} fee of {{amount}} is due on {{dueDate}}. Please make payment to avoid service interruption.",
          variables: ["studentName", "courseName", "amount", "dueDate", "paymentLink"],
          isActive: true
        },
        {
          id: "system-maintenance",
          name: "System Maintenance",
          description: "Notify users about system maintenance",
          channels: { email: true, sms: false, push: true, inApp: true },
          template: "SYSTEM MAINTENANCE: Our platform will be under maintenance from {{startTime}} to {{endTime}} on {{date}}. Services will be temporarily unavailable.",
          variables: ["startTime", "endTime", "date", "services"],
          isActive: true
        }
      ]
    }
  ])

  const [editingTemplate, setEditingTemplate] = useState<{
    categoryId: string
    notificationId: string
    template: string
    variables: string[]
  } | null>(null)

  const toggleNotification = (categoryId: string, notificationId: string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            notifications: cat.notifications.map(notif =>
              notif.id === notificationId
                ? { ...notif, isActive: !notif.isActive }
                : notif
            )
          }
        : cat
    ))
  }

  const toggleChannel = (categoryId: string, notificationId: string, channel: keyof NotificationType['channels']) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? {
            ...cat,
            notifications: cat.notifications.map(notif =>
              notif.id === notificationId
                ? { 
                    ...notif, 
                    channels: { 
                      ...notif.channels, 
                      [channel]: !notif.channels[channel] 
                    } 
                  }
                : notif
            )
          }
        : cat
    ))
  }

  const openTemplateEditor = (categoryId: string, notificationId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    const notification = category?.notifications.find(notif => notif.id === notificationId)
    
    if (notification) {
      setEditingTemplate({
        categoryId,
        notificationId,
        template: notification.template,
        variables: notification.variables
      })
    }
  }

  const saveTemplate = () => {
    if (!editingTemplate) return

    setCategories(categories.map(cat =>
      cat.id === editingTemplate.categoryId
        ? {
            ...cat,
            notifications: cat.notifications.map(notif =>
              notif.id === editingTemplate.notificationId
                ? { 
                    ...notif, 
                    template: editingTemplate.template,
                    variables: editingTemplate.variables
                  }
                : notif
            )
          }
        : cat
    ))
    setEditingTemplate(null)
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email": return <Mail className="h-4 w-4" />
      case "sms": return <MessageSquare className="h-4 w-4" />
      case "push": return <Bell className="h-4 w-4" />
      case "inApp": return <AlertTriangle className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "class-schedule": return <Calendar className="h-5 w-5 text-purple-600" />
      case "staff-management": return <Users className="h-5 w-5 text-purple-600" />
      case "system-updates": return <AlertTriangle className="h-5 w-5 text-purple-600" />
      default: return <Bell className="h-5 w-5 text-purple-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-purple-600" />
            Notification Settings
          </CardTitle>
          <p className="text-sm text-gray-600">
            Configure notification preferences across different categories with customizable templates and delivery channels
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {categories.reduce((total, cat) => total + cat.notifications.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Notifications</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {categories.reduce((total, cat) => 
                  total + cat.notifications.filter(n => n.isActive).length, 0
                )}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {categories.length}
              </div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-gray-600">Channels</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Categories */}
      <Tabs defaultValue={categories[0]?.id} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              {getCategoryIcon(category.id)}
              <span>{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getCategoryIcon(category.id)}
                  {category.name}
                </CardTitle>
                <p className="text-sm text-gray-600">{category.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {category.notifications.map((notification) => (
                    <div key={notification.id} className="border rounded-lg p-4 space-y-4">
                      {/* Notification Header */}
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{notification.name}</h4>
                            <Badge variant={notification.isActive ? "default" : "secondary"}>
                              {notification.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{notification.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={notification.isActive}
                            onCheckedChange={() => toggleNotification(category.id, notification.id)}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openTemplateEditor(category.id, notification.id)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit Template
                          </Button>
                        </div>
                      </div>

                      {/* Delivery Channels */}
                      <div>
                        <Label className="text-sm font-medium">Delivery Channels</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                          {Object.entries(notification.channels).map(([channel, enabled]) => (
                            <div key={channel} className="flex items-center space-x-2 p-2 border rounded">
                              {getChannelIcon(channel)}
                              <span className="text-sm capitalize">{channel === "inApp" ? "In-App" : channel}</span>
                              <Switch
                                checked={enabled}
                                onCheckedChange={() => toggleChannel(category.id, notification.id, channel as keyof NotificationType['channels'])}
                                size="sm"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Template Preview */}
                      <div>
                        <Label className="text-sm font-medium">Template Preview</Label>
                        <div className="mt-2 p-3 bg-gray-50 rounded border text-sm">
                          {notification.template}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {notification.variables.map((variable) => (
                            <Badge key={variable} variant="outline" className="text-xs">
                              {`{{${variable}}}`}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Template Editor Dialog */}
      <Dialog open={!!editingTemplate} onOpenChange={(open) => !open && setEditingTemplate(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Notification Template</DialogTitle>
          </DialogHeader>
          {editingTemplate && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="template">Template Content</Label>
                <Textarea
                  id="template"
                  value={editingTemplate.template}
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate,
                    template: e.target.value
                  })}
                  rows={6}
                  placeholder="Enter your notification template..."
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Available Variables</Label>
                <div className="flex flex-wrap gap-2 mt-2 p-3 bg-gray-50 rounded border">
                  {editingTemplate.variables.map((variable) => (
                    <Badge 
                      key={variable} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-purple-50"
                      onClick={() => {
                        const textarea = document.getElementById("template") as HTMLTextAreaElement
                        if (textarea) {
                          const cursorPos = textarea.selectionStart
                          const textBefore = editingTemplate.template.substring(0, cursorPos)
                          const textAfter = editingTemplate.template.substring(cursorPos)
                          const newTemplate = textBefore + `{{${variable}}}` + textAfter
                          setEditingTemplate({
                            ...editingTemplate,
                            template: newTemplate
                          })
                          setTimeout(() => {
                            textarea.focus()
                            textarea.setSelectionRange(cursorPos + variable.length + 4, cursorPos + variable.length + 4)
                          }, 0)
                        }
                      }}
                    >
                      {`{{${variable}}}`}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Click on a variable to insert it at the cursor position
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Preview</h4>
                <p className="text-sm text-blue-700">{editingTemplate.template}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTemplate(null)}>
              Cancel
            </Button>
            <Button onClick={saveTemplate} className="bg-purple-600 hover:bg-purple-700">
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}