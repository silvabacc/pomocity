import * as THREE from "three";
import { createCamera } from "./camera.js";
import { createAssetInstnace } from "./assets.js";

export function createScene() {
  const gameWindow = document.getElementById("render-target");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7777777);

  const camera = createCamera(gameWindow);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  gameWindow.append(renderer.domElement);

  //Mesh - it is data about the structure of a model, how the object should actually be rendered
  let terrain = [];
  let buildings = [];

  function initialize(city) {
    scene.clear();
    terrain = [];
    buildings = [];

    for (let x = 0; x < city.size; x++) {
      const column = [];
      for (let y = 0; y < city.size; y++) {
        const terrainId = city.data[x][y].terrainId;
        const mesh = createAssetInstnace(terrainId, x, y);
        scene.add(mesh);
        column.push(mesh);
      }
      terrain.push(column);
      buildings.push([...Array(city.size)]);
    }

    setupLights();
  }

  function update(city) {
    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        const currentBuildingId = buildings[x][y]?.userData.id;
        const newBuildingId = city.data[x][y].buildingId;

        // If player removes a building, remove from scene
        if (!newBuildingId && currentBuildingId) {
          scene.remove(building[x][y]);
          buildings[x][y] = undefined;
        }

        // If data model has changed, update the mesh
        if (newBuildingId !== currentBuildingId) {
          scene.remove(buildings[x][y]);
          buildings[x][y] = createAssetInstnace(newBuildingId, x, y);
          scene.add(buildings[x][y]);
        }
      }
    }
  }

  function setupLights() {
    const lights = [
      new THREE.AmbientLight(0xffffffff, 0.2),
      new THREE.DirectionalLight(0xffffffff, 0.3),
      new THREE.DirectionalLight(0xffffffff, 0.3),
      new THREE.DirectionalLight(0xffffffff, 0.3),
    ];

    lights[1].position.set(0, 1, 0);
    lights[2].position.set(1, 1, 0);
    lights[3].position.set(0, 1, 1);

    scene.add(...lights);
  }

  function draw() {
    renderer.render(scene, camera.camera);
  }

  function start() {
    renderer.setAnimationLoop(draw);
  }

  function stop() {
    renderer.setAnimationLoop(null);
  }

  function onMouseUp(event) {
    camera.onMouseUp(event);
  }

  function onMouseMove(event) {
    camera.onMouseMove(event);
  }

  function onMouseDown(event) {
    camera.onMouseDown(event);
  }

  return {
    initialize,
    update,
    start,
    stop,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
}
