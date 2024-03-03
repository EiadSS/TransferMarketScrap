import React, { useState } from "react";
import Bar from "./components/Bar";
import PlayerPic from "./components/PlayerPic";
import Nav from "./components/Nav";


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
            <Nav player={player} setLoad={setLoad} setPicture={setPicture} />

          </div>)
      }
    </div>
  );
}
