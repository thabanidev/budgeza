import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Expense, Budget } from "@/types"

export function Dashboard({ expenses, budgets }: { expenses: Expense[]; budgets: Budget[] }) {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0)

    const chartData = budgets.map((budget) => {
        const spent = expenses
            .filter((expense) => expense.category === budget.category)
            .reduce((sum, expense) => sum + expense.amount, 0)
        return {
            name: budget.category,
            budget: budget.amount,
            spent: spent,
        }
    })

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${totalBudget.toFixed(2)}</div>
                </CardContent>
            </Card>
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Expenses vs Budget</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                            <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}

