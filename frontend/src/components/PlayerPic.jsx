import React from "react";
import { Image } from "@nextui-org/react";

export default function PlayerPic({ picture, load }) {
  return (

    <div>

      {load && (<Image
        alt="NextUI hero Image with delay"
        className="player-pic"
        isLoading
      />)}

      {!load && (<Image
        alt="NextUI hero Image with delay"
        src={picture}
        className="player-pic"
        isZoomed
      />)}
    </div>
  );
}
