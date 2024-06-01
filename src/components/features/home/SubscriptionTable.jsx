import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

import * as queries from "@/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { subscriptionTabelColumns } from "./constants";
import { useAppContext } from "@/context/AppContext";

export default function SubscriptionTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [tokenStack, setTokenStack] = useState([]);
  const [currentToken, setCurrentToken] = useState(null);
  const { toast } = useToast();
  const {}=useAppContext();

  const table = useReactTable({
    data: subscriptionData
      ? subscriptionData?.listUserSubscriptions?.items
      : [],
    columns: subscriptionTabelColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const getSubscriptionData = async (nextToken = null) => {
    try {
      const client = generateClient();
      const subscriptionData = await client.graphql({
        query: queries.listUserSubscriptions,
        variables: {
          limit: 5,
          nextToken: nextToken,
        },
      });
      setSubscriptionData(subscriptionData.data);
      setCurrentToken(nextToken);
      console.log("successfully grabbed subscription data", subscriptionData);
    } catch (error) {
      console.log("error while fetching user subscriptions", error);
      toast({
        title: "Failure",
        description: "Something went wrong while fetching the subscription",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getSubscriptionData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter titles..."
          value={table.getColumn("title")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                console.log('row data',row.original)
                const rowData=row.original
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                        className={`${rowData.checked?"bg-green-500/30":"bg-red-500/30"}`}
                    >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={subscriptionTabelColumns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const previousToken = tokenStack.pop();
              setTokenStack(tokenStack);
              getSubscriptionData(previousToken);
            }}
            disabled={tokenStack.length === 0}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const nextToken =
                subscriptionData.listUserSubscriptions.nextToken;
              if (nextToken) {
                setTokenStack([...tokenStack, currentToken]);
                getSubscriptionData(nextToken);
              }
            }}
            disabled={!subscriptionData?.listUserSubscriptions?.nextToken}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
