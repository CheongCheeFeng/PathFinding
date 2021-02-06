import React from "react";
import { useEffect, useState } from "react";
import node from "../node";
import Node from "./Node";
import "../style/PathFinding.css";
import Status from "../enums/NodeStatusEnum";

let rows = 10;
let cols = 20;
let startNode = {
  x: Math.floor((cols - 1) / 4),
  y: Math.floor((rows - 1) / 2),
};
let targertNode = { x: Math.floor(cols - 1), y: Math.floor(rows - 1) };

function PathFinding() {
  const [Grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [previousNode, setPreviousNode] = useState();
  // const [mouseIsEntered, setMouseIsEntered] = useState(false);

  useEffect(() => {
    initializeGrid();
  }, []);

  useEffect(() => {
    // console.log("newGrid");
  }, [Grid]);

  const handleMouseDown = (row, col) => {
    setMouseIsPressed(true);

    let newGrid = Grid;
    if (Grid[row][col].isObject) {
      // setStartSelected(true);
      setPreviousNode(Grid[row][col]);
      console.log("object is selected");
    } else if (!Grid[row][col].isObject) {
      newGrid = getNewGridWithWallToggled(Grid, row, col);
    }

    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setPreviousNode();
  };
  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;

    let newGrid = Grid;
    if (previousNode && !Grid[row][col].isObject) {
      newGrid = changeObjectNodeStatus(Grid, previousNode, Grid[row][col]);
      setPreviousNode(newGrid[row][col]);
    } else if (!Grid[row][col].isObject) {
      newGrid = getNewGridWithWallToggled(Grid, row, col);
    }

    setGrid(newGrid);
  };
  const handleMouseLeave = (row, col) => {};

  const initializeGrid = () => {
    const grid = [];
    for (let j = 0; j < rows; j++) {
      let r = [];
      for (let i = 0; i < cols; i++) {
        r.push(new node(i, j, nodeStatus(i, j)));
      }
      grid.push(r);
    }

    setGrid(grid);
  };

  const gridWithNode = (
    <div className="grid">
      {Grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row-wrapper">
            {row.map((col, colIndex) => {
              return (
                <Node
                  key={colIndex}
                  node={col}
                  mouseEvents={{
                    onMouseDown: handleMouseDown,
                    onMouseUp: handleMouseUp,
                    onMouseEnter: handleMouseEnter,
                    onMouseLeave: handleMouseLeave,
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="Wrapper">
      <h1>Path Finding</h1>
      {gridWithNode}
    </div>
  );
}

const nodeStatus = (i, j) => {
  return startNode.x === i && startNode.y === j
    ? Status.start
    : targertNode.x === i && targertNode.y === j
    ? Status.target
    : "";
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  node.setWall(!node.isWall);

  // newGrid[row][col] = node;
  return newGrid;
};

const changeObjectNodeStatus = (grid, previousNode, currentNode) => {
  const newGrid = grid.slice();
  currentNode.changeStatus(previousNode);
  return newGrid;
};

export default PathFinding;
