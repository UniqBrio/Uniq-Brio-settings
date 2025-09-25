"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, MapPin, Camera, Shield, Bell, Globe } from "lucide-react"

interface ProfileData {
  name: string
  email: string
  phone: string
  address: string
  bio: string
  avatar: string
  role: string
  department: string
  joinDate: string
}

export default function ProfileSettings() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "Academy Administrator",
    email: "admin@uniqbrio.com",
    phone: "+1 (555) 123-4567",
    address: "123 Education St, Learning City, LC 12345",
    bio: "Experienced education administrator with 10+ years in academy management and student success.",
    avatar: "/placeholder-user.jpg",
    role: "Administrator",
    department: "Management",
    joinDate: "2020-01-15"
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    marketing: false
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true
  })

  const handleProfileUpdate = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const toggleNotification = (type: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }))
  }

  const togglePrivacy = (setting: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [setting]: !prev[setting] }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-purple-600" />
            Profile Settings
          </CardTitle>
          <p className="text-sm text-gray-600">
            Manage your personal information, preferences, and account settings
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">Admin</div>
              <div className="text-sm text-gray-600">Account Type</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">Active</div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">4+ years</div>
              <div className="text-sm text-gray-600">Member Since</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-gray-600">Profile Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-purple-600" />
            Personal Information
          </CardTitle>
          <p className="text-sm text-gray-600">
            Update your personal details and contact information
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar} alt="Profile picture" />
                <AvatarFallback className="text-lg">
                  {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" className="mb-2">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-sm text-gray-600">
                  Recommended: Square image, at least 200x200 pixels
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleProfileUpdate('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={profile.role} onValueChange={(value) => handleProfileUpdate('role', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Instructor">Instructor</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileUpdate('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Input
                id="address"
                value={profile.address}
                onChange={(e) => handleProfileUpdate('address', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Department</Label>
                <Select value={profile.department} onValueChange={(value) => handleProfileUpdate('department', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="IT">IT Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Join Date</Label>
                <Input
                  type="date"
                  value={profile.joinDate}
                  onChange={(e) => handleProfileUpdate('joinDate', e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Update Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-purple-600" />
            Notification Preferences
          </CardTitle>
          <p className="text-sm text-gray-600">
            Choose how you want to receive notifications and updates
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={() => toggleNotification('email')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">SMS Notifications</Label>
                <p className="text-sm text-gray-600">Receive important alerts via SMS</p>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={() => toggleNotification('sms')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Push Notifications</Label>
                <p className="text-sm text-gray-600">Receive push notifications on your device</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={() => toggleNotification('push')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Marketing Communications</Label>
                <p className="text-sm text-gray-600">Receive updates about new features and courses</p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={() => toggleNotification('marketing')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Privacy & Security
          </CardTitle>
          <p className="text-sm text-gray-600">
            Control your privacy settings and account security
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Profile Visibility</Label>
                <p className="text-sm text-gray-600">Make your profile visible to other users</p>
              </div>
              <Switch
                checked={privacy.profileVisible}
                onCheckedChange={() => togglePrivacy('profileVisible')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Show Email Address</Label>
                <p className="text-sm text-gray-600">Display email address on your public profile</p>
              </div>
              <Switch
                checked={privacy.showEmail}
                onCheckedChange={() => togglePrivacy('showEmail')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Show Phone Number</Label>
                <p className="text-sm text-gray-600">Display phone number on your public profile</p>
              </div>
              <Switch
                checked={privacy.showPhone}
                onCheckedChange={() => togglePrivacy('showPhone')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Allow Direct Messages</Label>
                <p className="text-sm text-gray-600">Allow other users to send you direct messages</p>
              </div>
              <Switch
                checked={privacy.allowMessages}
                onCheckedChange={() => togglePrivacy('allowMessages')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-600" />
            Account Management
          </CardTitle>
          <p className="text-sm text-gray-600">
            Manage your account settings and security options
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                Change Password
              </Button>
              <Button variant="outline">
                Two-Factor Authentication
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                Download Data
              </Button>
              <Button variant="outline">
                Account Backup
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <Button variant="destructive" className="w-full">
                Deactivate Account
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                This action cannot be undone. Please contact support if you need assistance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}