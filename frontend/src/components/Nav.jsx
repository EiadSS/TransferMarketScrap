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
    async function fetchAdditionalData() {
      if (profile) {
        setPicture(profile.picture);
        const id = '/' + profile.id;
        try {
          await helper('stats', player, id);
          await helper('injuries', player, id);
          await helper('value', player, id);
          await helper('transfers', player, id);
        } catch (error) {
          console.error('Error fetching additional data:', error);
        }
      }
    }
  
    fetchAdditionalData();
  }, [profile]);
  

  async function helper(request, player, id) {
    try {
      const response = await fetch('http://127.0.0.1:8000/app/' + request + '/' + player + id);
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
    setInjuries(null)
    setValue(null)
    setTransfers(null)
    await helper('profile', player, '')
    setLoad(false)
  }

  function handShow(section) {
    const components = {
      Profile,
      Stats,
      Injuries,
      Value,
      Transfers
    };

    const Component = components[section];

    if (Component) {
      if (section === "Profile") {
        return <Component setPicture={setPicture} player={player} setLoad={setLoad} profile={profile} />;
      } else if (section === "Stats") {
        return <Component player={player} setLoad={setLoad} profile={stats} />;
      } else if (section === "Injuries") {
        return <Component player={player} setLoad={setLoad} profile={injuries} />;
      } else if (section === "Value") {
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
