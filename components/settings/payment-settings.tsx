"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { CreditCard, Plus, Edit, Trash2, DollarSign, Calendar, Users } from "lucide-react"

interface PaymentMethod {
  id: string
  name: string
  type: "card" | "bank" | "digital" | "cash"
  isActive: boolean
  processingFee: number
  currency: string
}

interface PaymentPlan {
  id: string
  name: string
  description: string
  installments: number
  frequency: "monthly" | "quarterly" | "yearly"
  discountPercentage: number
  isActive: boolean
}

export default function PaymentSettings() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      name: "Credit/Debit Cards",
      type: "card",
      isActive: true,
      processingFee: 2.9,
      currency: "INR"
    },
    {
      id: "2",
      name: "Bank Transfer",
      type: "bank",
      isActive: true,
      processingFee: 0,
      currency: "INR"
    },
    {
      id: "3",
      name: "UPI/Digital Wallet",
      type: "digital",
      isActive: true,
      processingFee: 1.5,
      currency: "INR"
    },
    {
      id: "4",
      name: "Cash Payment",
      type: "cash",
      isActive: true,
      processingFee: 0,
      currency: "INR"
    }
  ])

  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([
    {
      id: "1",
      name: "Full Payment",
      description: "Pay course fee in full upfront",
      installments: 1,
      frequency: "monthly",
      discountPercentage: 5,
      isActive: true
    },
    {
      id: "2",
      name: "Monthly Installments",
      description: "Pay in 3 monthly installments",
      installments: 3,
      frequency: "monthly",
      discountPercentage: 0,
      isActive: true
    },
    {
      id: "3",
      name: "Quarterly Payment",
      description: "Pay every 3 months",
      installments: 4,
      frequency: "quarterly",
      discountPercentage: 2,
      isActive: true
    }
  ])

  const [isAddMethodOpen, setIsAddMethodOpen] = useState(false)
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false)

  const togglePaymentMethod = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === id ? { ...method, isActive: !method.isActive } : method
      )
    )
  }

  const togglePaymentPlan = (id: string) => {
    setPaymentPlans(plans =>
      plans.map(plan =>
        plan.id === id ? { ...plan, isActive: !plan.isActive } : plan
      )
    )
  }

  const getMethodIcon = (type: string) => {
    switch (type) {
      case "card": return "💳"
      case "bank": return "🏦"
      case "digital": return "📱"
      case "cash": return "💵"
      default: return "💰"
    }
  }

  const getMethodColor = (type: string) => {
    switch (type) {
      case "card": return "bg-blue-100 text-blue-800"
      case "bank": return "bg-green-100 text-green-800"
      case "digital": return "bg-purple-100 text-purple-800"
      case "cash": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-purple-600" />
            Payment Settings
          </CardTitle>
          <p className="text-sm text-gray-600">
            Configure payment methods, processing fees, and installment plans for course fees
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {paymentMethods.filter(m => m.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Active Methods</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {paymentPlans.filter(p => p.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Payment Plans</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((paymentMethods.reduce((avg, m) => avg + m.processingFee, 0) / paymentMethods.length) * 100) / 100}%
              </div>
              <div className="text-sm text-gray-600">Avg Processing Fee</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {Math.max(...paymentPlans.map(p => p.discountPercentage))}%
              </div>
              <div className="text-sm text-gray-600">Max Discount</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-600" />
              Payment Methods
            </CardTitle>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Method
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Configure available payment methods and their processing fees
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getMethodIcon(method.type)}</span>
                      <h4 className="font-semibold">{method.name}</h4>
                      <Badge className={getMethodColor(method.type)}>
                        {method.type}
                      </Badge>
                      <Badge variant={method.isActive ? "default" : "secondary"}>
                        {method.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {method.processingFee}% Processing Fee
                      </span>
                      <span>Currency: {method.currency}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={method.isActive}
                      onCheckedChange={() => togglePaymentMethod(method.id)}
                    />
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Plans */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Payment Plans & Installments
            </CardTitle>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Plan
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Set up installment plans and payment schedules for course fees
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {paymentPlans.map((plan) => (
              <div key={plan.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{plan.name}</h4>
                      <Badge variant={plan.isActive ? "default" : "secondary"}>
                        {plan.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {plan.discountPercentage > 0 && (
                        <Badge className="bg-green-100 text-green-800">
                          {plan.discountPercentage}% Discount
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>{plan.installments} Installments</span>
                      <span className="capitalize">{plan.frequency} Frequency</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={plan.isActive}
                      onCheckedChange={() => togglePaymentPlan(plan.id)}
                    />
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Payment Configuration
          </CardTitle>
          <p className="text-sm text-gray-600">
            General payment settings and policies
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Default Currency</Label>
                <Select defaultValue="INR">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Payment Due Days</Label>
                <Input type="number" defaultValue="7" placeholder="Days before payment due" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Late Payment Penalties</Label>
                  <p className="text-sm text-gray-600">Charge penalty for overdue payments</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Auto Payment Reminders</Label>
                  <p className="text-sm text-gray-600">Send automated payment reminder notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Partial Payments</Label>
                  <p className="text-sm text-gray-600">Allow students to make partial payments</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}