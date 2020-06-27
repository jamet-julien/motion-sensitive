import MotionSensitive from "../src/index";

let elementsSensitive;

const motion = MotionSensitive();

const element = [
    document.querySelector("#btn1"),
    document.querySelector("#btn2")
];

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

        const point1 = { x, y: y + height };
        const point2 = { x: x + width, y: y };

        return {
            timer: null,
            dom: el,
            point1,
            point2
        };
    });
}

function draw() {
    elementsSensitive.map((element) => {
        if (motion.isLookedIn(element.point2, element.point1)) {
            wakeUp(element);
        }
    });
    requestAnimationFrame(draw);
}

elementsSensitive = prepare(element);
draw();
