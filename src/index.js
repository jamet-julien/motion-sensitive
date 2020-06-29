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

const MAX_LENGTH_HISTORY = 1;
const GAP = 5;

const DEFAULT_CONF = { gap: GAP, sensibility: MAX_LENGTH_HISTORY };

const getAverageVector = ([first, ...rest]) =>
    rest.reduce(
        (g, { x, y, ...method }) => ({
            x: (g.x + x) / 2,
            y: (g.y + y) / 2,
            ...method
        }),
        first
    );

export const MotionSensitive = (params = {}) => {
    const OPTION = { ...DEFAULT_CONF, ...params };
    let history = [];
    const lastIndex = Math.max(MAX_LENGTH_HISTORY, OPTION.sensibility);
    const pushStackLimited = makePushStackLimited(lastIndex + 1);

    const isValidHistoryLenght = () => history.length == lastIndex + 1;

    const getCurrentVector = () => history[0].sub(getAverageVector(history));

    const getAngleTargetVector = (pos) => {
        const vector = getCurrentVector();
        const target = Vector(pos).sub(getAverageVector(history));
        const angle = getAngle(vector, target);
        return [angle, target];
    };

    return {
        isLookedAt: (position = triggerError(errorMessage["isLookedAt"])) => {
            if (isValidHistoryLenght() == false) return false;

            const [angle] = getAngleTargetVector(position);

            return angle <= OPTION.gap;
        },
        isLookedIn: (
            pos1 = triggerError(errorMessage["isLookedIn"]),
            pos2 = triggerError(errorMessage["isLookedIn"])
        ) => {
            if (isValidHistoryLenght() == false) return false;

            const [angle1, target1] = getAngleTargetVector(pos1);
            const [angle2, target2] = getAngleTargetVector(pos2);

            return angle1 + angle2 == getAngle(target1, target2);
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

export default MotionSensitive;
