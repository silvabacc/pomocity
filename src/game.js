import { createScene } from "./scene.js";
import { createCity } from "./city.js";

export function createGame() {
  const scene = createScene();
  const city = createCity(16);

  scene.initialize(city);

  window.scene = scene;
  document.addEventListener("mousedown", window.scene.onMouseDown, false);
  document.addEventListener("mouseup", window.scene.onMouseUp, false);
  document.addEventListener("mousemove", window.scene.onMouseMove, false);

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
