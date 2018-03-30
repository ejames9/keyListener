/*
keyListener.js
'index.js'

A little node program that simply listens for user definable keybindings,
and executes associated callbacks. It is essentially a wrapper around the
`keypress` node module, with a few default keybindings...

Eric James Foster, MIT License...
*/


var keypress = require('keypress'),
         log = require('elementsJS').log
/*
Setting a global here, the listening pause functionality does
not work the way i'd like it to, so i'm improvising a bit.
If the paused global is true, the keypress listener
will ignore all keybinding key combinations *except*, ctrl-x (exit process),
ctrl-c (exit process) and ctrl-w (toggle stream paused).
Process.stdin.pause() will not be used, because once the stream is paused,
there is no way to turn it back on or kill the process....
*/ global.paused = false

const keyListener =()=> {
// Start listening to keypress events...
  keypress(process.stdin)

// Define listen function...
  const keys =(cb)=> {
    process.stdin.on('keypress', (ch, key)=> {
// If user strikes `ctrl-x` keybinding, exit the process...
      if (key.sequence === '\u0018') {
        process.exit();
      }
// If `ctrl-c` exit process...
      if (key.sequence === '\u0003') {
        process.exit();
      }
// If `ctrl-w` (for "wait"), pause the stream...
      if (key.sequence === '\u0017') {
        global.paused = !global.paused
      }

// If the stream is not paused, run the callback...
      if (!paused) {
// Run...
        cb(ch, key)
      }
    })
/*
Without setting rawMode, the stream would only be captured
upon striking the enter key. This way, we capture every
key strike...
*/  process.stdin.setRawMode(true);

// Narrative user update...
    log('Listening for custom keybindings... Use "ctrl-x" or "ctrl-c" to quit, or "ctrl-w" to pause.\n', ['green', 'bold'])
  }

  return keys
}

module.exports = keyListener()
