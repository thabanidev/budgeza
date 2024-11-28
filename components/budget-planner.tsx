import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Budget } from "@/types"

const formSchema = z.object({
    category: z.string().min(2, {
        message: "Category must be at least 2 characters.",
    }),
    amount: z.coerce.number().positive({
        message: "Amount must be a positive number.",
    }),
})

export function BudgetPlanner({ budgets, setBudgets }: { budgets: Budget[]; setBudgets: (budgets: Budget[]) => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: "",
            amount: 0,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setBudgets([...budgets, values as Budget])
        form.reset()
    }

    return (
        <div className="space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="Food" {...field} />
                                </FormControl>
                                <FormDescription>Enter a budget category.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormDescription>Enter the budget amount for this category.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Add Budget Category</Button>
                </form>
            </Form>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {budgets.map((budget, index) => (
                        <TableRow key={index}>
                            <TableCell>{budget.category}</TableCell>
                            <TableCell>${budget.amount.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

