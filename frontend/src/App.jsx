import React, { useState } from "react";
import Bar from "./components/Bar";
import PlayerPic from "./components/PlayerPic";
import Nav from "./components/Nav";
import { Snippet } from "@nextui-org/react";


export default function App() {

  const [show, setShow] = useState(false)

  const [player, setPlayer] = useState("")

  const [picture, setPicture] = useState("")

  const [load, setLoad] = useState(false)


  return (
    <div className="page">
      <h1>Welcome To FootyFinder</h1>
      <Snippet hideSymbol hideCopyButton variant="solid">Make sure to input the players first name then the last, everything has to be spelled corectly :)</Snippet>
      <Snippet hideSymbol hideCopyButton variant="solid">Beware the first search may take up to 60s if the server is facing inactivity as it spins down due to low usage. After the first search is complete it will be much faster!</Snippet>
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
