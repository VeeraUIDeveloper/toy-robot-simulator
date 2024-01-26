import React from "react";

const Tabletop = ({ position }) => {
  const renderCells = () => {
    const cells = [];

    // Render tabletop (5 x 5 units)
    for (let row = 4; row >= 0; row--) {
      for (let col = 0; col < 5; col++) {
        const isRobotHere =
          position && position.x === col && position.y === row;

        cells.push(
          <div
            key={`${col}-${row}`}
            className={`cell ${isRobotHere ? "robot" : ""}`}
          >
            {/* Render robot */}
            {isRobotHere && (
              <div className={`arrow ${position.facing.toLowerCase()}`} />
            )}
          </div>
        );
      }
    }

    return cells;
  };

  return <div className="tabletop">{renderCells()}</div>;
};

export default Tabletop;
