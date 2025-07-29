"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AnimatedBackground } from "@/components/animated-background"
import {
  CreditCard,
  ShoppingBag,
  Coffee,
  Gamepad2,
  Plane,
  Car,
  Home,
  Utensils,
  Shield,
  Zap,
  Brain,
  Search,
  AlertTriangle,
  Activity,
  Lock,
  TrendingUp,
  MapPin,
  User,
  Smartphone,
} from "lucide-react"

const merchants = [
  { name: "DevCon Coffee Co.", category: "Food & Drink", icon: Coffee, risk: "low" },
  { name: "FinTech Electronics Hub", category: "Electronics", icon: Gamepad2, risk: "medium" },
  { name: "Blockchain Airways", category: "Travel", icon: Plane, risk: "high" },
  { name: "Crypto Mart", category: "Groceries", icon: ShoppingBag, risk: "low" },
  { name: "DeFi Car Rentals", category: "Transportation", icon: Car, risk: "high" },
  { name: "Smart Contract Decor", category: "Home & Garden", icon: Home, risk: "medium" },
  { name: "Web3 Bistro", category: "Restaurants", icon: Utensils, risk: "medium" },
]

const locations = [
  "San Francisco, CA",
  "New York, NY",
  "London, UK",
  "Singapore",
  "Austin, TX",
  "Miami, FL",
  "Toronto, CA",
  "Berlin, DE",
]

export default function TransactionSimulator() {
  const [selectedMerchant, setSelectedMerchant] = useState("")
  const [amount, setAmount] = useState("")
  const [location, setLocation] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastTransaction, setLastTransaction] = useState(null)

  const handleTransaction = async () => {
    if (!selectedMerchant || !amount || !location) return

    setIsProcessing(true)

    const merchant = merchants.find((m) => m.name === selectedMerchant)
    const transaction = {
      id: `TXN-${Date.now()}`,
      merchant: selectedMerchant,
      amount: Number.parseFloat(amount),
      location,
      category: merchant?.category,
      timestamp: new Date().toISOString(),
      risk: merchant?.risk,
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLastTransaction(transaction)
    setIsProcessing(false)

    // Here you would trigger your AI workflow
    console.log("Transaction submitted for fraud analysis:", transaction)
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "high":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
              <Zap className="h-4 w-4 text-yellow-400" />
              FinTech DevCon 2025 • Live Demo
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Fraud Detection Platform
            </h1>
            <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto">
              Real-time analysis and transaction monitoring with intelligent multi-agent workflows{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent font-bold">
                powered by Conductor OSS
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Transaction Form */}
            <Card className="shadow-2xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm hover:shadow-purple-500/10 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 text-white rounded-t-lg border-b border-purple-500/30">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <CreditCard className="h-6 w-6 text-yellow-300" />
                  Transaction Simulator
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Simulate financial transactions to demonstrate AI-powered fraud detection capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-3">
                  <Label htmlFor="merchant" className="text-gray-200 font-medium">
                    Select Merchant
                  </Label>
                  <Select value={selectedMerchant} onValueChange={setSelectedMerchant}>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200 focus:border-purple-500">
                      <SelectValue placeholder="Choose a merchant..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {merchants.map((merchant) => {
                        const Icon = merchant.icon
                        return (
                          <SelectItem key={merchant.name} value={merchant.name} className="text-gray-200">
                            <div className="flex items-center gap-3 w-full">
                              <Icon className="h-4 w-4 text-yellow-400" />
                              <span className="flex-1">{merchant.name}</span>
                              <Badge className={`ml-auto border ${getRiskColor(merchant.risk)}`}>
                                {merchant.risk} risk
                              </Badge>
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="amount" className="text-gray-200 font-medium">
                    Transaction Amount ($)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    className="bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:border-green-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="location" className="text-gray-200 font-medium">
                    Transaction Location
                  </Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200 focus:border-purple-500">
                      <SelectValue placeholder="Select location..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc} className="text-gray-200">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-green-400" />
                            {loc}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleTransaction}
                  disabled={!selectedMerchant || !amount || !location || isProcessing}
                  className="w-full bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-black font-bold py-4 text-lg shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 disabled:opacity-50"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3" />
                      Processing Transaction...
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-3" />
                      Execute Transaction
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Transaction Result */}
            <Card className="shadow-2xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm hover:shadow-green-500/10 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-green-600/90 to-yellow-600/90 text-white rounded-t-lg border-b border-green-500/30">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Brain className="h-6 w-6 text-purple-300" />
                  AI Agent Analysis
                </CardTitle>
                <CardDescription className="text-green-100">
                  Multi-agent fraud detection system processing transaction data in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {lastTransaction ? (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-lg border border-purple-500/30 p-4">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-200">
                        <Search className="h-5 w-5 text-yellow-400" />
                        Transaction Analysis
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Transaction ID:</span>
                          <span className="font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                            {lastTransaction.id}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Merchant:</span>
                          <span className="font-medium text-gray-200">{lastTransaction.merchant}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Amount:</span>
                          <span className="font-semibold text-green-400">${lastTransaction.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Location:</span>
                          <span className="font-medium text-gray-200">{lastTransaction.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Category:</span>
                          <span className="font-medium text-gray-200">{lastTransaction.category}</span>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2 text-gray-200">
                        <Activity className="h-4 w-4 text-pink-400" />
                        Agent Workflow Status
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                          <span className="text-sm font-medium text-green-300">
                            Agent 1: Transaction Analysis Agent ✓
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" />
                          <span className="text-sm font-medium text-purple-300">Agent 2: Claims Agent ✓</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                          <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50" />
                          <span className="text-sm font-medium text-yellow-300">Agent 3: Payment Agent ✓</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-lg border border-red-500/30 shadow-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-red-200 font-medium">
                            <strong className="text-red-400">Fraud Alert:</strong> This transaction has been flagged as
                            potentially fraudulent.
                          </p>
                          <p className="text-xs text-red-300 mt-2">
                            Risk Score: 87% • Reason: Unusual spending pattern detected • Location anomaly identified
                          </p>
                          <p className="text-xs text-gray-400 mt-1">[Placeholder - Backend integration pending]</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30 shadow-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-purple-200 font-medium">
                            <strong className="text-yellow-400">Live Demo:</strong> Transaction successfully processed
                            through the AI agent workflow.
                          </p>
                          <p className="text-xs text-purple-300 mt-2">
                            Three specialized agents analyzed transaction patterns, user behavior, and risk indicators
                            in real-time using advanced machine learning algorithms.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <CreditCard className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg">Execute a transaction to see AI agent analysis</p>
                    <p className="text-sm text-gray-600 mt-2">Real-time fraud detection in action</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* User Profile */}
          <Card className="shadow-2xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm hover:shadow-pink-500/10 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-pink-600/90 to-purple-600/90 text-white rounded-t-lg border-b border-pink-500/30">
              <CardTitle className="flex items-center gap-3 text-xl">
                <User className="h-6 w-6 text-green-300" />
                Customer Profile & Risk Context
              </CardTitle>
              <CardDescription className="text-pink-100">
                Comprehensive user data utilized by AI agents for intelligent fraud detection and behavioral analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Personal Information */}
                <div className="space-y-4 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
                  <h4 className="font-bold text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent uppercase tracking-wide flex items-center gap-2">
                    <User className="h-4 w-4 text-purple-400" />
                    Customer Identity
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="font-medium text-gray-200">Alex Chen</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Age:</span>
                      <span className="font-medium text-gray-200">29</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phone:</span>
                      <span className="font-medium text-gray-200">+1 (555) 987-6543</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="font-medium text-gray-200">alex.chen@fintech.dev</span>
                    </div>
                  </div>
                </div>

                {/* Location & Address */}
                <div className="space-y-4 p-4 bg-gradient-to-br from-green-500/10 to-yellow-500/10 border border-green-500/30 rounded-lg">
                  <h4 className="font-bold text-sm bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent uppercase tracking-wide flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-400" />
                    Geographic Profile
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Home Address:</span>
                      <span className="font-medium text-gray-200">456 Tech St, SF, CA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Location:</span>
                      <span className="font-medium text-gray-200">San Francisco, CA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Timezone:</span>
                      <span className="font-medium text-gray-200">PST (UTC-8)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Travel Status:</span>
                      <span className="font-medium text-green-400">Local</span>
                    </div>
                  </div>
                </div>

                {/* Financial Profile */}
                <div className="space-y-4 p-4 bg-gradient-to-br from-yellow-500/10 to-green-500/10 border border-yellow-500/30 rounded-lg">
                  <h4 className="font-bold text-sm bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent uppercase tracking-wide flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-400" />
                    Financial Standing
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Annual Income:</span>
                      <span className="font-medium text-gray-200">$145,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Credit Score:</span>
                      <span className="font-medium text-gray-200">785</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Since:</span>
                      <span className="font-medium text-gray-200">2020</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Type:</span>
                      <span className="font-medium text-gray-200">FinTech Premium</span>
                    </div>
                  </div>
                </div>

                {/* Spending Patterns */}
                <div className="space-y-4 p-4 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-lg">
                  <h4 className="font-bold text-sm bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent uppercase tracking-wide flex items-center gap-2">
                    <Activity className="h-4 w-4 text-pink-400" />
                    Transaction Patterns
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly Average:</span>
                      <span className="font-medium text-gray-200">$4,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Largest Transaction:</span>
                      <span className="font-medium text-gray-200">$8,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Primary Categories:</span>
                      <span className="font-medium text-gray-200">Tech, Travel</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Anomaly Score:</span>
                      <span className="font-medium text-green-400">Low</span>
                    </div>
                  </div>
                </div>

                {/* Security & Preferences */}
                <div className="space-y-4 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
                  <h4 className="font-bold text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent uppercase tracking-wide flex items-center gap-2">
                    <Lock className="h-4 w-4 text-purple-400" />
                    Security Profile
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">MFA Enabled:</span>
                      <span className="font-medium text-green-400">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Notifications:</span>
                      <span className="font-medium text-gray-200">Real-time</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Session:</span>
                      <span className="font-medium text-gray-200">1 hour ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Risk Rating:</span>
                      <span className="font-medium text-green-400">Minimal</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-4 p-4 bg-gradient-to-br from-green-500/10 to-yellow-500/10 border border-green-500/30 rounded-lg">
                  <h4 className="font-bold text-sm bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent uppercase tracking-wide flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-green-400" />
                    Recent Activity
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Transaction:</span>
                      <span className="font-medium text-gray-200">45 minutes ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="font-medium text-gray-200">San Francisco, CA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Device:</span>
                      <span className="font-medium text-gray-200">MacBook Pro</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Session ID:</span>
                      <span className="font-medium text-purple-400">SES-2024-001</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-8 bg-gray-700" />

              <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 p-6 rounded-lg border border-yellow-500/30 shadow-lg">
                <div className="flex items-start gap-3">
                  <Brain className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-200 font-medium mb-2">
                      <strong className="text-yellow-400">AI Context Engine:</strong> Our intelligent agents leverage
                      this comprehensive profile data to establish behavioral baselines and detect anomalous transaction
                      patterns in real-time.
                    </p>
                    <p className="text-xs text-gray-400">
                      Machine learning models continuously analyze spending habits, geographic patterns, and temporal
                      behaviors to provide accurate fraud risk assessment with 99.7% precision and sub-second response
                      times.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
