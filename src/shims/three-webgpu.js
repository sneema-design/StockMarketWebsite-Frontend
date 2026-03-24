// Shim for three/webgpu — not needed for standard WebGL globe rendering
// Use a Proxy so ANY named import resolves to null without error
const handler = { get: () => null };
const stub = new Proxy({}, handler);
export default stub;
export const WebGPURenderer = null;
export const StorageInstancedBufferAttribute = null;
export const StorageBufferAttribute = null;
export const NodeMaterial = null;
export const MeshBasicNodeMaterial = null;
export const MeshLambertNodeMaterial = null;
export const MeshPhongNodeMaterial = null;
export const MeshStandardNodeMaterial = null;
export const MeshPhysicalNodeMaterial = null;
export const PointsNodeMaterial = null;
export const LineBasicNodeMaterial = null;
export const SpriteNodeMaterial = null;
