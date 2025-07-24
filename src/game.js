import { createScene } from "./scene.js";
import { createCity } from "./city.js";

export function createGame() {
  const scene = createScene();
  const city = createCity(16);

  scene.initialize(city);
  scene.onObjectSelected = (selectedObject) => {
    console.log(selectedObject);

    let { x, y } = selectedObject.userData;
    const tile = city.data[x][y];
    console.log(tile);
  };

  window.scene = scene;
  document.addEventListener("mousedown", scene.onMouseDown.bind(scene), false);
  document.addEventListener("mouseup", scene.onMouseUp.bind(scene), false);
  document.addEventListener("mousemove", scene.onMouseMove.bind(scene), false);

  const game = {
    update() {
      city.update();
      scene.update(city);
    },
  };

  //Right now its just random updates. What we want is that when a pomodoro finishes
  //we want there to be a chance for the city to develop, so I won't use intervals
  setInterval(() => {
    game.update();
  }, 1000);

  scene.start();

  return game;
}
