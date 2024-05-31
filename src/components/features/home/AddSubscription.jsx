import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddSubscription = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Subscription</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Subscription</DialogTitle>
          <DialogDescription>
            Please fill out subscription details
          </DialogDescription>
        </DialogHeader>

        <div className="w-full h-max flex flex-col gap-3">
            
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubscription;
