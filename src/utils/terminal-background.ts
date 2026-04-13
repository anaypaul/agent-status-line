import { execSync } from 'node:child_process';

let cached: 'dark' | 'light' | null = null;

export function detectTerminalBackground(): 'dark' | 'light' {
  if (cached) return cached;

  // 1. COLORFGBG env var (rxvt, iTerm2, some xterms) - format "fg;bg"
  const colorFgBg = process.env['COLORFGBG'];
  if (colorFgBg) {
    const parts = colorFgBg.split(';');
    const bgIndex = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(bgIndex)) {
      // ANSI color indices: 0-6 = dark, 7 = light gray, 8 = dark gray, 9-15 = bright
      cached = bgIndex === 7 || (bgIndex >= 9 && bgIndex <= 15) ? 'light' : 'dark';
      return cached;
    }
  }

  // 2. VS Code theme kind
  const vscodeTheme = process.env['VSCODE_THEME_KIND'];
  if (vscodeTheme) {
    cached = vscodeTheme === 'vs' || vscodeTheme === 'hc-light' ? 'light' : 'dark';
    return cached;
  }

  // 3. macOS system appearance
  if (process.platform === 'darwin') {
    try {
      const result = execSync('defaults read -g AppleInterfaceStyle', {
        timeout: 100,
        stdio: ['pipe', 'pipe', 'pipe'],
        encoding: 'utf-8',
      }).trim();
      cached = result === 'Dark' ? 'dark' : 'light';
      return cached;
    } catch {
      // Key absent = light mode on macOS
      cached = 'light';
      return cached;
    }
  }

  // 4. Fallback: dark is most common among developers
  cached = 'dark';
  return cached;
}

/** Reset cached detection (for testing) */
export function _resetCache(): void {
  cached = null;
}
