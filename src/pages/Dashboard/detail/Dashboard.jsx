import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table";
import { useState } from "react";


// Define the table data using the interface
const tableData = [
    {
        id: 1,
        user: {
            name: "Lindsey Curtis",
            role: "000000"
        },
        projectName: "Agency Website",

        status: "dsadsadsadsa dsad sadsadsa dsa dsad asd asdabkjb.jkb; jbkjb "
    },
]

export default function Dashboard() {
   
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    {/* Table Header */}
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Nama
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Tempat Tanggal Lahir
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Status
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-20 py-3 font-medium text-gray-500 text-end text-theme-m dark:text-gray-400"
                            >
                                Action
                            </TableCell>

                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {tableData.map(order => (
                            <TableRow key={order.id}>
                                <TableCell className="px-5 py-4 sm:px-6 text-start">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {order.user.name}
                                            </span>
                                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                {order.user.role}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {order.projectName}
                                </TableCell>

                                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400 ">
                                    {order.status}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-end w-[1%] whitespace-nowrap">
                                    <div className="flex justify-end gap-2">
                                        <div className="relative group inline-block">
                                            <button
                                               
                                                className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                                            >
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z" clipRule="evenodd" />
                                                </svg>

                                                <span className="absolute z-10 bottom-full mb-2 hidden w-max rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 group-hover:block transition">
                                                    Ambulan
                                                </span>
                                            </button>
                                            
                                        </div>
                                        <div className="relative group inline-block">
                                            <button
                                                
                                                className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                                            >
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
                                                </svg>

                                                <span className="absolute z-10 bottom-full mb-2 hidden w-max rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 group-hover:block transition">
                                                    Jenazah
                                                </span>
                                            </button>
                                            
                                        </div>
                                    </div>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}