import { mandatoryCoord } from "../src/helpers/utils";

describe("constructor", () => {
    test("Constructor return Object", () => {
        const coord = mandatoryCoord({ x: 0, y: 0 });
        expect(typeof coord).toBe("object");
    });

    test("Constructor params must be object", () => {
        try {
            mandatoryCoord();
        } catch (error) {
            expect(error).toBeTruthy();
        }
    });

    test("Constructor params must be object with X and Y property", () => {
        try {
            mandatoryCoord({ posX: 0, posY: 0 });
        } catch (error) {
            expect(error).toBeTruthy();
        }
    });
});

describe("usage mandatoryCoord", () => {
    test("MandatoryCoord return Object", () => {
        const coord = mandatoryCoord({ x: 0, y: 0 });
        expect(typeof coord).toBe("object");
    });

    test("MandatoryCoord return Object with X and Y property", () => {
        const coord = mandatoryCoord({ x: 0, y: 0 });
        expect(coord).toHaveProperty("x");
        expect(coord).toHaveProperty("y");
    });

    test("MandatoryCoord return Object clone", () => {
        const position = { x: 0, y: 0 };
        const coord = mandatoryCoord(position);
        position.x = 20;
        expect(coord.x).not.toBe(20);
    });
});
