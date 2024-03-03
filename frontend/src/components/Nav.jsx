import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import Profile from "../Body/Profile";
import Stats from "../Body/Stats";
import Transfers from "../Body/Transfers";
import Injuries from "../Body/Injuries";
import Value from "../Body/Value";
import { useState, useEffect } from "react";

export default function Nav({ player, setLoad, setPicture }) {

  const [profile, setProfile] = useState(null); // Initialize profile state properly
  const [stats, setStats] = useState(null)
  const [injuries, setInjuries] = useState(null); // Initialize profile state properly
  const [value, setValue] = useState(null)
  const [transfers, setTransfers] = useState(null)

  useEffect(() => {
    fetchData();
  }, [player]);

  useEffect(() => {
    if (profile) {
      setPicture(profile.picture);
    }
  }, [profile, setPicture]);

  async function helper(request, player) {
    try {
      const response = await fetch('http://127.0.0.1:8000/app/' + request + '/' + player);
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const result = await response.json();
      switch (request) {
        case "profile":
          setProfile(result)
          break;
        case "stats":
          setStats(result)
          break;
        case "injuries":
          setInjuries(result)
          break;
        case "value":
          setValue(result)
        case "transfers":
          setTransfers(result)
      }
      setLoad(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchData() {
    setProfile(null)
    setStats(null)
    helper("profile", player)
    helper("stats", player)
    helper("injuries", player)
    helper("value", player)
    helper("transfers", player)
  }


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
        return <Component setPicture={setPicture} player={player} setLoad={setLoad} profile={profile} />;
      } else if (id === "Stats") {
        return <Component player={player} setLoad={setLoad} profile={stats} />;
      } else if (id === "Injuries") {
        return <Component player={player} setLoad={setLoad} profile={injuries} />;
      } else if (id === "Value") {
        return <Component player={player} setLoad={setLoad} profile={value} />;
      } else {
        return <Component player={player} setLoad={setLoad} profile={transfers} />;
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
    <div className="info">
      <div className="flex w-full flex-col" title="tabs">
        <Tabs className="tabs" aria-label="Dynamic tabs" items={tabs} size="lg" color="primary">
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
