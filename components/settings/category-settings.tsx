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
import { Trash2, Edit, Plus, BookOpen, GraduationCap, Users } from "lucide-react"

interface Category {
  id: string
  name: string
  description: string
  isActive: boolean
}

interface CourseLevel {
  id: string
  name: string
  order: number
  description: string
}

interface ClassMode {
  id: string
  name: string
  deliveryTypes: string[]
  autoSelectWeekend: boolean
}

export default function CategorySettings() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Arts", description: "Creative and artistic courses", isActive: true },
    { id: "2", name: "Sports", description: "Physical activities and sports", isActive: true },
    { id: "3", name: "Music", description: "Musical instruments and vocal training", isActive: true },
    { id: "4", name: "Dance", description: "Various dance forms and styles", isActive: true }
  ])

  const [courseLevels, setCourseLevels] = useState<CourseLevel[]>([
    { id: "1", name: "Beginner", order: 1, description: "For complete beginners" },
    { id: "2", name: "Intermediate", order: 2, description: "For students with basic knowledge" },
    { id: "3", name: "Advanced", order: 3, description: "For experienced students" },
    { id: "4", name: "Expert", order: 4, description: "For highly skilled students" },
    { id: "5", name: "Pro", order: 5, description: "Professional level training" }
  ])

  const [classModes, setClassModes] = useState<ClassMode[]>([
    { 
      id: "1", 
      name: "Regular", 
      deliveryTypes: ["In-Person", "Online"], 
      autoSelectWeekend: false 
    },
    { 
      id: "2", 
      name: "Intensive", 
      deliveryTypes: ["In-Person"], 
      autoSelectWeekend: true 
    },
    { 
      id: "3", 
      name: "Weekend Only", 
      deliveryTypes: ["In-Person", "Online"], 
      autoSelectWeekend: true 
    }
  ])

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isAddLevelOpen, setIsAddLevelOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingLevel, setEditingLevel] = useState<CourseLevel | null>(null)
  
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    description: "",
    isActive: true
  })

  const [newLevel, setNewLevel] = useState<Partial<CourseLevel>>({
    name: "",
    order: courseLevels.length + 1,
    description: ""
  })

  const deliveryOptions = ["In-Person", "Online", "Hybrid"]

  const handleSaveCategory = () => {
    if (editingCategory) {
      setCategories(categories.map(c => 
        c.id === editingCategory.id ? { ...newCategory, id: editingCategory.id } as Category : c
      ))
      setEditingCategory(null)
    } else {
      const category: Category = {
        ...newCategory as Category,
        id: Date.now().toString()
      }
      setCategories([...categories, category])
    }
    setIsAddCategoryOpen(false)
    setNewCategory({ name: "", description: "", isActive: true })
  }

  const handleSaveLevel = () => {
    if (editingLevel) {
      setCourseLevels(courseLevels.map(l => 
        l.id === editingLevel.id ? { ...newLevel, id: editingLevel.id } as CourseLevel : l
      ))
      setEditingLevel(null)
    } else {
      const level: CourseLevel = {
        ...newLevel as CourseLevel,
        id: Date.now().toString()
      }
      setCourseLevels([...courseLevels, level])
    }
    setIsAddLevelOpen(false)
    setNewLevel({ name: "", order: courseLevels.length + 1, description: "" })
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setNewCategory(category)
    setIsAddCategoryOpen(true)
  }

  const handleEditLevel = (level: CourseLevel) => {
    setEditingLevel(level)
    setNewLevel(level)
    setIsAddLevelOpen(true)
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id))
  }

  const handleDeleteLevel = (id: string) => {
    setCourseLevels(courseLevels.filter(l => l.id !== id))
  }

  const toggleCategoryStatus = (id: string) => {
    setCategories(categories.map(c => 
      c.id === id ? { ...c, isActive: !c.isActive } : c
    ))
  }

  const updateClassMode = (id: string, updates: Partial<ClassMode>) => {
    setClassModes(modes => 
      modes.map(mode => mode.id === id ? { ...mode, ...updates } : mode)
    )
  }

  const toggleDeliveryType = (modeId: string, deliveryType: string) => {
    const mode = classModes.find(m => m.id === modeId)
    if (!mode) return

    const updatedTypes = mode.deliveryTypes.includes(deliveryType)
      ? mode.deliveryTypes.filter(type => type !== deliveryType)
      : [...mode.deliveryTypes, deliveryType]

    updateClassMode(modeId, { deliveryTypes: updatedTypes })
  }

  return (
    <div className="space-y-6">
      {/* Course Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            Course Categories
          </CardTitle>
          <p className="text-sm text-gray-600">
            Manage course categories for organizing different types of courses
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Categories ({categories.length})</h3>
              <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingCategory ? "Edit Category" : "Add New Category"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="categoryName">Category Name</Label>
                      <Input
                        id="categoryName"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        placeholder="Enter category name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="categoryDescription">Description</Label>
                      <Input
                        id="categoryDescription"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        placeholder="Enter category description"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="categoryActive"
                        checked={newCategory.isActive}
                        onCheckedChange={(checked) => setNewCategory({ ...newCategory, isActive: checked })}
                      />
                      <Label htmlFor="categoryActive">Active</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveCategory} className="bg-purple-600 hover:bg-purple-700">
                      {editingCategory ? "Update" : "Add"} Category
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {categories.map((category) => (
                <div key={category.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{category.name}</h4>
                        <Badge variant={category.isActive ? "default" : "secondary"}>
                          {category.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={category.isActive}
                        onCheckedChange={() => toggleCategoryStatus(category.id)}
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteCategory(category.id)}
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

      {/* Course Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-purple-600" />
            Course Levels
          </CardTitle>
          <p className="text-sm text-gray-600">
            Define progression levels from beginner to professional
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Levels ({courseLevels.length})</h3>
              <Dialog open={isAddLevelOpen} onOpenChange={setIsAddLevelOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Level
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingLevel ? "Edit Level" : "Add New Level"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="levelName">Level Name</Label>
                      <Input
                        id="levelName"
                        value={newLevel.name}
                        onChange={(e) => setNewLevel({ ...newLevel, name: e.target.value })}
                        placeholder="Enter level name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="levelOrder">Order</Label>
                      <Input
                        id="levelOrder"
                        type="number"
                        value={newLevel.order}
                        onChange={(e) => setNewLevel({ ...newLevel, order: parseInt(e.target.value) })}
                        placeholder="Enter order number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="levelDescription">Description</Label>
                      <Input
                        id="levelDescription"
                        value={newLevel.description}
                        onChange={(e) => setNewLevel({ ...newLevel, description: e.target.value })}
                        placeholder="Enter level description"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddLevelOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveLevel} className="bg-purple-600 hover:bg-purple-700">
                      {editingLevel ? "Update" : "Add"} Level
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {courseLevels
                .sort((a, b) => a.order - b.order)
                .map((level, index) => (
                  <div key={level.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm font-medium">
                            #{level.order}
                          </span>
                          <h4 className="font-semibold">{level.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{level.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditLevel(level)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteLevel(level.id)}
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

      {/* Class Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Class Mode Settings
          </CardTitle>
          <p className="text-sm text-gray-600">
            Configure class modes and delivery types with automatic scheduling options
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {classModes.map((mode) => (
              <div key={mode.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{mode.name}</h4>
                  <Badge variant="outline">Class Mode</Badge>
                </div>

                <div>
                  <Label className="text-sm font-medium">Delivery Types</Label>
                  <div className="flex gap-2 mt-2">
                    {deliveryOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`${mode.id}-${option}`}
                          checked={mode.deliveryTypes.includes(option)}
                          onChange={() => toggleDeliveryType(mode.id, option)}
                        />
                        <Label htmlFor={`${mode.id}-${option}`} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id={`weekend-${mode.id}`}
                    checked={mode.autoSelectWeekend}
                    onCheckedChange={(checked) => updateClassMode(mode.id, { autoSelectWeekend: checked })}
                  />
                  <Label htmlFor={`weekend-${mode.id}`} className="text-sm">
                    Auto-select weekends for scheduling
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}