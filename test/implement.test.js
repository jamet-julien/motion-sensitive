import MotionSensitive from "../src/index";

describe("Constructor", () => {
    it("First import right", () => {
        expect(typeof MotionSensitive).toBe("function");
    });

    it("Launched", () => {
        const instance = MotionSensitive();
        expect(typeof instance).toBe("object");
    });
});

describe("trackPoint evaluate", () => {
    const instance = MotionSensitive();

    it("TrackPoint needed Object with property X and Y", () => {
        try {
            instance.trackPoint({ pos: 90 });
        } catch (error) {
            expect(
                error.includes(
                    "trackPoint() must have params object with property x and y"
                )
            ).toBeTruthy();
        }
    });

    it("TrackPoint needed Object with property X and Y", () => {
        try {
            instance.trackPoint();
        } catch (error) {
            expect(
                error.includes(
                    "trackPoint() must have params object with property x and y"
                )
            ).toBeTruthy();
        }
    });
});

describe("isLookedAt evaluate", () => {
    const instance = MotionSensitive();
    instance.trackPoint({ x: 0, y: 0 });
    instance.trackPoint({ x: 1, y: 1 });

    it("isLookedAt needed Object with property X and Y", () => {
        try {
            instance.isLookedAt();
        } catch (error) {
            expect(
                error.includes(
                    "isLookedAt() must have params object with property x and y"
                )
            ).toBeTruthy();
        }
    });

    it("isLookedAt return true on right direction", () => {
        expect(instance.isLookedAt({ x: 2, y: 2 })).toBeTruthy();
    });

    it("isLookedAt return false on wrong direction", () => {
        expect(instance.isLookedAt({ x: 0, y: 2 })).toBeFalsy();
        expect(instance.isLookedAt({ x: -2, y: -2 })).toBeFalsy();
    });
});

describe("Params gap", () => {
    const instance = MotionSensitive({ gap: 15 });
    instance.trackPoint({ x: 0, y: 0 });
    instance.trackPoint({ x: 1, y: 1 });

    it("isLookedAt return true on near the right direction", () => {
        expect(instance.isLookedAt({ x: 2, y: 3 })).toBeTruthy();
    });
});

describe("Params sensibility", () => {
    it("isLookedAt return true on the right direction when there is enough point", () => {
        const instance = MotionSensitive({ sensibility: 4 });
        instance.trackPoint({ x: 0, y: 0 });
        instance.trackPoint({ x: 2, y: 2 });
        instance.trackPoint({ x: 4, y: 4 });
        instance.trackPoint({ x: 5, y: 5 });
        instance.trackPoint({ x: 6, y: 6 });

        expect(instance.isLookedAt({ x: 2, y: 2 })).toBeTruthy();
    });

    it("isLookedAt return wrong on the right direction when there is not enough point", () => {
        const instance = MotionSensitive({ sensibility: 4 });
        instance.trackPoint({ x: 2, y: 9 });
        instance.trackPoint({ x: 4, y: 4 });
        instance.trackPoint({ x: 5, y: 5 });
        instance.trackPoint({ x: 6, y: 6 });

        expect(instance.isLookedAt({ x: 2, y: 2 })).toBeFalsy();
    });
});

describe("isLookedIn evaluate", () => {
    const instance = MotionSensitive();
    instance.trackPoint({ x: 0, y: 0 });
    instance.trackPoint({ x: 1, y: 1 });

    it("isLookedIn needed 2 Objects with property X and Y", () => {
        try {
            instance.isLookedIn();
        } catch (error) {
            expect(
                error.includes(
                    "isLookedIn() must have 2 params object with property x and y"
                )
            ).toBeTruthy();
        }
    });

    it("isLookedIn needed 2 Objects with property X and Y", () => {
        try {
            instance.isLookedIn({ x: 2, y: 2.5 });
        } catch (error) {
            expect(
                error.includes(
                    "isLookedIn() must have 2 params object with property x and y"
                )
            ).toBeTruthy();
        }
    });

    it("isLookedIn return true on right direction", () => {
        expect(
            instance.isLookedIn({ x: 2, y: 2.5 }, { x: 2, y: 1.5 })
        ).toBeTruthy();
    });

    it("isLookedIn return false on wrong direction", () => {
        expect(
            instance.isLookedIn({ x: 2, y: 2.5 }, { x: 2, y: 2.4 })
        ).toBeFalsy();
        expect(instance.isLookedIn({ x: 1, y: 9 }, { x: 1, y: 8 })).toBeFalsy();
    });
});
