import * as THREE from "three";

export function createCamera(gameWindow) {
  const camera = new THREE.PerspectiveCamera(
    75,
    gameWindow.offsetWidth / gameWindow.offsetHeight,
    0.1,
    1000
  );

  const Y_AXIS = new THREE.Vector3(0, 1, 0);
  const DEG2RAD = Math.PI / 180;

  const LEFT_MOUSE_BUTTON = 0;
  const MIDDLE_MOUSE_BUTTON = 1;
  const RIGHT_MOUSE_BUTTON = 2;

  const ROTATION_SENSTIVITY = 0.5;
  const SENSTIVITY_ZOOM = 0.02;
  const PAN_SENSTIVITY = -0.01;

  const MIN_CAMERA_RADIUS = 10;
  const MAX_CAMERA_RADIUS = 20;

  const MIN_CAMERA_ELEVATION = 30;
  const MAX_CAMERA_ELEVATION = 90;

  let cameraOrigin = new THREE.Vector3();
  let cameraRadius = 20;
  let cameraAzimuth = 135;
  let cameraElevation = 45;

  let isLeftMouseDown = false;
  let isRightMouseDown = false;
  let isMiddleMouseDown = false;

  let prevMouseX = 0;
  let prevMouseY = 0;

  updateCameraPosition();

  function onMouseUp(event) {
    console.log(event.button);
    switch (event.button) {
      case LEFT_MOUSE_BUTTON:
        isLeftMouseDown = false;
        break;
      case MIDDLE_MOUSE_BUTTON:
        isMiddleMouseDown = false;
        break;
      case RIGHT_MOUSE_BUTTON:
        isRightMouseDown = false;
        break;
    }
  }

  function onMouseMove(event) {
    const deltaX = event.clientX - prevMouseX;
    const deltaY = event.clientY - prevMouseY;

    if (isLeftMouseDown) {
      cameraAzimuth += -(deltaX * ROTATION_SENSTIVITY);
      cameraElevation += deltaY * ROTATION_SENSTIVITY;
      cameraElevation = Math.min(
        MAX_CAMERA_ELEVATION,
        Math.max(MIN_CAMERA_ELEVATION, cameraElevation)
      );
      updateCameraPosition();
    }

    if (isMiddleMouseDown) {
      const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
        Y_AXIS,
        cameraAzimuth * DEG2RAD
      );
      const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(
        Y_AXIS,
        cameraAzimuth * DEG2RAD
      );
      cameraOrigin.add(forward.multiplyScalar(PAN_SENSTIVITY * deltaY));
      cameraOrigin.add(left.multiplyScalar(PAN_SENSTIVITY * deltaX));
      updateCameraPosition();
    }

    if (isRightMouseDown) {
      cameraRadius += deltaY * SENSTIVITY_ZOOM;
      cameraRadius = Math.min(
        MAX_CAMERA_RADIUS,
        Math.max(MIN_CAMERA_RADIUS, cameraRadius)
      );
      console.log(cameraRadius);
      updateCameraPosition();
    }

    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
  }

  function onMouseDown(event) {
    switch (event.button) {
      case LEFT_MOUSE_BUTTON:
        isLeftMouseDown = true;
        break;
      case MIDDLE_MOUSE_BUTTON:
        isMiddleMouseDown = true;
        break;
      //Make zoom scroll
      case RIGHT_MOUSE_BUTTON:
        isRightMouseDown = true;
        break;
    }
  }

  function updateCameraPosition() {
    camera.position.x =
      cameraRadius *
      Math.sin(cameraAzimuth * DEG2RAD) *
      Math.cos(cameraElevation * DEG2RAD);
    camera.position.y = cameraRadius * Math.sin(cameraElevation * DEG2RAD);
    camera.position.z =
      cameraRadius *
      Math.cos(cameraAzimuth * DEG2RAD) *
      Math.cos(cameraElevation * DEG2RAD);

    camera.position.add(cameraOrigin);
    camera.lookAt(cameraOrigin);
    camera.updateMatrix();
  }

  return {
    camera,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
}
