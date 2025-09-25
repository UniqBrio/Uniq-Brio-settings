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
import { Trash2, Edit, Plus, MapPin, Globe, Calendar, DollarSign } from "lucide-react"

interface Branch {
  id: string
  name: string
  currency: string
  timezone: string
  location: string
  isVirtual: boolean
  virtualPlatforms?: string[]
}

interface VirtualPlatform {
  id: string
  name: string
  isActive: boolean
}

export default function GeneralSettings() {
  const [dateFormat, setDateFormat] = useState("dd-mmm-yyyy")
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: "1",
      name: "Main Campus",
      currency: "INR",
      timezone: "Asia/Kolkata",
      location: "Physical",
      isVirtual: false
    },
    {
      id: "2",
      name: "Online Division",
      currency: "USD",
      timezone: "America/New_York",
      location: "Virtual",
      isVirtual: true,
      virtualPlatforms: ["zoom", "teams"]
    }
  ])

  const [virtualPlatforms, setVirtualPlatforms] = useState<VirtualPlatform[]>([
    { id: "zoom", name: "Zoom", isActive: true },
    { id: "teams", name: "Microsoft Teams", isActive: true },
    { id: "meet", name: "Google Meet", isActive: false },
    { id: "webex", name: "Webex", isActive: false }
  ])

  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false)
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null)
  const [newBranch, setNewBranch] = useState<Partial<Branch>>({
    name: "",
    currency: "INR",
    timezone: "Asia/Kolkata",
    location: "Physical",
    isVirtual: false,
    virtualPlatforms: []
  })

  const dateFormats = [
    { value: "dd-mmm-yyyy", label: "DD-MMM-YYYY (10-Jul-2025)" },
    { value: "mm-dd-yyyy", label: "MM-DD-YYYY (07-10-2025)" },
    { value: "yyyy-mm-dd", label: "YYYY-MM-DD (2025-07-10)" },
    { value: "dd/mm/yyyy", label: "DD/MM/YYYY (10/07/2025)" },
    { value: "mm/dd/yyyy", label: "MM/DD/YYYY (07/10/2025)" }
  ]

  const currencies = [
    { value: "INR", label: "INR" },
    { value: "USD", label: "USD" },
    { value: "CAD", label: "CAD" },
    { value: "GBP", label: "GBP" },
    { value: "EUR", label: "EUR" }
  ]

  const timezones = [
    { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
    { value: "America/New_York", label: "America/New_York (EST)" },
    { value: "America/Toronto", label: "America/Toronto (EST)" },
    { value: "Europe/London", label: "Europe/London (GMT)" },
    { value: "Australia/Sydney", label: "Australia/Sydney (AEDT)" }
  ]

  const handleSaveBranch = () => {
    if (editingBranch) {
      setBranches(branches.map(b => b.id === editingBranch.id ? { ...newBranch, id: editingBranch.id } as Branch : b))
      setEditingBranch(null)
    } else {
      const branch: Branch = {
        ...newBranch as Branch,
        id: Date.now().toString()
      }
      setBranches([...branches, branch])
    }
    setIsAddBranchOpen(false)
    setNewBranch({
      name: "",
      currency: "INR",
      timezone: "Asia/Kolkata",
      location: "Physical",
      isVirtual: false,
      virtualPlatforms: []
    })
  }

  const handleEditBranch = (branch: Branch) => {
    setEditingBranch(branch)
    setNewBranch(branch)
    setIsAddBranchOpen(true)
  }

  const handleDeleteBranch = (id: string) => {
    setBranches(branches.filter(b => b.id !== id))
  }

  const toggleVirtualPlatform = (platformId: string) => {
    setVirtualPlatforms(platforms =>
      platforms.map(p => p.id === platformId ? { ...p, isActive: !p.isActive } : p)
    )
  }

  const handleVirtualPlatformChange = (platformId: string, checked: boolean) => {
    const currentPlatforms = newBranch.virtualPlatforms || []
    if (checked) {
      setNewBranch({
        ...newBranch,
        virtualPlatforms: [...currentPlatforms, platformId]
      })
    } else {
      setNewBranch({
        ...newBranch,
        virtualPlatforms: currentPlatforms.filter(id => id !== platformId)
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Date Format Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Date Format Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="dateFormat">Default Date Format</Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  {dateFormats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-600">
              Current format preview: <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                {dateFormat === "dd-mmm-yyyy" && "22-Sep-2025"}
                {dateFormat === "mm-dd-yyyy" && "09-22-2025"}
                {dateFormat === "yyyy-mm-dd" && "2025-09-22"}
                {dateFormat === "dd/mm/yyyy" && "22/09/2025"}
                {dateFormat === "mm/dd/yyyy" && "09/22/2025"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Branch Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-purple-600" />
            Branch Management
          </CardTitle>
          <p className="text-sm text-gray-600">
            Manage academy branches with individual currency, timezone, and location settings
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Branches ({branches.length})</h3>
              <Dialog open={isAddBranchOpen} onOpenChange={setIsAddBranchOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Branch
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingBranch ? "Edit Branch" : "Add New Branch"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="branchName">Branch Name</Label>
                      <Input
                        id="branchName"
                        value={newBranch.name}
                        onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                        placeholder="Enter branch name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select 
                        value={newBranch.currency} 
                        onValueChange={(value) => setNewBranch({ ...newBranch, currency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.value} value={currency.value}>
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select 
                        value={newBranch.timezone} 
                        onValueChange={(value) => setNewBranch({ ...newBranch, timezone: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((timezone) => (
                            <SelectItem key={timezone.value} value={timezone.value}>
                              {timezone.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Location Type</Label>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="physical"
                            name="location"
                            checked={newBranch.location === "Physical"}
                            onChange={() => setNewBranch({ 
                              ...newBranch, 
                              location: "Physical", 
                              isVirtual: false,
                              virtualPlatforms: []
                            })}
                            aria-label="Offline location"
                          />
                          <Label htmlFor="offline">Offline</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="virtual"
                            name="location"
                            checked={newBranch.location === "Virtual"}
                            onChange={() => setNewBranch({ 
                              ...newBranch, 
                              location: "Virtual", 
                              isVirtual: true 
                            })}
                            aria-label="Virtual location"
                          />
                          <Label htmlFor="virtual">Virtual</Label>
                        </div>
                      </div>
                    </div>

                    {newBranch.location === "Virtual" && (
                      <div>
                        <Label>Virtual Platforms</Label>
                        <div className="space-y-2 mt-2">
                          {virtualPlatforms.filter(p => p.isActive).map((platform) => (
                            <div key={platform.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={platform.id}
                                checked={newBranch.virtualPlatforms?.includes(platform.id) || false}
                                onChange={(e) => handleVirtualPlatformChange(platform.id, e.target.checked)}
                                aria-label={`Enable ${platform.name}`}
                              />
                              <Label htmlFor={platform.id}>{platform.name}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddBranchOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveBranch} className="bg-purple-600 hover:bg-purple-700">
                      {editingBranch ? "Update" : "Add"} Branch
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {branches.map((branch) => (
                <div key={branch.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        {branch.isVirtual ? (
                          <Globe className="h-4 w-4 text-blue-500" />
                        ) : (
                          <MapPin className="h-4 w-4 text-green-500" />
                        )}
                        {branch.name}
                      </h4>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {branch.currency}
                        </span>
                        <span>{branch.timezone}</span>
                        <Badge variant={branch.isVirtual ? "secondary" : "default"}>
                          {branch.location}
                        </Badge>
                      </div>
                      {branch.isVirtual && branch.virtualPlatforms && (
                        <div className="flex gap-1 mt-2">
                          {branch.virtualPlatforms.map(platformId => {
                            const platform = virtualPlatforms.find(p => p.id === platformId)
                            return platform ? (
                              <Badge key={platformId} variant="outline" className="text-xs">
                                {platform.name}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditBranch(branch)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteBranch(branch.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Virtual Platforms Configuration
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-600" />
            Virtual Platform Settings
          </CardTitle>
          <p className="text-sm text-gray-600">
            Configure available virtual meeting platforms for online branches
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {virtualPlatforms.map((platform) => (
              <div key={platform.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{platform.name}</h4>
                  <p className="text-sm text-gray-600">
                    {platform.isActive ? "Available for selection" : "Disabled"}
                  </p>
                </div>
                <Switch
                  checked={platform.isActive}
                  onCheckedChange={() => toggleVirtualPlatform(platform.id)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}