export function createCity(size) {
  const data = [];

  initialize();

  //Why do you need to initialize function?
  //Maybe remove in the future
  function initialize() {
    for (let x = 0; x < size; x++) {
      const column = [];
      for (let y = 0; y < size; y++) {
        const tile = createTile(x, y);
        column.push(tile);
      }
      data.push(column);
    }
  }

  function update() {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        data[x][y].update();
      }
    }
  }

  return {
    size,
    data,
    update,
  };
}

function createTile(x, y) {
  return {
    x,
    y,
    terrainId: "grass", //future change this
    buildingId: undefined,
    update() {
      const x = Math.random();
      if (x < 0.01) {
        if (this.buildingId === undefined) {
          this.buildingId = "building-1";
        } else if (this.buildingId === "building-1") {
          this.buildingId = "building-2";
        } else if (this.buildingId === "building-2") {
          console.log("here!!");
          this.buildingId = "building-3";
        }
      }
    },
  };
}
