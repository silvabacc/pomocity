import * as THREE from "three";

//THREE.BoxGeometry(1, height, 1), where the 1 is height of the object (building/grass)
const geometry = new THREE.BoxGeometry(1, 1, 1);

//Dictionary that maps asset ID to a function
//Function will create a new instance of the asset
//Factory pattern - we give it an ID and it makes it for us
const assets = {
  grass: (x, y) => {
    //The 0.5 actually places the object in a position. 0.5 means on top of plane
    // -0.5 is the plane itself

    // Grass geomtry
    const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = {
      id: "grass",
    };
    mesh.position.set(x, -0.5, y);
    return mesh;
  },
  "building-1": (x, y) => {
    //THREE.BoxGeometry(1, height, 1), where the 1 is height of the building
    const buildingMaterial = new THREE.MeshLambertMaterial({
      color: 0x77777777,
    });
    const buildingMesh = new THREE.Mesh(geometry, buildingMaterial);
    buildingMesh.userData = {
      id: "building-1",
    };
    buildingMesh.position.set(x, 0.5 / 2, y);
    return buildingMesh;
  },
  "building-2": (x, y) => {
    const buildingMaterial = new THREE.MeshLambertMaterial({
      color: 0x77777777,
    });
    const buildingMesh = new THREE.Mesh(geometry, buildingMaterial);
    buildingMesh.userData = {
      id: "building-2",
    };
    //We scale it to increase the height of the building
    buildingMesh.scale.set(1, 2, 1);
    buildingMesh.position.set(x, 1 / 2, y);
    return buildingMesh;
  },
  "building-3": (x, y) => {
    const buildingMaterial = new THREE.MeshLambertMaterial({
      color: 0x77777777,
    });
    const buildingMesh = new THREE.Mesh(geometry, buildingMaterial);
    buildingMesh.userData = {
      id: "building-3",
    };
    buildingMesh.scale.set(1, 3, 1);
    buildingMesh.position.set(x, 1.5 / 2, y);
    return buildingMesh;
  },
};

export function createAssetInstnace(assetId, x, y) {
  if (assetId in assets) {
    return assets[assetId](x, y);
  } else {
    console.log(`Asset ID ${assetId} is not found`);
    return undefined;
  }
}
