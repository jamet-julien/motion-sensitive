import MotionSensitive from "../src/index";

let elementsSensitive;

const motion = MotionSensitive({
    sensibility: 10
});

const element = [...document.querySelectorAll("button")];

document.body.addEventListener("mousemove", (e) => {
    const mouseX = e.pageX - document.body.offsetLeft;
    const mouseY = e.pageY - document.body.offsetTop;
    motion.trackPoint({
        x: mouseX,
        y: mouseY
    });
});

function wakeUp(actived) {
    if (actived.timer == null) {
        actived.dom.classList.add("prepare");
        actived.timer = setTimeout(() => {
            actived.dom.classList.remove("prepare");
            clearTimeout(actived.timer);
            actived.timer = null;
        }, 1000);
    }
}

function prepare(arr) {
    return arr.map((el) => {
        const { x, y, width, height } = el.getBoundingClientRect();

        const bottomLeft = { x, y: y + height };
        const topRight = { x: x + width, y: y };

        const bottomRight = { x: x + width, y: y + height };
        const topLeft = { x, y };

        return {
            timer: null,
            dom: el,
            bottomLeft,
            topRight,
            bottomRight,
            topLeft
        };
    });
}

function draw() {
    elementsSensitive.map((element) => {
        if (
            motion.isLookedIn(element.topRight, element.bottomLeft) ||
            motion.isLookedIn(element.bottomRight, element.topLeft)
        ) {
            wakeUp(element);
        }
    });
    requestAnimationFrame(draw);
}

elementsSensitive = prepare(element);
draw();
