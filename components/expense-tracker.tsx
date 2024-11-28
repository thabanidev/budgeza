import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Expense } from "@/types"

const formSchema = z.object({
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    amount: z.coerce.number().positive({
        message: "Amount must be a positive number.",
    }),
    category: z.string({
        required_error: "Please select a category.",
    }),
    date: z.string(),
})

export function ExpenseTracker({ expenses, setExpenses }: { expenses: Expense[]; setExpenses: (expenses: Expense[]) => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            amount: 0,
            category: "",
            date: new Date().toISOString().split("T")[0],
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setExpenses([...expenses, values as Expense])
        form.reset()
    }

    return (
        <div className="space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Groceries" {...field} />
                                </FormControl>
                                <FormDescription>Enter a description for your expense.</FormDescription>
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
                                <FormDescription>Enter the amount spent.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="food">Food</SelectItem>
                                        <SelectItem value="transportation">Transportation</SelectItem>
                                        <SelectItem value="utilities">Utilities</SelectItem>
                                        <SelectItem value="entertainment">Entertainment</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>Select a category for your expense.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormDescription>Enter the date of the expense.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Add Expense</Button>
                </form>
            </Form>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense, index) => (
                        <TableRow key={index}>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>${expense.amount.toFixed(2)}</TableCell>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell>{expense.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

