"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Trash2, Edit, Plus, Calendar, Users, Clock } from "lucide-react"

interface LeavePolicy {
  id: string
  name: string
  quotaType: "quarterly" | "annual"
  roleAllocations: RoleAllocation[]
  carryForward: boolean
  roundToHalf: boolean
  proratedForNewJoiners: boolean
  description: string
  isActive: boolean
}

interface RoleAllocation {
  role: string
  allocation: number
}

export default function LeavePolicySettings() {
  const [leavePolicies, setLeavePolicies] = useState<LeavePolicy[]>([
    {
      id: "1",
      name: "Casual Leave",
      quotaType: "annual",
      roleAllocations: [
        { role: "Junior", allocation: 12 },
        { role: "Senior", allocation: 15 },
        { role: "Manager", allocation: 18 }
      ],
      carryForward: true,
      roundToHalf: true,
      proratedForNewJoiners: true,
      description: "For personal reasons and emergencies",
      isActive: true
    },
    {
      id: "2", 
      name: "Sick Leave",
      quotaType: "annual",
      roleAllocations: [
        { role: "Junior", allocation: 10 },
        { role: "Senior", allocation: 12 },
        { role: "Manager", allocation: 15 }
      ],
      carryForward: false,
      roundToHalf: true,
      proratedForNewJoiners: true,
      description: "For medical reasons",
      isActive: true
    },
    {
      id: "3",
      name: "Quarterly Break",
      quotaType: "quarterly",
      roleAllocations: [
        { role: "Junior", allocation: 3 },
        { role: "Senior", allocation: 4 },
        { role: "Manager", allocation: 5 }
      ],
      carryForward: false,
      roundToHalf: true,
      proratedForNewJoiners: true,
      description: "Quarterly rest breaks",
      isActive: true
    }
  ])

  const [isAddPolicyOpen, setIsAddPolicyOpen] = useState(false)
  const [editingPolicy, setEditingPolicy] = useState<LeavePolicy | null>(null)
  const [newPolicy, setNewPolicy] = useState<Partial<LeavePolicy>>({
    name: "",
    quotaType: "annual",
    roleAllocations: [
      { role: "Junior", allocation: 12 },
      { role: "Senior", allocation: 16 },
      { role: "Manager", allocation: 24 }
    ],
    carryForward: true,
    roundToHalf: false,
    proratedForNewJoiners: true,
    description: "",
    isActive: true
  })

  const staffRoles = ["Junior", "Senior", "Manager", "Team Lead", "Director"]

  const handleSavePolicy = () => {
    if (editingPolicy) {
      setLeavePolicies(policies => 
        policies.map(p => p.id === editingPolicy.id ? { ...newPolicy, id: editingPolicy.id } as LeavePolicy : p)
      )
      setEditingPolicy(null)
    } else {
      const policy: LeavePolicy = {
        ...newPolicy as LeavePolicy,
        id: Date.now().toString()
      }
      setLeavePolicies([...leavePolicies, policy])
    }
    setIsAddPolicyOpen(false)
    resetNewPolicy()
  }

  const resetNewPolicy = () => {
    setNewPolicy({
      name: "",
      quotaType: "annual",
      roleAllocations: [
        { role: "Junior", allocation: 12 },
        { role: "Senior", allocation: 16 },
        { role: "Manager", allocation: 24 }
      ],
      carryForward: true,
      roundToHalf: false,
      proratedForNewJoiners: true,
      description: "",
      isActive: true
    })
  }

  const handleEditPolicy = (policy: LeavePolicy) => {
    setEditingPolicy(policy)
    setNewPolicy(policy)
    setIsAddPolicyOpen(true)
  }

  const handleDeletePolicy = (id: string) => {
    setLeavePolicies(policies => policies.filter(p => p.id !== id))
  }

  const togglePolicyStatus = (id: string) => {
    setLeavePolicies(policies =>
      policies.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p)
    )
  }

  const updateRoleAllocation = (role: string, allocation: number) => {
    const updatedAllocations = newPolicy.roleAllocations?.map(ra =>
      ra.role === role ? { ...ra, allocation } : ra
    ) || []
    
    setNewPolicy({ ...newPolicy, roleAllocations: updatedAllocations })
  }

  const addRoleAllocation = () => {
    const currentAllocations = newPolicy.roleAllocations || []
    const availableRoles = staffRoles.filter(role => 
      !currentAllocations.some(ra => ra.role === role)
    )
    
    if (availableRoles.length > 0) {
      setNewPolicy({
        ...newPolicy,
        roleAllocations: [...currentAllocations, { role: availableRoles[0], allocation: 0 }]
      })
    }
  }

  const removeRoleAllocation = (role: string) => {
    const updatedAllocations = newPolicy.roleAllocations?.filter(ra => ra.role !== role) || []
    setNewPolicy({ ...newPolicy, roleAllocations: updatedAllocations })
  }

  const calculateProrated = (allocation: number, quotaType: "quarterly" | "annual") => {
    const currentMonth = new Date().getMonth() + 1
    if (quotaType === "quarterly") {
      const quarterMonth = currentMonth % 3 || 3
      return (allocation / 3 * quarterMonth).toFixed(1)
    } else {
      return (allocation / 12 * currentMonth).toFixed(1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Leave Policy Management
          </CardTitle>
          <p className="text-sm text-gray-600">
            Configure comprehensive leave policies with role-based quotas, carry-forward options, and prorated calculations
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {leavePolicies.filter(p => p.isActive).length} Active Policies
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {leavePolicies.filter(p => p.quotaType === "quarterly").length} Quarterly
              </span>
            </div>
            <Dialog open={isAddPolicyOpen} onOpenChange={setIsAddPolicyOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Configure Leave Policy
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader className="text-center pb-6">
                  <DialogTitle className="text-2xl font-semibold text-gray-900">
                    Leave Policy Configuration
                  </DialogTitle>
                  <p className="text-sm text-gray-500 mt-2">
                    Configure advanced leave policies and rules
                  </p>
                </DialogHeader>
                <div className="space-y-8">
                  {/* Quota Type Dropdown */}
                  <div className="space-y-2">
                    <Label htmlFor="quotaType" className="text-sm font-medium text-gray-700">
                      Quota Type
                    </Label>
                    <Select
                      value={newPolicy.quotaType === "quarterly" ? "quarterly" : "monthly"}
                      onValueChange={(value) => 
                        setNewPolicy({ 
                          ...newPolicy, 
                          quotaType: value === "quarterly" ? "quarterly" : "annual" 
                        })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select quota type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly Quota</SelectItem>
                        <SelectItem value="quarterly">Quarterly Quota</SelectItem>
                        <SelectItem value="annual">Annual Quota</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Auto-Reject Toggle */}
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-gray-700">
                        Auto-Reject Settings
                      </Label>
                      <p className="text-xs text-gray-500">
                        Enable auto-reject for quota breaches
                      </p>
                    </div>
                    <Switch
                      id="autoReject"
                      checked={newPolicy.roundToHalf}
                      onCheckedChange={(checked) => setNewPolicy({ ...newPolicy, roundToHalf: checked })}
                    />
                  </div>

                  {/* Role-based Allocations */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">
                      Role-based allocations
                    </Label>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Junior Staff</span>
                        <Input
                          type="number"
                          value={newPolicy.roleAllocations?.find(ra => ra.role === "Junior")?.allocation || 12}
                          onChange={(e) => updateRoleAllocation("Junior", parseFloat(e.target.value) || 12)}
                          className="w-20 text-center"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Senior Staff</span>
                        <Input
                          type="number"
                          value={newPolicy.roleAllocations?.find(ra => ra.role === "Senior")?.allocation || 16}
                          onChange={(e) => updateRoleAllocation("Senior", parseFloat(e.target.value) || 16)}
                          className="w-20 text-center"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Managers</span>
                        <Input
                          type="number"
                          value={newPolicy.roleAllocations?.find(ra => ra.role === "Manager")?.allocation || 24}
                          onChange={(e) => updateRoleAllocation("Manager", parseFloat(e.target.value) || 24)}
                          className="w-20 text-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Carry-forward Settings */}
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-gray-700">
                        Carry-forward settings
                      </Label>
                      <p className="text-xs text-gray-500">
                        Allow carry-forward of unused leave
                      </p>
                    </div>
                    <Switch
                      id="carryForward"
                      checked={true}
                      onCheckedChange={(checked) => setNewPolicy({ ...newPolicy, carryForward: checked })}
                      defaultChecked
                    />
                  </div>
                </div>
                <DialogFooter className="flex gap-3 pt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddPolicyOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSavePolicy} 
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Save Policies
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Leave Policies List */}
      <div className="grid gap-6">
        {leavePolicies.map((policy) => (
          <Card key={policy.id} className={!policy.isActive ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{policy.name}</CardTitle>
                    <Badge variant={policy.isActive ? "default" : "secondary"}>
                      {policy.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">
                      {policy.quotaType === "quarterly" ? "Quarterly" : "Annual"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{policy.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={policy.isActive}
                    onCheckedChange={() => togglePolicyStatus(policy.id)}
                  />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEditPolicy(policy)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDeletePolicy(policy.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Role Allocations */}
                <div>
                  <h4 className="font-medium mb-3">Role-based Allocations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {policy.roleAllocations.map((allocation) => (
                      <div key={allocation.role} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{allocation.role}</span>
                          <span className="text-lg font-bold text-purple-600">
                            {allocation.allocation} days
                          </span>
                        </div>
                        {policy.proratedForNewJoiners && (
                          <div className="text-sm text-gray-600">
                            Prorated: {calculateProrated(allocation.allocation, policy.quotaType)} days
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Policy Features */}
                <div className="flex flex-wrap gap-2">
                  {policy.carryForward && (
                    <Badge variant="secondary" className="text-xs">
                      ✓ Carry Forward
                    </Badge>
                  )}
                  {policy.roundToHalf && (
                    <Badge variant="secondary" className="text-xs">
                      ✓ Round to 0.5
                    </Badge>
                  )}
                  {policy.proratedForNewJoiners && (
                    <Badge variant="secondary" className="text-xs">
                      ✓ Prorated
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {leavePolicies.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Leave Policies</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first leave policy</p>
            <Button 
              onClick={() => setIsAddPolicyOpen(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Leave Policy
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}