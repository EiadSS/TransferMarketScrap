import React from "react";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";

export default function Nav() {
  let tabs = [
    {
      id: "Profile",
      label: "Profile",
    },
    {
        id: "Stats",
        label: "Stats",
      },
      {
        id: "Injuries",
        label: "Injuries",
      },
      {
        id: "Value",
        label: "Value",
      },
      {
        id: "Transfers",
        label: "Transfers",
      },
    
  ];

  return (
    <div>
    <div className="flex w-full flex-col" title="tabs">
      <Tabs aria-label="Dynamic tabs" items={tabs} size="lg" color="primary">
        {(item) => (
          <Tab key={item.id} title={item.label}> 
          </Tab>
        )}
      </Tabs>
    </div>
    </div>  
  );
}


