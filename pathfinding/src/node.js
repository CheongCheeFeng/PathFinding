import Status from "./enums/NodeStatusEnum";

function node(x, y, nodeStatus) {
  this.x = x;
  this.y = y;
  this.isStart = nodeStatus === Status.start;
  this.isTarget = nodeStatus === Status.target;
  this.isWall = nodeStatus === Status.wall;
  this.isObject = this.isStart || this.isTarget;
  this.status = nodeStatus;
  this.setWall = (newIsWall) => {
    // console.log(this.isWall);
    // console.log(newIsWall);

    this.isWall = newIsWall;
    this.updateStatus();
  };

  this.changeStatus = (previousNode) => {
    let previousIsStart = previousNode.isStart;
    let previousIsTarget = previousNode.isTarget;

    previousNode.isStart = this.isStart;
    previousNode.isTarget = this.isTarget;

    previousNode.updateStatus();
    this.isStart = previousIsStart;
    this.isTarget = previousIsTarget;

    this.updateStatus();
  };
  this.updateStatus = () => {
    this.status = this.isStart
      ? Status.start
      : this.isTarget
      ? Status.target
      : this.isWall
      ? Status.wall
      : "";
    this.isObject = this.isStart || this.isTarget;
  };
}

export default node;
