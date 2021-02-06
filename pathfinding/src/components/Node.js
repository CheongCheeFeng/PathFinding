import React from "react";
import "../style/Node.css";
import status from "../enums/NodeStatusEnum";
function Node({ node, mouseEvents }) {
  const { x, y, isStart, isTarget, isWall, status } = node;
  const { onMouseDown, onMouseUp, onMouseEnter, onMouseLeave } = mouseEvents;
  const className = status;
  // console.log(node);
  return (
    <div
      id={`node-${x}-${y}`}
      className={`node ${className}`}
      onMouseDown={() => {
        onMouseDown(y, x);

        // node.isStart = !node.isStart;
        // console.log(node);
      }}
      onMouseUp={() => onMouseUp()}
      onMouseEnter={() => {
        onMouseEnter(y, x);
        // console.log(node);
      }}
      onMouseLeave={() => onMouseLeave(y, x)}
    ></div>
  );
}

export default Node;
