// Hand-rolled ANSI helpers — no chalk dependency for fast startup

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

export function fg(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  return `\x1b[38;2;${r};${g};${b}m`;
}

export function bg(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  return `\x1b[48;2;${r};${g};${b}m`;
}

export const RESET = '\x1b[0m';
export const BOLD = '\x1b[1m';

export function colorize(text: string, fgHex: string, bgHex?: string): string {
  let out = fg(fgHex);
  if (bgHex) out += bg(bgHex);
  out += text + RESET;
  return out;
}

export function stripAnsi(str: string): string {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

export function visibleLength(str: string): number {
  return stripAnsi(str).length;
}
