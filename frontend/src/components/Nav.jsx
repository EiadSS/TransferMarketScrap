import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import Profile from "../Body/Profile";
import Stats from "../Body/Stats";
import Transfers from "../Body/Transfers";
import Injuries from "../Body/Injuries";
import Value from "../Body/Value";

export default function Nav({ player, setLoad, setPicture }) {

  function handShow(id) {
    const components = {
      Profile,
      Stats,
      Injuries,
      Value,
      Transfers
    };

    const Component = components[id];

    if (Component) {
      if (id === "Profile") {
        return <Component setPicture={setPicture} player={player} setLoad={setLoad} />;
      } else {
        return <Component player={player} setLoad={setLoad} />;
      }
    }
    return null;
  }

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
              {handShow(item.id)}
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
}


{/* <Profile setPicture={setPicture} player={player} setLoad={setLoad}/> */ }
{/* <Stats player={player} setLoad={setLoad}/> */ }
{/* <Injuries player={player} setLoad={setLoad} /> */ }
{/* <Value player={player} setLoad={setLoad}/> */ }
{/* <Transfers player={player} setLoad={setLoad}/> */ }