export function normalizeChainId(
  chainId: string | number | bigint | { chainId: string },
): number {
  if (typeof chainId === 'object') {
    return normalizeChainId(chainId.chainId);
  }
  if (typeof chainId === 'string') {
    return Number.parseInt(
      chainId,
      chainId.trim().substring(0, 2) === '0x' ? 16 : 10,
    );
  }
  if (typeof chainId === 'bigint') {
    return Number(chainId);
  }
  return chainId;
}
