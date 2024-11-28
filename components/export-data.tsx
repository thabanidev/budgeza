import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Expense, Budget } from "@/types"
import * as XLSX from 'xlsx'

export function ExportData({ expenses, budgets }: { expenses: Expense[]; budgets: Budget[] }) {
    const [isExporting, setIsExporting] = useState(false)

    const exportToExcel = () => {
        setIsExporting(true)

        const workbook = XLSX.utils.book_new()

        // Create expenses sheet
        const expensesSheet = XLSX.utils.json_to_sheet(expenses)
        XLSX.utils.book_append_sheet(workbook, expensesSheet, "Expenses")

        // Create budgets sheet
        const budgetsSheet = XLSX.utils.json_to_sheet(budgets)
        XLSX.utils.book_append_sheet(workbook, budgetsSheet, "Budgets")

        // Generate Excel file
        XLSX.writeFile(workbook, "expense_budget_data.xlsx")

        setIsExporting(false)
    }

    return (
        <div className="space-y-4">
            <p>Click the button below to export your expense and budget data to an Excel file.</p>
            <Button onClick={exportToExcel} disabled={isExporting}>
                {isExporting ? "Exporting..." : "Export to Excel"}
            </Button>
        </div>
    )
}

