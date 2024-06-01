import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/context/AppContext";
import {
  ArrowUpDown,
  ChevronDown,
  Delete,
  Loader,
  MoreHorizontal,
} from "lucide-react";
import { generateClient } from "aws-amplify/api";
import * as mutations from "@/graphql/mutations";
import { useState } from "react";

export const subscriptionTabelColumns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="lowercase">{row.getValue("description")}</p>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;
      const [isLoading, setIsLoading] = useState(false);
      const { toast } = useToast();
      const { onTableDataUpdate } = useAppContext();
      const client = generateClient();
      const handleUpdateStatus = async (checked) => {
        try {
          setIsLoading(true);
          const updateData = await client.graphql({
            query: mutations.updateUserSubscription,
            variables: {
              input: {
                id: rowData.id,
                checked: checked,
              },
            },
          });
          onTableDataUpdate();
          toast({
            title: "Success",
            description: "Status changed successfully",
            variant: "success",
          });
        } catch (error) {
          console.log("error in updating the status", error);
          toast({
            title: "failure",
            description: "Something went wrong",
            variant: "desctructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <>
          {rowData.checked ? (
            <Button
              variant="destructive"
              className="flex flex-row items-center gap-4"
              onClick={() => handleUpdateStatus(false)}>
              {isLoading && <Loader className="animate-spin" />}
              <p>Mark as uncheck</p>
            </Button>
          ) : (
            <Button
              onClick={() => handleUpdateStatus(true)}
              className="flex flex-row items-center gap-4">
              {isLoading && <Loader className="animate-spin" />}
              <p>Mark as Checked</p>
            </Button>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;
      const [isLoading, setIsLoading] = useState(false);
      const { toast } = useToast();
      const { onTableDataUpdate, onTableDataAdded } = useAppContext();
      const client = generateClient();
      const handleDeleteItem = async () => {
        try {
          setIsLoading(true);
          const deleteData = await client.graphql({
            query: mutations.deleteUserSubscription,
            variables: {
              input: {
                id: rowData.id,
              },
            },
          });
          onTableDataAdded();
          toast({
            title: "Success",
            description: "Subscription deleted successfully",
            variant: "success",
          });
        } catch (error) {
          console.log("error in updating the status", error);
          toast({
            title: "failure",
            description: "Something went wrong",
            variant: "desctructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <Button
          onClick={handleDeleteItem}
          className="flex flex-row items-center gap-4"
          variant="desctructive">
          {isLoading && <Loader className="animate-spin " />}
          <Delete className="text-red-500" />
        </Button>
      );
    },
  },
];
