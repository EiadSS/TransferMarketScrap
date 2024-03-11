import React from "react";
import { Tabs, Tab, Snippet } from "@nextui-org/react";
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
  const [error, setError] = useState(false)


  useEffect(() => {
    fetchData();
  }, [player]);

  useEffect(() => {
    async function fetchAdditionalData() {
      if (profile) {
        setPicture(profile.picture);
        let id = '/' + profile.id;
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
      const response = await fetch('https://transfermarketscrap.onrender.com/app/' + request + '/' + player + id);
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
          break;
        case "transfers":
          setTransfers(result)
          break;
      }
      setLoad(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(true)
    }
  }

  async function fetchData() {
    setError(false)
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
      } else if (section == 'Transfers') {
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
      {!error && <div className="flex w-full flex-col" title="tabs">
        <Tabs className="tabs" aria-label="Dynamic tabs" items={tabs} size="lg" color="primary">
          {(item) => (
            <Tab key={item.id} title={item.label}>
              {handShow(item.id)}
            </Tab>
          )}
        </Tabs>
      </div>}
      {error && <Snippet hideSymbol hideCopyButton variant="solid">Sorry the player was not found :( Make sure to input the players first name then the last, everything has to be spelled corectly</Snippet>}
    </div>
  );
}
