// Shim for three/tsl — not needed for standard WebGL globe rendering
const handler = { get: () => null };
const stub = new Proxy({}, handler);
export default stub;
