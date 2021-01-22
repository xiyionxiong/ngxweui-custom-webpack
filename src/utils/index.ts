export function fen2yuan(fen: number): string {
  if (fen) return (fen * 0.01).toFixed(2);
  return '0.00';
}