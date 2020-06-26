export const getAngle = (vector1, vector2) => {
    const denominateur = vector1.len() * vector2.len();
    const cosAngle = vector1.dot(vector2) / denominateur;
    const value = (Math.acos(cosAngle) * 180) / Math.PI;
    return Math.round(value);
};

export const Vector = ({ x, y }) => ({
    x,
    y,
    sub: (vec) => Vector({ x: x - vec.x, y: y - vec.y }),
    dot: (vec) => +(x * vec.x + y * vec.y),
    len: () => Math.sqrt(x * x + y * y)
});
