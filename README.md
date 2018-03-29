# keyListener

### a program which can be used for listening for/reacting to keystrokes..
keyListener is little node program that simply listens for user definable keybindings,
and executes associated callbacks. It is essentially a wrapper around
[This npm module called **keypress**](https://www.npmjs.com/package/keypress),
with a few default keybindings...
## Installation
### npm:
```
$ npm i keyListener --save-dev
```
## Usage:
Firstly, you must get your `keys` function from the `keyListener` package, like so:
```js
const keys = require('keyListener')
```
Then you may use it like such:

```js
keys((ch, key)=> {
// if you pressed `ctrl-p`
  if (key.ctrl && key.name === 'p') {
// Do amazing things!!!
  }
})
```
**-NOTE** The listener does not listen system-wide. At this time, it only works within the context of the terminal. It can't, for example, 'hear' a keypress in the terminal made while working in a text-editor.

The `keys()` function takes a callback as it's only argument, and it
takes 2 arguments -- `ch` (for character) and `key`. `ch` will give you access
to a character value, i.e. 'a' or 'z' and `key` will give you an object that
resembles thusly:
```js
{
  name: 'x',
  ctrl: true,
  meta: false,
  shift: false,
  sequence: '\u0018'
}
```
By default, `ctrl-x` and `ctrl-c` will exit the process, which you will need to use,
because the task you use `keys()` in will not finish on it's own. `ctrl-w` will
pause the listener, so that you may exit or unpause the the process, but your
callback will not be called, even if you hit your designated keybindings.

Admittedly this package is a bit on the hacky side, but it fulfills a unique
purpose for me, and maybe it will for you as well. Happy Coding!!
