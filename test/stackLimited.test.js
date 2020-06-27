import { makePushStackLimited } from "../src/helpers/utils";

describe("constructor", () => {
    test("constructor return function", () => {
        const pushStackLimited = makePushStackLimited();
        expect(typeof pushStackLimited).toEqual("function");
    });

    test("constructor return function", () => {
        const pushStackLimited = makePushStackLimited(3);
        expect(typeof pushStackLimited).toEqual("function");
    });
});

describe("usage makePushStackLimited", () => {
    const arrInit = ["#1", "#2"];
    const pushStackLimited = makePushStackLimited();
    const newArr = pushStackLimited(arrInit, "#3");

    test("newArr could have new value #3", () => {
        expect(newArr.includes("#3")).toBeTruthy();
    });

    test("newArr could not be arrInit", () => {
        arrInit.push("#0");
        expect(newArr.includes("#0")).toBeFalsy();
    });

    test("newArr[0] could be last value input", () => {
        expect(newArr[0]).toBe("#3");
    });
});

describe("usage makePushStackLimited with limit", () => {
    const arrInit = ["#1", "#2", "#3"];
    const pushStackLimited = makePushStackLimited(3);
    const newArr = pushStackLimited(arrInit, "#4");

    test("newArr length could be max 3", () => {
        expect(newArr.length).toBe(3);
    });

    test("the last value pop", () => {
        expect(newArr.includes("#3")).toBeFalsy();
    });

    test("newArr[0] could be last value input", () => {
        expect(newArr[0]).toBe("#4");
    });
});
