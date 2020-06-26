import { Vector, getAngle } from "../src/helpers/vector";

describe("constructor", () => {
    test("constructor return object", () => {
        const vector = Vector({ x: 1, y: 1 });
        expect(typeof vector).toEqual("object");
    });
});

describe("method", () => {
    const vector1 = Vector({ x: 1, y: 1 });
    const vector2 = Vector({ x: 2, y: 2 });
    const vector3 = Vector({ x: 4, y: 2 });

    const vector4 = Vector({ x: -12, y: 16 });
    const vector5 = Vector({ x: 12, y: 9 });
    const vector6 = Vector({ x: -2, y: -2 });

    const vectorSub = vector3.sub(vector2);

    const dotValue1 = vector4.dot(vector5);
    const dotValue2 = vector2.dot(vector6);

    test("sub return object", () => {
        expect(typeof vectorSub).toEqual("object");
    });

    test("sub return object {x:2, y:0}", () => {
        expect(vectorSub.x).toEqual(2);
        expect(vectorSub.y).toEqual(0);
    });

    test("dot return 0", () => {
        expect(dotValue1).toBe(0);
    });

    test("dot return negative value", () => {
        expect(dotValue2).toBeLessThan(0);
    });
});

describe("getValue", () => {
    const vector1 = Vector({ x: 1, y: 1 });
    const vector2 = Vector({ x: 2, y: 2 });

    const vector3 = Vector({ x: -2, y: -2 });

    const vector4 = Vector({ x: -12, y: 16 });
    const vector5 = Vector({ x: 12, y: 9 });

    test("getAngle return 0", () => {
        const angle = getAngle(vector1, vector2);
        expect(angle).toBe(0);
    });

    test("getAngle return 90", () => {
        const angle = getAngle(vector5, vector4);
        expect(angle).toBe(90);
    });

    test("getAngle return 180", () => {
        const angle = getAngle(vector1, vector3);
        expect(angle).toBe(180);
    });
});
