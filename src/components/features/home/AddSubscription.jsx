import React, { useState } from "react";

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
import * as mutations from '@/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { useAppContext } from "@/context/AppContext";

const AddSubscription = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const {user}=useAppContext()

  const handleInsertSubscription=async ()=>{
    try {
      const graphqlClient=generateClient()
      const newSubscription=await graphqlClient.graphql({
        query:mutations.createUserSubscription,
        variables:{
          title:title,
          description:description,
          checked:false,
          email:user
          
        }
      })
    } catch (error) {
      
    }
  }


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
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
          <Label htmlfor="title">Title</Label>
          <Input id="title" value={title} onChange={(e)=>{
            setIsTitle(e.target.value)
          }} className="w-full" />
          <Label htmlfor="description">Description</Label>
          <Input id="description" className="w-full" />
          <Button className="w-full mt-10" value={description} onChange={(e)=>{
            setDescription(e.target.value)
          }} >Add Subscription </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubscription;
