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
motion = MotionSensitive();

addEventlistener("mousemove", (e) => {
    const mouseX = e.pageX - e.target.offsetLeft;
    const mouseY = e.pageY - e.target.offsetTop;
    motion.trackPosition({
        x: mouseX,
        y: mouseY
    });
});

requestAnimation(() => {
    if (motion.isLookedAt({ x: 1, y: 2 })) {
        btn.classList.add("prepare");
    }

    if (motion.isLookedIn({ x: 1, y: 3 }, { x: 1, y: 1 })) {
        btn.classList.add("prepare");
    }
});
```

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
