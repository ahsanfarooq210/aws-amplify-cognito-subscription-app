import { useAppContext } from "@/context/AppContext";
import React from "react";
import AddSubscription from "./AddSubscription";
import SubscriptionTable from "./SubscriptionTable";

const data = [
  {
    title: 'Product 1',
    description: 'Description for Product 1',
    price: '$10',
    action: 'Action 1'
  },
  {
    title: 'Product 2',
    description: 'Description for Product 2',
    price: '$20',
    action: 'Action 2'
  },
  // Add more data as needed
];

const SubscriptionComponent = () => {
  const { user } = useAppContext();

  return <div className="w-full max-w-screen-xl mx-auto h-max py-5 flex flex-col gap-4">
    <AddSubscription/>
    <SubscriptionTable data={data} />
  </div>;
};

export default SubscriptionComponent;
