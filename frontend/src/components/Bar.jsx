import React from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useState } from "react";


export default function Bar({ setShow, setPlayer, load, setLoad }) {

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    // 👇 Get input value from "event"
    setMessage(event.target.value);
  }

  const click = () => {
    setLoad(true)
    setShow(true)
    setPlayer(message)
  }

  return (
    <div className="bar">
      <Input type="search" placeholder="Marcus Rashford" className="search-bar" onChange={handleChange} />
      {!load &&
        (<Button className="Search-Button" onClick={click} color="primary" variant="ghost">
          Search
        </Button>)
      }
      {load&&(<Button className="load-button" onClick={click} color="primary" variant="ghost" isLoading>
        Search
      </Button>)}
    </div>
  );
}
