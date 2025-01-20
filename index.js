import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Drum pad data
const drumPads = [
  { key: "Q", sound: "Heater 1", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", sound: "Heater 2", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", sound: "Heater 3", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", sound: "Heater 4", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", sound: "Clap", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", sound: "Open-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", sound: "Kick-n'-Hat", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", sound: "Kick", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", sound: "Closed-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
];

const App = () => {
  const [display, setDisplay] = useState("");

  // Play sound and update display
  const playSound = (key, sound) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0; // Reset audio to the beginning
    audio.play();
    setDisplay(sound);
  };

  // Handle key press
  useEffect(() => {
    const handleKeyPress = (event) => {
      const pad = drumPads.find((pad) => pad.key === event.key.toUpperCase());
      if (pad) playSound(pad.key, pad.sound);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{display || "Play a sound"}</div>
      <div className="pads">
        {drumPads.map((pad) => (
          <div
            key={pad.key}
            id={pad.sound}
            className="drum-pad"
            onClick={() => playSound(pad.key, pad.sound)}
          >
            {pad.key}
            <audio id={pad.key} className="clip" src={pad.src}></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
