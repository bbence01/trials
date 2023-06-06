const { wom } = require('maxwhere')

const init = (props) => {
}

const done = () => {
}

const render = (props, children) => {
  let wv = wom.create('webview', { // render Webview
    width: 800,
    height: 600,
    'resolution-width': 1280,
    'resolution-height': 720,
    position: {x: 20, y: 20, z: -100},
    orientation: {x: 0, y: 0, z: 0, w: 1},
    physical: {raycast: true}, // accept mouse events to make it orbitable
    url: 'https://www.youtube.com/watch?v=O4ZDvRa9Dk4', // URL to load
    inputDisabled: false // accept input events when hovered
  })
  wom.render(wv)

  return <node />
}

module.exports = {
  init,
  done,
  render
}
