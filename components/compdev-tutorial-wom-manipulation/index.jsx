/* Copyright (C) 2015-2019 MISTEMS Ltd. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

// from NodeJS
const path = require('path')
const util = require('util')

// installed from NPM
const three = require('three')

// from MaxWhere
const { wom } = require('maxwhere')
const { ipcMain } = require('electron')


// base position and orientation of the 3D objects
// used for reset
const basePos = { "x": 600, "y": 0, "z": 10 }
const baseOri = { "x": 0, "y": 0, "z": 0, "w": -1 }
const baseScale = 1

// handles for the two 3D objects
let bigTux = null
let littleTux = null
const { Node, Mesh } = require('maxwhere');

async function main() {
  // Create the sword object
  const sword = await Mesh.create({
    mesh: 'VSword.mesh',
    scale: { x: 1, y: 1, z: 1 },
  });

  // Add the sword to the scene
  Node.root().addChild(sword);

  // Listen for the spacebar key press to throw the sword
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      // Animate the sword to simulate throwing
      sword.animate({
        properties: {
          position: { x: 10, y: 10, z: 10 },
          orientation: { x: 0, y: 0, z: 90 },
        },
        duration: 1000,
        easing: 'linear',
      });
    }
  });
}

main().catch(console.error);











/**
 * reset the position, orientation and parent-child relationship of the two tuxes
 */
const reset = () => {
  if(bigTux !== null && littleTux !== null){
    bigTux.removeChild(littleTux) // wom
    littleTux.node.SetParent(wom.node) // core
    bigTux.setPosition(basePos, 'absolute', 'world')
    bigTux.setOrientation(baseOri)

    littleTux.setPosition(basePos, 'absolute', 'world')
    littleTux.setOrientation(baseOri)
    littleTux.setPosition({x:100, z:-10},'relative', 'world')

  }
}

/**
 * attach the little tux as the child of the big one 
 */
const appendTuxes = () => {
  if(bigTux !== null && littleTux !== null){
    console.log('appending little tux to big tux')
    bigTux.appendChild(littleTux) // wom
    littleTux.node.SetParent(bigTux.node) // core

    littleTux.setOrientation(baseOri)
    littleTux.setPosition({x: 50, y: 0, z:-10}, 'absolute', 'parent')
    wom.render(littleTux)
  }
}

const detachTuxes = () => {
  if(bigTux !== null && littleTux !== null){
    console.log('detaching little tux from big tux')
    bigTux.removeChild(littleTux) // wom
    littleTux.node.SetParent(wom.node) // core
  }
}

const moveTux = (tux, pos, ref) => {
  tux.setPosition({x: pos, y: 0, z: 0}, ref, 'parent')
}


const rotateAA = (tux, angle) => {
  tux.setOrientation({angle: angle, axis: {x: 0, y: 0, z: 1}}, 'absolute', 'parent');
}

const rotateAARel = (tux, angle) => {
  tux.setOrientation({angle: angle, axis: {x: 0, y: 0, z: 1}}, 'relative', 'parent');
}

/**
 * Makes the tux face the camera (easy and naiive implementation)
 * @param {node} tux 
 */
const faceCamera = (tux) => {
  // get orientation of the camera
  let cameraOri = wom.camera.getOrientation()
  console.log(cameraOri)
  bigTux.setOrientation(cameraOri)
}

/**
 * Makes the tux face the camera (a better, more realistic implemetation)
 * @param {node} tux 
 */
const faceCamera2 = (tux) => {
  // get the camera position and make a threejs vector from it
  let camPos = wom.camera.getPosition()
  let camPosVec = new three.Vector3(camPos.x,camPos.y,camPos.z)
  
  // get the tux position and make a threejs vector from it
  let tuxPos = tux.getPosition()
  let tuxPosVec = new three.Vector3(tuxPos.x,tuxPos.y,tuxPos.z)

  // create a vector that points from the tux toward the position of the camera
  let tuxToCam = new three.Vector3()
  tuxToCam.subVectors(camPosVec, tuxPosVec)
  // normalize the new vector (we only need a unit vector that points towards the camera)
  tuxToCam.normalize()

  // create a quaternion
  let quaternion = new three.Quaternion()
  // set the rotation from the initial absolute orientation of the big tux towards the camera 
  quaternion.setFromUnitVectors(new three.Vector3(0,0,1), tuxToCam)

  // rotate the big Tux towards the camera position
  bigTux.setOrientation({w: quaternion.w, x: quaternion.x, y: quaternion.y, z: quaternion.z})
}


const init = (props) => {
}

const done = () => {
}

const render = (props, children) => {
  // create the two tuxes
  bigTux = wom.create('mesh', {
    id: 'baseTux',        // this can be used to select this object with wom.select()
    url: 'penguin.mesh',  // the name of the mesh in the resources folder
    position: basePos,    // initial position
    orientation: baseOri, // initial orientation
    scale: baseScale,     // intitial scale
    autophysical: true    // add a physical collision shape for this object (bounding box)
  })

  littleTux = wom.create('mesh', {
    id: 'tux1',
    url: 'penguin.mesh',
    position: basePos,
    orientation: baseOri,
    scale: baseScale/2,
    autophysical: true
  })

  // render the two tuxes (insert and display them in the 3D world)
  wom.render(bigTux)
  wom.render(littleTux)
  // move the little tux away from the big one
  littleTux.setPosition({x:100, z: -10},'relative', 'world')



  // create the control panel billboard
  let controlPanel = wom.create('billboard', {
    id: 'component-tutorial-wom-manipulation-billboard',
    url: path.resolve(__dirname, 'index.html'),
    nodeIntegration: true, // need this for IPC communication
    width: 586,     // width of the billboard (in OGRE units)
    height: 330,    // height of the billboard (in OGRE units)
    scaleFactor: 1, // do not allow automatic DPI scaling for this billboard
    'resolution-width': 1420, // resolution of the billboard in pixels
    'resolution-height': 800, // resolution of the billboard in pixels
    position: { "x": 600, "y": 200, "z": -20 },
    orientation: { "x": 0, "y": 0, "z": 0, "w": -1 },
    physical: {raycast: true} // accept mouse events to make it orbitable
  })
  wom.render(controlPanel)

  // using ipc listeners
  // IMPORTANT: callback registrations are not idempotent!
  // if you run a space N times and register the same callback N times
  // the callback will be executed N times. So, first we remove all listeners
  // for the given channel:
  ipcMain.removeAllListeners('compdev-tutorial-wom-manipulation')
  ipcMain.on('compdev-tutorial-wom-manipulation', (event, obj) => {
    // obj.cmd is the command (see index.html)
    switch(obj.cmd){
      case 'reset':
        reset()
      break
      case 'appendTuxes':
        appendTuxes()
      break
      case 'detachTuxes':
        detachTuxes()
      break
      case 'rotateAA':
      {
        let tux = null
        obj.tux === 'big' ? tux = bigTux : tux = littleTux
        let ref = null
        obj.ref === 'absolute' ? rotateAA(tux, obj.angle) : rotateAARel(tux, obj.angle)
      }
      break
      case 'moveTux':
      {
        let tux = null
        obj.tux === 'big' ? tux = bigTux : tux = littleTux
        moveTux(tux, obj.pos, obj.ref)
      }
      break
      case 'faceCam':
        faceCamera(bigTux)
      break
      case 'faceCam2':
        faceCamera2(bigTux)
      break
    }
  })
  return <node />
}

// these exported function will be called by MaxWhere
module.exports = {
  init,
  done,
  render
}
