"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dashboard } from "@/components/dashboard"
import { ExpenseTracker } from "@/components/expense-tracker"
import { BudgetPlanner } from "@/components/budget-planner"
import { ExportData } from "@/components/export-data"
import {Budget, Expense} from "@/types";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])

  return (
      <div className="w-full md:max-w-4xl lg:max-w-5xl mx-auto p-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Expense & Budget Tracker</h1>
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Overview of your expenses and budget</CardDescription>
              </CardHeader>
              <CardContent>
                <Dashboard expenses={expenses} budgets={budgets} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="expenses">
            <Card>
              <CardHeader>
                <CardTitle>Expense Tracker</CardTitle>
                <CardDescription>Add and manage your expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseTracker expenses={expenses} setExpenses={setExpenses} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle>Budget Planner</CardTitle>
                <CardDescription>Set and manage your budget categories</CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetPlanner budgets={budgets} setBudgets={setBudgets} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="export">
            <Card>
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
                <CardDescription>Export your expense and budget data to Excel</CardDescription>
              </CardHeader>
              <CardContent>
                <ExportData expenses={expenses} budgets={budgets} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}

