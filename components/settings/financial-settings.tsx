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
import { DollarSign, CreditCard, Award, Percent, Edit, Plus, Trash2 } from "lucide-react"

interface Currency {
  code: string
  symbol: string
  country: string
  isDefault: boolean
}

interface PaymentSetting {
  id: string
  name: string
  isEnabled: boolean
  notifyInvoice: boolean
}

interface Scholarship {
  id: string
  name: string
  type: "percentage" | "fixed_amount"
  value: number
  eligibilityCriteria: string[]
  maxRecipients: number
  isActive: boolean
  description: string
}

export default function FinancialSettings() {
  const [currencies, setCurrencies] = useState<Currency[]>([
    { code: "INR", symbol: "₹", country: "India", isDefault: true },
    { code: "USD", symbol: "$", country: "United States", isDefault: false },
    { code: "CAD", symbol: "C$", country: "Canada", isDefault: false },
    { code: "GBP", symbol: "£", country: "United Kingdom", isDefault: false },
    { code: "EUR", symbol: "€", country: "European Union", isDefault: false }
  ])

  const [paymentSettings, setPaymentSettings] = useState<PaymentSetting[]>([
    { id: "invoice_email", name: "Invoice Email Notifications", isEnabled: true, notifyInvoice: true },
    { id: "payment_reminder", name: "Payment Reminder Emails", isEnabled: true, notifyInvoice: true },
    { id: "late_fee", name: "Late Fee Charges", isEnabled: false, notifyInvoice: true },
    { id: "auto_receipt", name: "Auto Receipt Generation", isEnabled: true, notifyInvoice: false }
  ])

  const [scholarships, setScholarships] = useState<Scholarship[]>([
    {
      id: "1",
      name: "Merit Scholarship",
      type: "percentage",
      value: 25,
      eligibilityCriteria: ["Academic Excellence", "90% Attendance"],
      maxRecipients: 10,
      isActive: true,
      description: "For high-performing students"
    },
    {
      id: "2", 
      name: "Need-based Aid",
      type: "percentage",
      value: 50,
      eligibilityCriteria: ["Financial Need", "Recommendation Letter"],
      maxRecipients: 5,
      isActive: true,
      description: "For students with financial constraints"
    },
    {
      id: "3",
      name: "Early Bird Discount", 
      type: "fixed_amount",
      value: 5000,
      eligibilityCriteria: ["Early Registration"],
      maxRecipients: 50,
      isActive: true,
      description: "Discount for early course registration"
    }
  ])

  const [taxSettings, setTaxSettings] = useState({
    enableTax: true,
    defaultTaxRate: 18,
    taxName: "GST",
    taxNumber: "29ABCDE1234F1Z5"
  })

  const [isAddScholarshipOpen, setIsAddScholarshipOpen] = useState(false)
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null)
  const [newScholarship, setNewScholarship] = useState<Partial<Scholarship>>({
    name: "",
    type: "percentage",
    value: 0,
    eligibilityCriteria: [],
    maxRecipients: 10,
    isActive: true,
    description: ""
  })

  const availableCriteria = [
    "Academic Excellence",
    "90% Attendance", 
    "Financial Need",
    "Recommendation Letter",
    "Community Service",
    "Sports Achievement",
    "Arts Achievement",
    "Early Registration",
    "Sibling Discount",
    "Alumni Reference"
  ]

  const setDefaultCurrency = (code: string) => {
    setCurrencies(currencies.map(c => ({
      ...c,
      isDefault: c.code === code
    })))
  }

  const togglePaymentSetting = (id: string) => {
    setPaymentSettings(settings =>
      settings.map(setting => 
        setting.id === id ? { ...setting, isEnabled: !setting.isEnabled } : setting
      )
    )
  }

  const toggleScholarshipStatus = (id: string) => {
    setScholarships(scholarships =>
      scholarships.map(scholarship => 
        scholarship.id === id ? { ...scholarship, isActive: !scholarship.isActive } : scholarship
      )
    )
  }

  const handleSaveScholarship = () => {
    if (editingScholarship) {
      setScholarships(scholarships =>
        scholarships.map(s => s.id === editingScholarship.id ? { ...newScholarship, id: editingScholarship.id } as Scholarship : s)
      )
      setEditingScholarship(null)
    } else {
      const scholarship: Scholarship = {
        ...newScholarship as Scholarship,
        id: Date.now().toString()
      }
      setScholarships([...scholarships, scholarship])
    }
    setIsAddScholarshipOpen(false)
    resetNewScholarship()
  }

  const resetNewScholarship = () => {
    setNewScholarship({
      name: "",
      type: "percentage",
      value: 0,
      eligibilityCriteria: [],
      maxRecipients: 10,
      isActive: true,
      description: ""
    })
  }

  const handleEditScholarship = (scholarship: Scholarship) => {
    setEditingScholarship(scholarship)
    setNewScholarship(scholarship)
    setIsAddScholarshipOpen(true)
  }

  const handleDeleteScholarship = (id: string) => {
    setScholarships(scholarships => scholarships.filter(s => s.id !== id))
  }

  const toggleCriteria = (criteria: string) => {
    const current = newScholarship.eligibilityCriteria || []
    const updated = current.includes(criteria)
      ? current.filter(c => c !== criteria)
      : [...current, criteria]
    
    setNewScholarship({ ...newScholarship, eligibilityCriteria: updated })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-purple-600" />
            Financial Settings
          </CardTitle>
          <p className="text-sm text-gray-600">
            Configure currency, payment notifications, tax settings, and scholarship programs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {currencies.length}
              </div>
              <div className="text-sm text-gray-600">Supported Currencies</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {scholarships.filter(s => s.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Active Scholarships</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {taxSettings.defaultTaxRate}%
              </div>
              <div className="text-sm text-gray-600">Default Tax Rate</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {paymentSettings.filter(p => p.isEnabled).length}
              </div>
              <div className="text-sm text-gray-600">Payment Features</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Currency Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-purple-600" />
            Currency Configuration
          </CardTitle>
          <p className="text-sm text-gray-600">
            Manage supported currencies and set default currency for transactions
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {currencies.map((currency) => (
              <div key={currency.code} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-mono">{currency.symbol}</div>
                  <div>
                    <div className="font-medium">{currency.code}</div>
                    <div className="text-sm text-gray-600">{currency.country}</div>
                  </div>
                  {currency.isDefault && (
                    <Badge className="bg-green-100 text-green-800">Default</Badge>
                  )}
                </div>
                <Button
                  variant={currency.isDefault ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDefaultCurrency(currency.code)}
                  disabled={currency.isDefault}
                >
                  {currency.isDefault ? "Default" : "Set Default"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-purple-600" />
            Payment Notifications
          </CardTitle>
          <p className="text-sm text-gray-600">
            Configure payment-related notifications and automated features
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{setting.name}</h4>
                  <p className="text-sm text-gray-600">
                    {setting.notifyInvoice ? "Email notifications enabled" : "System feature"}
                  </p>
                </div>
                <Switch
                  checked={setting.isEnabled}
                  onCheckedChange={() => togglePaymentSetting(setting.id)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tax Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5 text-purple-600" />
            Tax Configuration
          </CardTitle>
          <p className="text-sm text-gray-600">
            Set up tax rates and tax identification details
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                id="enableTax"
                checked={taxSettings.enableTax}
                onCheckedChange={(checked) => setTaxSettings({ ...taxSettings, enableTax: checked })}
              />
              <Label htmlFor="enableTax">Enable Tax Calculations</Label>
            </div>

            {taxSettings.enableTax && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="taxName">Tax Name</Label>
                  <Input
                    id="taxName"
                    value={taxSettings.taxName}
                    onChange={(e) => setTaxSettings({ ...taxSettings, taxName: e.target.value })}
                    placeholder="e.g., GST, VAT, Sales Tax"
                  />
                </div>
                <div>
                  <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={taxSettings.defaultTaxRate}
                    onChange={(e) => setTaxSettings({ ...taxSettings, defaultTaxRate: parseFloat(e.target.value) || 0 })}
                    placeholder="18"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="taxNumber">Tax Registration Number</Label>
                  <Input
                    id="taxNumber"
                    value={taxSettings.taxNumber}
                    onChange={(e) => setTaxSettings({ ...taxSettings, taxNumber: e.target.value })}
                    placeholder="Enter tax registration number"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scholarships */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            Scholarship Programs
          </CardTitle>
          <p className="text-sm text-gray-600">
            Create and manage scholarship programs with eligibility criteria
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Active Scholarships ({scholarships.filter(s => s.isActive).length})</h3>
              <Dialog open={isAddScholarshipOpen} onOpenChange={setIsAddScholarshipOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Scholarship
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingScholarship ? "Edit Scholarship" : "Add New Scholarship"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="scholarshipName">Scholarship Name</Label>
                        <Input
                          id="scholarshipName"
                          value={newScholarship.name}
                          onChange={(e) => setNewScholarship({ ...newScholarship, name: e.target.value })}
                          placeholder="Enter scholarship name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="scholarshipType">Type</Label>
                        <Select
                          value={newScholarship.type}
                          onValueChange={(value: "percentage" | "fixed_amount") => 
                            setNewScholarship({ ...newScholarship, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Percentage Discount</SelectItem>
                            <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="scholarshipValue">
                          Value {newScholarship.type === "percentage" ? "(%)" : `(${currencies.find(c => c.isDefault)?.symbol})`}
                        </Label>
                        <Input
                          id="scholarshipValue"
                          type="number"
                          value={newScholarship.value}
                          onChange={(e) => setNewScholarship({ ...newScholarship, value: parseFloat(e.target.value) || 0 })}
                          placeholder={newScholarship.type === "percentage" ? "25" : "5000"}
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxRecipients">Max Recipients</Label>
                        <Input
                          id="maxRecipients"
                          type="number"
                          value={newScholarship.maxRecipients}
                          onChange={(e) => setNewScholarship({ ...newScholarship, maxRecipients: parseInt(e.target.value) || 0 })}
                          placeholder="10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newScholarship.description}
                        onChange={(e) => setNewScholarship({ ...newScholarship, description: e.target.value })}
                        placeholder="Brief description of the scholarship"
                      />
                    </div>

                    <div>
                      <Label>Eligibility Criteria</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {availableCriteria.map((criteria) => (
                          <div key={criteria} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`criteria-${criteria}`}
                              checked={newScholarship.eligibilityCriteria?.includes(criteria) || false}
                              onChange={() => toggleCriteria(criteria)}
                            />
                            <Label htmlFor={`criteria-${criteria}`} className="text-sm">
                              {criteria}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="scholarshipActive"
                        checked={newScholarship.isActive}
                        onCheckedChange={(checked) => setNewScholarship({ ...newScholarship, isActive: checked })}
                      />
                      <Label htmlFor="scholarshipActive">Active Scholarship</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddScholarshipOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveScholarship} className="bg-purple-600 hover:bg-purple-700">
                      {editingScholarship ? "Update" : "Create"} Scholarship
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {scholarships.map((scholarship) => (
                <div key={scholarship.id} className={`border rounded-lg p-4 ${!scholarship.isActive ? "opacity-60" : ""}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{scholarship.name}</h4>
                        <Badge variant={scholarship.isActive ? "default" : "secondary"}>
                          {scholarship.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">
                          {scholarship.type === "percentage" 
                            ? `${scholarship.value}% Off` 
                            : `${currencies.find(c => c.isDefault)?.symbol}${scholarship.value} Off`
                          }
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{scholarship.description}</p>
                      <div className="text-sm text-gray-500">
                        Max Recipients: {scholarship.maxRecipients}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={scholarship.isActive}
                        onCheckedChange={() => toggleScholarshipStatus(scholarship.id)}
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditScholarship(scholarship)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteScholarship(scholarship.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {scholarship.eligibilityCriteria.map((criteria) => (
                      <Badge key={criteria} variant="secondary" className="text-xs">
                        {criteria}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}