import { homedir } from 'node:os';

export function shortenPath(fullPath: string, maxLength: number = 30): string {
  const home = homedir();
  let p = fullPath;
  if (p.startsWith(home)) {
    p = '~' + p.slice(home.length);
  }
  if (p.length <= maxLength) return p;

  const parts = p.split('/');
  if (parts.length <= 2) return p;

  // Keep first and last, shorten middle
  const shortened = parts.map((part, i) => {
    if (i === 0 || i === parts.length - 1) return part;
    return part[0] || part;
  });
  return shortened.join('/');
}
