"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Bell, Users, BookOpen, Edit, Plus, Trash2, ArrowUp } from "lucide-react"

interface ReminderConfig {
  id: string
  name: string
  description: string
  frequency: "daily" | "weekly" | "monthly" | "custom"
  customDays?: number
  followUpPlan: FollowUpStep[]
  linkedCourses: string[]
  targetAudience: "students" | "staff" | "parents" | "all"
  isActive: boolean
  createdAt: string
}

interface FollowUpStep {
  id: string
  sequence: number
  action: string
  delayDays: number
  escalateTo?: string
  template: string
  isRequired: boolean
}

export default function ReminderSettings() {
  const [reminders, setReminders] = useState<ReminderConfig[]>([
    {
      id: "1",
      name: "Course Enrollment Reminder",
      description: "Remind students about upcoming course enrollment deadlines",
      frequency: "weekly",
      followUpPlan: [
        {
          id: "1",
          sequence: 1,
          action: "Email Reminder",
          delayDays: 0,
          template: "Your enrollment deadline for {{courseName}} is approaching. Please complete your registration by {{deadline}}.",
          isRequired: true
        },
        {
          id: "2",
          sequence: 2,
          action: "SMS Alert",
          delayDays: 3,
          template: "URGENT: Course enrollment deadline in 3 days. Register now for {{courseName}}.",
          isRequired: false
        },
        {
          id: "3",
          sequence: 3,
          action: "Phone Call",
          delayDays: 7,
          escalateTo: "Course Coordinator",
          template: "Personal call to discuss enrollment status and provide assistance.",
          isRequired: true
        }
      ],
      linkedCourses: ["Music Theory", "Advanced Piano", "Guitar Basics"],
      targetAudience: "students",
      isActive: true,
      createdAt: "2025-01-15"
    },
    {
      id: "2",
      name: "Payment Due Notification",
      description: "Multi-step payment reminder system with escalation",
      frequency: "monthly",
      followUpPlan: [
        {
          id: "1",
          sequence: 1,
          action: "Gentle Reminder",
          delayDays: 0,
          template: "Friendly reminder: Your course fee of {{amount}} is due on {{dueDate}}. Please pay at your earliest convenience.",
          isRequired: true
        },
        {
          id: "2",
          sequence: 2,
          action: "Urgent Notice",
          delayDays: 7,
          template: "URGENT: Your payment of {{amount}} is now overdue. Please pay immediately to avoid service interruption.",
          isRequired: true
        },
        {
          id: "3",
          sequence: 3,
          action: "Manager Escalation",
          delayDays: 14,
          escalateTo: "Finance Manager",
          template: "Account requires immediate attention for overdue payment of {{amount}}.",
          isRequired: true
        }
      ],
      linkedCourses: ["All Courses"],
      targetAudience: "students",
      isActive: true,
      createdAt: "2025-01-10"
    },
    {
      id: "3",
      name: "Staff Meeting Reminders",
      description: "Automated reminders for weekly staff meetings and training sessions",
      frequency: "weekly",
      followUpPlan: [
        {
          id: "1",
          sequence: 1,
          action: "Calendar Invitation",
          delayDays: 0,
          template: "Weekly staff meeting scheduled for {{meetingDate}} at {{time}}. Agenda: {{agenda}}",
          isRequired: true
        },
        {
          id: "2",
          sequence: 2,
          action: "Day Before Reminder",
          delayDays: 1,
          template: "Reminder: Staff meeting tomorrow at {{time}}. Please review the agenda and prepare your updates.",
          isRequired: true
        }
      ],
      linkedCourses: [],
      targetAudience: "staff",
      isActive: true,
      createdAt: "2025-01-20"
    }
  ])

  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false)
  const [editingReminder, setEditingReminder] = useState<ReminderConfig | null>(null)
  const [newReminder, setNewReminder] = useState<Partial<ReminderConfig>>({
    name: "",
    description: "",
    frequency: "weekly",
    followUpPlan: [],
    linkedCourses: [],
    targetAudience: "students",
    isActive: true
  })

  const [isAddStepOpen, setIsAddStepOpen] = useState(false)
  const [newStep, setNewStep] = useState<Partial<FollowUpStep>>({
    sequence: 1,
    action: "",
    delayDays: 0,
    template: "",
    isRequired: true
  })

  const availableCourses = [
    "Music Theory", "Advanced Piano", "Guitar Basics", "Violin Fundamentals", 
    "Dance Ballet", "Modern Dance", "Digital Art", "Oil Painting", "All Courses"
  ]

  const actionTypes = [
    "Email Reminder", "SMS Alert", "Phone Call", "Push Notification", 
    "Calendar Invitation", "In-App Message", "Manager Escalation", "Parent Notification"
  ]

  const frequencyOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "custom", label: "Custom Days" }
  ]

  const handleSaveReminder = () => {
    if (editingReminder) {
      setReminders(reminders =>
        reminders.map(r => r.id === editingReminder.id ? { 
          ...newReminder, 
          id: editingReminder.id,
          createdAt: editingReminder.createdAt
        } as ReminderConfig : r)
      )
      setEditingReminder(null)
    } else {
      const reminder: ReminderConfig = {
        ...newReminder as ReminderConfig,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0]
      }
      setReminders([...reminders, reminder])
    }
    setIsAddReminderOpen(false)
    resetNewReminder()
  }

  const resetNewReminder = () => {
    setNewReminder({
      name: "",
      description: "",
      frequency: "weekly",
      followUpPlan: [],
      linkedCourses: [],
      targetAudience: "students",
      isActive: true
    })
  }

  const handleEditReminder = (reminder: ReminderConfig) => {
    setEditingReminder(reminder)
    setNewReminder(reminder)
    setIsAddReminderOpen(true)
  }

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders => reminders.filter(r => r.id !== id))
  }

  const toggleReminderStatus = (id: string) => {
    setReminders(reminders =>
      reminders.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r)
    )
  }

  const addFollowUpStep = () => {
    const step: FollowUpStep = {
      ...newStep as FollowUpStep,
      id: Date.now().toString(),
      sequence: (newReminder.followUpPlan?.length || 0) + 1
    }
    
    setNewReminder({
      ...newReminder,
      followUpPlan: [...(newReminder.followUpPlan || []), step]
    })
    
    setNewStep({
      sequence: (newReminder.followUpPlan?.length || 0) + 2,
      action: "",
      delayDays: 0,
      template: "",
      isRequired: true
    })
    setIsAddStepOpen(false)
  }

  const removeFollowUpStep = (stepId: string) => {
    const updatedSteps = newReminder.followUpPlan?.filter(step => step.id !== stepId) || []
    // Resequence the remaining steps
    const resequencedSteps = updatedSteps.map((step, index) => ({
      ...step,
      sequence: index + 1
    }))
    
    setNewReminder({
      ...newReminder,
      followUpPlan: resequencedSteps
    })
  }

  const toggleCourse = (course: string) => {
    const current = newReminder.linkedCourses || []
    const updated = current.includes(course)
      ? current.filter(c => c !== course)
      : [...current, course]
    
    setNewReminder({ ...newReminder, linkedCourses: updated })
  }

  const getFrequencyBadgeColor = (frequency: string) => {
    switch (frequency) {
      case "daily": return "bg-red-100 text-red-800"
      case "weekly": return "bg-blue-100 text-blue-800"
      case "monthly": return "bg-green-100 text-green-800"
      case "custom": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getAudienceIcon = (audience: string) => {
    switch (audience) {
      case "students": return "🎓"
      case "staff": return "👨‍🏫"
      case "parents": return "👨‍👩‍👧‍👦"
      case "all": return "👥"
      default: return "👤"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            Reminder & Follow-up System
          </CardTitle>
          <p className="text-sm text-gray-600">
            Create automated reminder sequences with escalation chains for course enrollment, payments, and staff notifications
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {reminders.filter(r => r.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Active Reminders</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {reminders.reduce((sum, r) => sum + r.followUpPlan.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Follow-up Steps</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {reminders.filter(r => r.linkedCourses.length > 0).length}
              </div>
              <div className="text-sm text-gray-600">Course-Linked</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {reminders.filter(r => r.followUpPlan.some(step => step.escalateTo)).length}
              </div>
              <div className="text-sm text-gray-600">With Escalations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reminders List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Configured Reminders ({reminders.length})</h3>
          <Dialog open={isAddReminderOpen} onOpenChange={setIsAddReminderOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingReminder ? "Edit Reminder System" : "Create New Reminder System"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reminderName">Reminder Name</Label>
                    <Input
                      id="reminderName"
                      value={newReminder.name}
                      onChange={(e) => setNewReminder({ ...newReminder, name: e.target.value })}
                      placeholder="Enter reminder name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Select
                      value={newReminder.targetAudience}
                      onValueChange={(value: any) => setNewReminder({ ...newReminder, targetAudience: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="parents">Parents</SelectItem>
                        <SelectItem value="all">All Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                    placeholder="Describe the purpose of this reminder system"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select
                      value={newReminder.frequency}
                      onValueChange={(value: any) => setNewReminder({ ...newReminder, frequency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencyOptions.map((freq) => (
                          <SelectItem key={freq.value} value={freq.value}>
                            {freq.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {newReminder.frequency === "custom" && (
                    <div>
                      <Label htmlFor="customDays">Custom Days</Label>
                      <Input
                        id="customDays"
                        type="number"
                        value={newReminder.customDays || ""}
                        onChange={(e) => setNewReminder({ ...newReminder, customDays: parseInt(e.target.value) || 0 })}
                        placeholder="Number of days"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label>Linked Courses</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2 max-h-32 overflow-y-auto">
                    {availableCourses.map((course) => (
                      <div key={course} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`course-${course}`}
                          checked={newReminder.linkedCourses?.includes(course) || false}
                          onChange={() => toggleCourse(course)}
                        />
                        <Label htmlFor={`course-${course}`} className="text-sm">
                          {course}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label>Follow-up Plan ({newReminder.followUpPlan?.length || 0} steps)</Label>
                    <Dialog open={isAddStepOpen} onOpenChange={setIsAddStepOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Plus className="h-3 w-3 mr-1" />
                          Add Step
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Add Follow-up Step</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Action Type</Label>
                              <Select
                                value={newStep.action}
                                onValueChange={(value) => setNewStep({ ...newStep, action: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select action" />
                                </SelectTrigger>
                                <SelectContent>
                                  {actionTypes.map((action) => (
                                    <SelectItem key={action} value={action}>
                                      {action}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Delay (Days)</Label>
                              <Input
                                type="number"
                                value={newStep.delayDays}
                                onChange={(e) => setNewStep({ ...newStep, delayDays: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                              />
                            </div>
                          </div>

                          <div>
                            <Label>Escalate To (optional)</Label>
                            <Input
                              value={newStep.escalateTo || ""}
                              onChange={(e) => setNewStep({ ...newStep, escalateTo: e.target.value })}
                              placeholder="Manager, Coordinator, etc."
                            />
                          </div>

                          <div>
                            <Label>Message Template</Label>
                            <Textarea
                              value={newStep.template}
                              onChange={(e) => setNewStep({ ...newStep, template: e.target.value })}
                              placeholder="Enter message template with variables like {{name}}, {{date}}"
                              rows={4}
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={newStep.isRequired}
                              onCheckedChange={(checked) => setNewStep({ ...newStep, isRequired: checked })}
                            />
                            <Label>Required Step</Label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddStepOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={addFollowUpStep} className="bg-purple-600 hover:bg-purple-700">
                            Add Step
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {newReminder.followUpPlan?.map((step, index) => (
                      <div key={step.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            Step {step.sequence}
                          </Badge>
                          <div>
                            <div className="font-medium text-sm">{step.action}</div>
                            <div className="text-xs text-gray-600">
                              {step.delayDays === 0 ? "Immediate" : `After ${step.delayDays} days`}
                              {step.escalateTo && ` → ${step.escalateTo}`}
                            </div>
                          </div>
                          {step.isRequired && <Badge variant="secondary" className="text-xs">Required</Badge>}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFollowUpStep(step.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newReminder.isActive}
                    onCheckedChange={(checked) => setNewReminder({ ...newReminder, isActive: checked })}
                  />
                  <Label>Active Reminder System</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddReminderOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveReminder} className="bg-purple-600 hover:bg-purple-700">
                  {editingReminder ? "Update" : "Create"} Reminder System
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {reminders.map((reminder) => (
            <Card key={reminder.id} className={!reminder.isActive ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        {reminder.name}
                      </CardTitle>
                      <Badge variant={reminder.isActive ? "default" : "secondary"}>
                        {reminder.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge className={getFrequencyBadgeColor(reminder.frequency)}>
                        {reminder.frequency}
                        {reminder.frequency === "custom" && ` (${reminder.customDays} days)`}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{reminder.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {getAudienceIcon(reminder.targetAudience)} {reminder.targetAudience}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {reminder.linkedCourses.length} Courses
                      </span>
                      <span className="flex items-center gap-1">
                        <Bell className="h-4 w-4" />
                        {reminder.followUpPlan.length} Steps
                      </span>
                      {reminder.followUpPlan.some(step => step.escalateTo) && (
                        <span className="flex items-center gap-1">
                          <ArrowUp className="h-4 w-4" />
                          Escalation
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={reminder.isActive}
                      onCheckedChange={() => toggleReminderStatus(reminder.id)}
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditReminder(reminder)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteReminder(reminder.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reminder.linkedCourses.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">Linked Courses</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {reminder.linkedCourses.map((course) => (
                          <Badge key={course} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-medium">Follow-up Sequence</Label>
                    <div className="space-y-2 mt-2">
                      {reminder.followUpPlan
                        .sort((a, b) => a.sequence - b.sequence)
                        .map((step, index) => (
                          <div key={step.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded border">
                            <Badge variant="outline" className="text-xs min-w-[60px]">
                              Step {step.sequence}
                            </Badge>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{step.action}</div>
                              <div className="text-xs text-gray-600">
                                {step.delayDays === 0 ? "Immediate action" : `${step.delayDays} days delay`}
                                {step.escalateTo && ` • Escalates to ${step.escalateTo}`}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {step.isRequired && <Badge variant="secondary" className="text-xs">Required</Badge>}
                              {step.escalateTo && <Badge variant="destructive" className="text-xs">Escalates</Badge>}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {reminders.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Reminder Systems</h3>
              <p className="text-gray-500 mb-4">Create your first automated reminder system</p>
              <Button 
                onClick={() => setIsAddReminderOpen(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Reminder System
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}