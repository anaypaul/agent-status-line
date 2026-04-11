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

/**
 * Build a project-relative directory label.
 *
 * Given a cwd and a project root, returns:
 *   - "project-name"                  when cwd === projectDir
 *   - "project-name:relative/path"    when the relative path is short
 *   - "project-name:.../tail"         when the relative path is deep
 *
 * Falls back to shortenPath(cwd) when projectDir is not available.
 */
export function projectRelativePath(
  cwd: string,
  projectDir: string | undefined,
  maxLength: number = 30,
): string {
  if (!projectDir) return shortenPath(cwd, maxLength);

  const projectName = projectDir.split('/').filter(Boolean).pop() || projectDir;

  // Normalize: strip trailing slashes for comparison
  const normCwd = cwd.replace(/\/+$/, '');
  const normProject = projectDir.replace(/\/+$/, '');

  // At project root
  if (normCwd === normProject) return projectName;

  // Compute relative path (cwd should be inside projectDir)
  if (!normCwd.startsWith(normProject + '/')) {
    // cwd is outside the project — fall back to generic shortening
    return shortenPath(cwd, maxLength);
  }

  const relative = normCwd.slice(normProject.length + 1);

  const full = `${projectName}:${relative}`;
  if (full.length <= maxLength) return full;

  // Truncate relative portion: keep last 2 segments
  const relParts = relative.split('/');
  if (relParts.length <= 2) return full; // can't shorten further

  const tail = relParts.slice(-2).join('/');
  const truncated = `${projectName}:.../` + tail;

  // If still too long, just show project + last segment
  if (truncated.length > maxLength) {
    return `${projectName}:.../` + relParts[relParts.length - 1];
  }

  return truncated;
}
