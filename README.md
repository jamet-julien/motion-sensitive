# motion-sensitive

[![CircleCI Status](https://circleci.com/gh/jamet-julien/motion-sensitive.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/jamet-julien/motion-sensitive)
![Codecov](https://img.shields.io/codecov/c/github/jamet-julien/motion-sensitive)
[![npm](https://img.shields.io/npm/dt/motion-sensitive.svg?style=flat-square)](https://www.npmjs.com/package/motion-sensitive)
[![npm](https://img.shields.io/npm/v/motion-sensitive.svg?style=flat-square)](https://www.npmjs.com/package/motion-sensitive)
[![npm](https://img.shields.io/npm/l/motion-sensitive.svg?style=flat-square)](https://github.com/jamet-julien/motion-sensitive/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

The plugin MotionSensitive create an instance which allows to follow the movements of an element and to deduce a possible direction.

-   [Install](#install)
-   [Importing](#importing)
-   [Quick start](#quick)
-   [Methods](#methods)
    -   [.isLookedAt(`obj`)](#isLookedAt)
    -   [.isLookedIn(`obj1`, `obj2`)](#isLookedIn)

## Install <a id="install"></a>

`npm i motion-sensitive`  
or  
`yarn add motion-sensitive`

---

### Importing <a id="importing"></a>

```js
import MotionSensitive from "motion-sensitive";
```

---

### Quick start<a id="quick"></a>

usage motion-sensitive plugin

```js
const motion = MotionSensitive();
const btn = document.querySelector("#btn1");

const { x, y, width, height } = btn.getBoundingClientRect();
const point1 = { x, y: y + height };
const point2 = { x: x + width, y: y };

document.body.addEventListener("mousemove", (e) => {
    const mouseX = e.pageX - document.body.offsetLeft;
    const mouseY = e.pageY - document.body.offsetTop;
    motion.trackPoint({
        x: mouseX,
        y: mouseY
    });
});

function spy() {
    if (motion.isLookedIn(point1, point2)) {
        btn.classList.add("wakeup");
    } else {
        btn.classList.remove("wakeup");
    }
    requestAnimationFrame(spy);
}

spy();
```

#### click to see [DEMO](https://codepen.io/jamet-julien/pen/gOPxoqY)

---

## Methods <a id="methods"></a>

### .isLookedAt(obj) <a id="isLookedAt"></a>

| argument | type     | Description                |
| :------- | :------- | :------------------------- |
| `obj`    | `Object` | target coordinates `{x,y}` |

| return    | Description                                                                                    |
| :-------- | :--------------------------------------------------------------------------------------------- |
| `boolean` | `true` when the tracked positions indicate that they are going towards the target else `false` |

```js
motion.isLookedAt({ x: 1, y: 2 }); // true or false
```

### .isLookedIn(obj1, obj2) <a id="isLookedIn"></a>

| argument | type     | Description                |
| :------- | :------- | :------------------------- |
| `obj1`   | `Object` | target coordinates `{x,y}` |
| `obj2`   | `Object` | target coordinates `{x,y}` |

| return    | Description                                                                                              |
| :-------- | :------------------------------------------------------------------------------------------------------- |
| `boolean` | `true` when the tracked positions indicate that they are going towards between this targets else `false` |

```js
motion.isLookedIn({ x: 1, y: 2 }, { x: 1, y: 1 }); // true or false
```
