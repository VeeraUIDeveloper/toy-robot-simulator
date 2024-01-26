import React, { useState } from "react";
// components
import Tabletop from "./Tabletop";

// stylesheets
import "./style.css";

const ToyRobotSimulator = () => {
  const [robotPosition, setRobotPosition] = useState(null);
  const [inputCommand, setInputCommand] = useState("");
  const [output, setOutput] = useState("");

  const handleCommandChange = (e) => {
    setInputCommand(e.target.value);
  };

  const handlePlace = () => {
    const [x, y, facing] = inputCommand.replace("PLACE ", "").split(",");
    if (
      isValidPosition(x, y) &&
      ["NORTH", "SOUTH", "EAST", "WEST"].includes(facing)
    ) {
      setRobotPosition({ x: parseInt(x), y: parseInt(y), facing });
      setOutput("");
    } else {
      setOutput(
        "Invalid PLACE command. Please check the coordinates and facing direction."
      );
    }
  };

  const handleMove = () => {
    if (!robotPosition) return;

    const { x, y, facing } = robotPosition;
    let newX = x;
    let newY = y;

    switch (facing) {
      case "NORTH":
        newY = Math.min(y + 1, 4);
        break;
      case "SOUTH":
        newY = Math.max(y - 1, 0);
        break;
      case "EAST":
        newX = Math.min(x + 1, 4);
        break;
      case "WEST":
        newX = Math.max(x - 1, 0);
        break;
      default:
        break;
    }

    setRobotPosition({ x: newX, y: newY, facing });
  };

  const handleLeftRight = (direction) => {
    if (!robotPosition) return;

    if (robotPosition.facing) {
      const directions = ["NORTH", "WEST", "SOUTH", "EAST"];
      const currentFacingIndex = directions.indexOf(robotPosition.facing);
      let newFacingIndex;
      if (direction === "RIGHT") {
        newFacingIndex = (currentFacingIndex + 3) % 4;
      } else {
        newFacingIndex = (currentFacingIndex + 1) % 4;
      }
      setRobotPosition({
        ...robotPosition,
        facing: directions[newFacingIndex],
      });
    }
  };

  const handleReport = () => {
    if (robotPosition) {
      const { x, y, facing } = robotPosition;
      setOutput(`Robot is at position (${x}, ${y}) facing ${facing}`);
    } else {
      setOutput("Robot is not on the table.");
    }
  };

  const isValidPosition = (x, y) => {
    return 0 <= x && x <= 4 && 0 <= y && y <= 4;
  };

  return (
    <>
      <h1>Toy Robot Simulator</h1>

      {/* Render the tabletop component */}
      <Tabletop position={robotPosition} />

      <br />

      {/* UI Controls */}
      <label>
        Enter Command: <br />
        <input
          type="text"
          value={inputCommand}
          onChange={handleCommandChange}
        />
      </label>
      <button onClick={handlePlace}>Place</button>
      <button onClick={handleMove}>Move</button>
      <button onClick={() => handleLeftRight("LEFT")}>Left</button>
      <button onClick={() => handleLeftRight("RIGHT")}>Right</button>
      <button onClick={handleReport}>Report</button>

      {/* Display the report */}
      <div>
        <h3>Output:</h3>
        <p>{output}</p>
      </div>
    </>
  );
};

export default ToyRobotSimulator;
