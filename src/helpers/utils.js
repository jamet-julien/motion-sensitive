export const triggerError = (msg) => {
    throw `${msg}`;
};

export const makePushStackLimited = (maxLength) => (arr, value) => [
    value,
    ...arr.slice(-(maxLength - 1))
];

export const mandatoryCoord = ({
    x = triggerError("[mandatoryCoord] Cannot destructure property X"),
    y = triggerError("[mandatoryCoord] Cannot destructure property Y"),
    ...method
}) => ({ x, y, ...method });
