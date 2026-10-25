/** Bump when the per-product detail files change shape or content, so cached copies are bypassed. */
export const DATA_VERSION = '2';
export const detailUrl = (id: string) => `/data/v${DATA_VERSION}/p/${encodeURIComponent(id)}.json`;
