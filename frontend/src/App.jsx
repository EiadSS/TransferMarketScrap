import React, { useState } from "react";
import Bar from "./components/Bar";
import PlayerPic from "./components/PlayerPic";
import Profile from "./Body/Profile";
import Stats from "./Body/Stats";
import Nav from "./components/Nav";
import Injuries from "./Body/Injuries";
import Value from "./Body/Value";

export default function App() {

  const [show, setShow] = useState(false)

  const [player, setPlayer] = useState("")

  const [picture, setPicture] = useState("")

  const [load, setLoad] = useState(false)


  return (
    <div className="page">
      <h1>Welvome To The TransferMarket</h1>
      <Bar setShow={setShow} setPlayer={setPlayer} load={load} setLoad={setLoad} />
      {show &&
        (
          <div className="three-guys">
            <PlayerPic picture={picture} load={load} />
            <Nav />
            {/* <Profile setPicture={setPicture} player={player} setLoad={setLoad}/> */}
            {/* <Stats player={player} setLoad={setLoad}/> */}
            {/* <Injuries player={player} setLoad={setLoad} /> */}
            {/* <Value player={player} setLoad={setLoad}/> */}
          </div>)
      }
    </div>
  );
}
