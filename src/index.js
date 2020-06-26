import {
    makePushStackLimited,
    mandatoryCoord,
    triggerError
} from "./helpers/utils";

import { Vector, getAngle } from "./helpers/vector";

const errorMessage = {
    trackPoint: "trackPoint() must have params object with property x and y",
    isLookedAt: "isLookedAt() must have params object with property x and y",
    isLookedIn: "isLookedIn() must have 2 params object with property x and y"
};

const MAX_LENGTH_HISTORY = 2;

const MouseSensitive = (opt = { gap: 5 }) => {
    let history = [];
    const pushStackLimited = makePushStackLimited(MAX_LENGTH_HISTORY);
    return {
        isLookedAt: (position = triggerError(errorMessage["isLookedAt"])) => {
            const vector = history[0].sub(history[1]);
            const target = Vector(position).sub(history[1]);

            return getAngle(vector, target) <= opt.gap;
        },
        isLookedIn: (
            pos1 = triggerError(errorMessage["isLookedIn"]),
            pos2 = triggerError(errorMessage["isLookedIn"])
        ) => {
            const vector = history[0].sub(history[1]);

            const bornA = Vector(pos1).sub(history[1]);
            const bornB = Vector(pos2).sub(history[1]);

            const angleVectorBornA = getAngle(vector, bornA);
            const angleVectorBornB = getAngle(vector, bornB);

            return (
                angleVectorBornA + angleVectorBornB == getAngle(bornA, bornB)
            );
        },
        trackPoint: (position = triggerError(errorMessage["trackPoint"])) => {
            try {
                history = pushStackLimited(
                    history,
                    mandatoryCoord(Vector(position))
                );
            } catch (err) {
                throw errorMessage["trackPoint"];
            }
        }
    };
};

export default MouseSensitive;
