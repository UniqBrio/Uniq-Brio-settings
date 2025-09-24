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
import { Users, UserCheck, Shield, Flag, Edit, Plus, Trash2 } from "lucide-react"
import reminder from "@/components/settings/reminder-settings"
import ReminderSettings from "@/components/settings/reminder-settings"

interface StudentFlag {
  id: string
  name: string
  triggerType: "percentage" | "absolute"
  triggerValue: number
  description: string
  isActive: boolean
}

interface StaffRole {
  id: string
  name: string
  type: "instructor" | "non-instructor"
  employmentType: "temporary" | "permanent"
  permissions: string[]
  description: string
  isActive: boolean
}

export default function UserManagementSettings() {
  const [studentFlags, setStudentFlags] = useState<StudentFlag[]>([
    {
      id: "1",
      name: "High Performer",
      triggerType: "percentage",
      triggerValue: 90,
      description: "Students scoring 90% or above",
      isActive: true
    },
    {
      id: "2", 
      name: "At Risk",
      triggerType: "percentage",
      triggerValue: 50,
      description: "Students scoring below 50%",
      isActive: true
    },
    {
      id: "3",
      name: "Attendance Issue",
      triggerType: "percentage", 
      triggerValue: 75,
      description: "Students with attendance below 75%",
      isActive: true
    }
  ])

  const [staffRoles, setStaffRoles] = useState<StaffRole[]>([
    {
      id: "1",
      name: "Senior Instructor",
      type: "instructor",
      employmentType: "permanent",
      permissions: [
        "course_management", "student_grades", "attendance_tracking", 
        "course_content", "student_communication", "schedule_management"
      ],
      description: "Experienced instructors with full teaching privileges",
      isActive: true
    },
    {
      id: "2",
      name: "Junior Instructor", 
      type: "instructor",
      employmentType: "temporary",
      permissions: ["student_grades", "attendance_tracking", "student_communication"],
      description: "New instructors with basic teaching privileges",
      isActive: true
    },
    {
      id: "3",
      name: "Administrative Staff",
      type: "non-instructor",
      employmentType: "permanent", 
      permissions: [
        "student_enrollment", "fee_management", "report_generation",
        "schedule_viewing", "basic_communication"
      ],
      description: "Administrative and support staff",
      isActive: true
    }
  ])

  const allPermissions = [
    { id: "course_management", name: "Course Management", category: "Teaching" },
    { id: "student_grades", name: "Student Grades", category: "Assessment" },
    { id: "attendance_tracking", name: "Attendance Tracking", category: "Monitoring" },
    { id: "course_content", name: "Course Content", category: "Content" },
    { id: "student_communication", name: "Student Communication", category: "Communication" },
    { id: "schedule_management", name: "Schedule Management", category: "Scheduling" },
    { id: "student_enrollment", name: "Student Enrollment", category: "Administration" },
    { id: "fee_management", name: "Fee Management", category: "Financial" },
    { id: "report_generation", name: "Report Generation", category: "Analytics" },
    { id: "schedule_viewing", name: "Schedule Viewing", category: "Scheduling" },
    { id: "basic_communication", name: "Basic Communication", category: "Communication" },
    { id: "user_management", name: "User Management", category: "Administration" },
    { id: "system_settings", name: "System Settings", category: "System" },
    { id: "financial_reports", name: "Financial Reports", category: "Financial" },
    { id: "advanced_analytics", name: "Advanced Analytics", category: "Analytics" },
    { id: "bulk_operations", name: "Bulk Operations", category: "Operations" },
    { id: "export_data", name: "Export Data", category: "Data" }
  ]

  const toggleStudentFlag = (id: string) => {
    setStudentFlags(flags =>
      flags.map(flag => flag.id === id ? { ...flag, isActive: !flag.isActive } : flag)
    )
  }

  const toggleStaffRole = (id: string) => {
    setStaffRoles(roles =>
      roles.map(role => role.id === id ? { ...role, isActive: !role.isActive } : role)
    )
  }

  const togglePermission = (roleId: string, permission: string) => {
    setStaffRoles(roles =>
      roles.map(role => {
        if (role.id === roleId) {
          const hasPermission = role.permissions.includes(permission)
          return {
            ...role,
            permissions: hasPermission
              ? role.permissions.filter(p => p !== permission)
              : [...role.permissions, permission]
          }
        }
        return role
      })
    )
  }

  const groupedPermissions = allPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, typeof allPermissions>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            User Management Settings
          </CardTitle>
          <p className="text-sm text-gray-600">
            Configure student flags and staff roles with granular permissions management
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {studentFlags.filter(f => f.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Active Flags</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {staffRoles.filter(r => r.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Active Roles</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {staffRoles.filter(r => r.type === "instructor").length}
              </div>
              <div className="text-sm text-gray-600">Instructor Roles</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {allPermissions.length}
              </div>
              <div className="text-sm text-gray-600">Total Permissions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Flags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-purple-600" />
            Student Flags
          </CardTitle>
          <p className="text-sm text-gray-600">
            Automatically flag students based on performance and attendance criteria
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentFlags.map((flag) => (
              <div key={flag.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{flag.name}</h4>
                      <Badge variant={flag.isActive ? "default" : "secondary"}>
                        {flag.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{flag.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <UserCheck className="h-4 w-4" />
                        Trigger: {flag.triggerType === "percentage" ? `${flag.triggerValue}%` : flag.triggerValue}
                      </span>
                      <Badge variant="outline">
                        {flag.triggerType === "percentage" ? "Percentage Based" : "Absolute Value"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={flag.isActive}
                      onCheckedChange={() => toggleStudentFlag(flag.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Staff Roles & Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Staff Roles & Permissions
          </CardTitle>
          <p className="text-sm text-gray-600">
            Define staff roles with granular permission controls for instructors and non-instructors
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {staffRoles.map((role) => (
              <div key={role.id} className={`border rounded-lg p-6 ${!role.isActive ? "opacity-60" : ""}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-semibold">{role.name}</h4>
                      <Badge variant={role.isActive ? "default" : "secondary"}>
                        {role.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">
                        {role.type === "instructor" ? "Instructor" : "Non-Instructor"}
                      </Badge>
                      <Badge variant="outline">
                        {role.employmentType === "permanent" ? "Permanent" : "Temporary"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                  <Switch
                    checked={role.isActive}
                    onCheckedChange={() => toggleStaffRole(role.id)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h5 className="font-medium">Permissions ({role.permissions.length})</h5>
                    <Badge variant="secondary" className="text-xs">
                      {Math.round((role.permissions.length / allPermissions.length) * 100)}% of all permissions
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(groupedPermissions).map(([category, permissions]) => {
                      const categoryPermissions = permissions.filter(p => role.permissions.includes(p.id))
                      const hasAnyPermission = categoryPermissions.length > 0

                      return (
                        <div key={category} className={`p-3 rounded border ${hasAnyPermission ? "bg-purple-50 border-purple-200" : "bg-gray-50"}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h6 className="font-medium text-sm">{category}</h6>
                            <Badge variant={hasAnyPermission ? "default" : "secondary"} className="text-xs">
                              {categoryPermissions.length}/{permissions.length}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {permissions.map((permission) => (
                              <div key={permission.id} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={`${role.id}-${permission.id}`}
                                  checked={role.permissions.includes(permission.id)}
                                  onChange={() => togglePermission(role.id, permission.id)}
                                  className="rounded"
                                />
                                <Label 
                                  htmlFor={`${role.id}-${permission.id}`} 
                                  className="text-xs font-normal cursor-pointer"
                                >
                                  {permission.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Student Flag
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Staff Role
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Bulk Edit Permissions
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Permission Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <ReminderSettings/>
    </div>


  )
}