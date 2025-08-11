"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: string;
  lastLogin: string;
  avatar: string;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Image
          src={row.original.avatar}
          alt={row.original.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => <Badge variant="outline">{row.original.plan}</Badge>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant={row.original.status === "Active" ? "default" : "secondary"}>{row.original.status}</Badge>,
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: ({ row }) => new Date(row.original.lastLogin).toLocaleDateString(),
  },
]

export function CustomDataTable({ data }: { data: User[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
