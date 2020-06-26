# motion-sensitive

[![CircleCI Status](https://circleci.com/gh/jamet-julien/motion-sensitive.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/jamet-julien/motion-sensitive)
![Codecov](https://img.shields.io/codecov/c/github/jamet-julien/motion-sensitive)
[![npm](https://img.shields.io/npm/dt/motion-sensitive.svg?style=flat-square)](https://www.npmjs.com/package/motion-sensitive)
[![npm](https://img.shields.io/npm/v/motion-sensitive.svg?style=flat-square)](https://www.npmjs.com/package/motion-sensitive)
[![npm](https://img.shields.io/npm/l/motion-sensitive.svg?style=flat-square)](https://github.com/jamet-julien/motion-sensitive/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

lorem ipsum sit amet

-   [Install](#install)
-   [Importing](#importing)
-   [Quick start](#quick)
-   [Methods](#methods)
    -   [.method(`num`)](#method)

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
motion = MotionSensitive()

addEventlisener('mousemove',()=>{
    motion.trackPosition({x,y});
});

requestAnimation(()=>>{
    if(motion.isLookedAt({x:1, y:2})){
        btn.classList.add('prepare')
    }

    if(motion.isLookedIn({x:1, y:3}, {x:1,y:1})){
        btn.classList.add('prepare')
    }
})
```

---

## Methods <a id="methods"></a>

### .method() <a id="method"></a>

lorem ipsum sit amet

| argument | type     | Description |
| :------- | :------- | :---------- |
| `num`    | `number` | lorem ipsum |

```js
```
