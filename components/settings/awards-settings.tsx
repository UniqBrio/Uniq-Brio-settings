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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Trophy, Users, GraduationCap, Edit, Plus, Trash2, Calendar } from "lucide-react"

interface AwardConfig {
  id: string
  name: string
  description: string
  prizeMoney: number
  nominationCategory: string
  criteria: string[]
  instructions: string
  introducedDate: string
  purpose: string
  frequency: "monthly" | "quarterly" | "annually" | "one-time"
  targetAudience: "students" | "staff" | "both"
  isActive: boolean
}

export default function AwardsSettings() {
  const [awards, setAwards] = useState<AwardConfig[]>([
    {
      id: "1",
      name: "Student Excellence Award",
      description: "Recognizing outstanding academic performance and dedication",
      prizeMoney: 10000,
      nominationCategory: "Academic Excellence",
      criteria: ["90% or above average", "Regular attendance", "Peer nomination"],
      instructions: "Nominations must include academic transcripts and peer recommendations",
      introducedDate: "2025-01-01",
      purpose: "To encourage academic excellence and motivate students",
      frequency: "quarterly",
      targetAudience: "students",
      isActive: true
    },
    {
      id: "2",
      name: "Innovation in Teaching",
      description: "Recognizing creative and effective teaching methodologies",
      prizeMoney: 25000,
      nominationCategory: "Teaching Innovation",
      criteria: ["Student feedback scores >4.5", "Innovative teaching methods", "Course completion rate >95%"],
      instructions: "Submit teaching portfolio with student testimonials and innovation examples",
      introducedDate: "2025-02-01",
      purpose: "To promote innovative teaching practices and excellence",
      frequency: "annually",
      targetAudience: "staff",
      isActive: true
    },
    {
      id: "3",
      name: "Community Service Recognition",
      description: "Honoring exceptional community service contributions",
      prizeMoney: 5000,
      nominationCategory: "Community Service",
      criteria: ["20+ hours community service", "Impact documentation", "Community feedback"],
      instructions: "Provide detailed community service log and impact assessment",
      introducedDate: "2025-03-01",
      purpose: "To encourage community engagement and social responsibility",
      frequency: "annually",
      targetAudience: "both",
      isActive: true
    },
    {
      id: "4",
      name: "Rising Star Award",
      description: "For promising new students showing exceptional potential",
      prizeMoney: 7500,
      nominationCategory: "Emerging Talent",
      criteria: ["First year student", "Rapid improvement", "Positive attitude", "Peer support"],
      instructions: "Instructor nomination required with progress documentation",
      introducedDate: "2025-04-01",
      purpose: "To encourage and recognize emerging talent early",
      frequency: "monthly",
      targetAudience: "students",
      isActive: true
    }
  ])

  const [isAddAwardOpen, setIsAddAwardOpen] = useState(false)
  const [editingAward, setEditingAward] = useState<AwardConfig | null>(null)
  const [newAward, setNewAward] = useState<Partial<AwardConfig>>({
    name: "",
    description: "",
    prizeMoney: 0,
    nominationCategory: "",
    criteria: [],
    instructions: "",
    introducedDate: new Date().toISOString().split("T")[0],
    purpose: "",
    frequency: "quarterly",
    targetAudience: "students",
    isActive: true
  })

  const [newCriterion, setNewCriterion] = useState("")

  const nominationCategories = [
    "Academic Excellence",
    "Teaching Innovation", 
    "Community Service",
    "Leadership",
    "Emerging Talent",
    "Research Excellence",
    "Creative Arts",
    "Sports Achievement",
    "Technical Innovation",
    "Mentorship"
  ]

  const frequencies = [
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "annually", label: "Annually" },
    { value: "one-time", label: "One-time" }
  ]

  const handleSaveAward = () => {
    if (editingAward) {
      setAwards(awards =>
        awards.map(a => a.id === editingAward.id ? { ...newAward, id: editingAward.id } as AwardConfig : a)
      )
      setEditingAward(null)
    } else {
      const award: AwardConfig = {
        ...newAward as AwardConfig,
        id: Date.now().toString()
      }
      setAwards([...awards, award])
    }
    setIsAddAwardOpen(false)
    resetNewAward()
  }

  const resetNewAward = () => {
    setNewAward({
      name: "",
      description: "",
      prizeMoney: 0,
      nominationCategory: "",
      criteria: [],
      instructions: "",
      introducedDate: new Date().toISOString().split("T")[0],
      purpose: "",
      frequency: "quarterly",
      targetAudience: "students",
      isActive: true
    })
    setNewCriterion("")
  }

  const handleEditAward = (award: AwardConfig) => {
    setEditingAward(award)
    setNewAward(award)
    setIsAddAwardOpen(true)
  }

  const handleDeleteAward = (id: string) => {
    setAwards(awards => awards.filter(a => a.id !== id))
  }

  const toggleAwardStatus = (id: string) => {
    setAwards(awards =>
      awards.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a)
    )
  }

  const addCriterion = () => {
    if (newCriterion.trim()) {
      const updatedCriteria = [...(newAward.criteria || []), newCriterion.trim()]
      setNewAward({ ...newAward, criteria: updatedCriteria })
      setNewCriterion("")
    }
  }

  const removeCriterion = (index: number) => {
    const updatedCriteria = newAward.criteria?.filter((_, i) => i !== index) || []
    setNewAward({ ...newAward, criteria: updatedCriteria })
  }

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "monthly": return "bg-blue-100 text-blue-800"
      case "quarterly": return "bg-green-100 text-green-800"
      case "annually": return "bg-purple-100 text-purple-800"
      case "one-time": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getAudienceIcon = (audience: string) => {
    switch (audience) {
      case "students": return <GraduationCap className="h-4 w-4" />
      case "staff": return <Users className="h-4 w-4" />
      case "both": return <Award className="h-4 w-4" />
      default: return <Award className="h-4 w-4" />
    }
  }

  const studentAwards = awards.filter(a => a.targetAudience === "students" || a.targetAudience === "both")
  const staffAwards = awards.filter(a => a.targetAudience === "staff" || a.targetAudience === "both")

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-purple-600" />
            Awards & Recognition System
          </CardTitle>
          <p className="text-sm text-gray-600">
            Create and manage awards for students and staff with customizable criteria and recognition programs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {awards.filter(a => a.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Active Awards</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {studentAwards.filter(a => a.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Student Awards</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {staffAwards.filter(a => a.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Staff Awards</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                ₹{awards.reduce((sum, a) => sum + (a.isActive ? a.prizeMoney : 0), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Prize Pool</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Awards Management */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              All Awards
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Student Awards
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Staff Awards
            </TabsTrigger>
          </TabsList>

          <Dialog open={isAddAwardOpen} onOpenChange={setIsAddAwardOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Award
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingAward ? "Edit Award" : "Create New Award"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="awardName">Award Name</Label>
                    <Input
                      id="awardName"
                      value={newAward.name}
                      onChange={(e) => setNewAward({ ...newAward, name: e.target.value })}
                      placeholder="Enter award name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prizeMoney">Prize Money (₹)</Label>
                    <Input
                      id="prizeMoney"
                      type="number"
                      value={newAward.prizeMoney}
                      onChange={(e) => setNewAward({ ...newAward, prizeMoney: parseInt(e.target.value) || 0 })}
                      placeholder="10000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newAward.description}
                    onChange={(e) => setNewAward({ ...newAward, description: e.target.value })}
                    placeholder="Detailed description of the award"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nominationCategory">Nomination Category</Label>
                    <Select
                      value={newAward.nominationCategory}
                      onValueChange={(value) => setNewAward({ ...newAward, nominationCategory: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {nominationCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select
                      value={newAward.frequency}
                      onValueChange={(value: any) => setNewAward({ ...newAward, frequency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencies.map((freq) => (
                          <SelectItem key={freq.value} value={freq.value}>
                            {freq.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Select
                      value={newAward.targetAudience}
                      onValueChange={(value: any) => setNewAward({ ...newAward, targetAudience: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="introducedDate">Introduced Date</Label>
                    <Input
                      id="introducedDate"
                      type="date"
                      value={newAward.introducedDate}
                      onChange={(e) => setNewAward({ ...newAward, introducedDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="purpose">Purpose</Label>
                  <Textarea
                    id="purpose"
                    value={newAward.purpose}
                    onChange={(e) => setNewAward({ ...newAward, purpose: e.target.value })}
                    placeholder="What is the purpose of this award?"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Selection Criteria</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={newCriterion}
                        onChange={(e) => setNewCriterion(e.target.value)}
                        placeholder="Add a criterion"
                        onKeyPress={(e) => e.key === "Enter" && addCriterion()}
                      />
                      <Button type="button" onClick={addCriterion} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {newAward.criteria?.map((criterion, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{criterion}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => removeCriterion(index)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="instructions">Nomination Instructions</Label>
                  <Textarea
                    id="instructions"
                    value={newAward.instructions}
                    onChange={(e) => setNewAward({ ...newAward, instructions: e.target.value })}
                    placeholder="Instructions for nominees or nominators"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="awardActive"
                    checked={newAward.isActive}
                    onCheckedChange={(checked) => setNewAward({ ...newAward, isActive: checked })}
                  />
                  <Label htmlFor="awardActive">Active Award</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddAwardOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveAward} className="bg-purple-600 hover:bg-purple-700">
                  {editingAward ? "Update" : "Create"} Award
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="all" className="space-y-4">
          <AwardsList awards={awards} onEdit={handleEditAward} onDelete={handleDeleteAward} onToggle={toggleAwardStatus} />
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <AwardsList awards={studentAwards} onEdit={handleEditAward} onDelete={handleDeleteAward} onToggle={toggleAwardStatus} />
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <AwardsList awards={staffAwards} onEdit={handleEditAward} onDelete={handleDeleteAward} onToggle={toggleAwardStatus} />
        </TabsContent>
      </Tabs>
    </div>
  )

  function AwardsList({ 
    awards, 
    onEdit, 
    onDelete, 
    onToggle 
  }: { 
    awards: AwardConfig[], 
    onEdit: (award: AwardConfig) => void, 
    onDelete: (id: string) => void, 
    onToggle: (id: string) => void 
  }) {
    return (
      <div className="grid gap-6">
        {awards.map((award) => (
          <Card key={award.id} className={!award.isActive ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getAudienceIcon(award.targetAudience)}
                      {award.name}
                    </CardTitle>
                    <Badge variant={award.isActive ? "default" : "secondary"}>
                      {award.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Badge className={getFrequencyColor(award.frequency)}>
                      {award.frequency}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{award.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Trophy className="h-4 w-4" />
                      ₹{award.prizeMoney.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Since {new Date(award.introducedDate).getFullYear()}
                    </span>
                    <Badge variant="outline">{award.nominationCategory}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={award.isActive}
                    onCheckedChange={() => onToggle(award.id)}
                  />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEdit(award)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onDelete(award.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-sm mb-2">Purpose</h5>
                  <p className="text-sm text-gray-600">{award.purpose}</p>
                </div>

                <div>
                  <h5 className="font-medium text-sm mb-2">Selection Criteria</h5>
                  <div className="flex flex-wrap gap-1">
                    {award.criteria.map((criterion, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {criterion}
                      </Badge>
                    ))}
                  </div>
                </div>

                {award.instructions && (
                  <div>
                    <h5 className="font-medium text-sm mb-2">Instructions</h5>
                    <p className="text-sm text-gray-600">{award.instructions}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {awards.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Awards Found</h3>
              <p className="text-gray-500">Create your first award to recognize excellence</p>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }
}