import type { IconSet } from '../types.js';

const ICON_MAP: Record<string, Record<IconSet, string>> = {
  model:     { nerd: '\uf490',  ascii: '[M]',   none: '' },  //
  context:   { nerd: '\uf0e4',  ascii: '[Ctx Window]', none: '' },  //
  rateLimit: { nerd: '\uf0e7',  ascii: '[RL]',  none: '' },  //
  cost:      { nerd: '\uf155',  ascii: '[$]',   none: '' },  //
  git:       { nerd: '\ue725',  ascii: '[git]', none: '' },  //
  session:   { nerd: '\uf017',  ascii: '[S]',   none: '' },  //
  directory: { nerd: '\uf07b',  ascii: '[DIR]', none: '' },  //
  vim:       { nerd: '\ue62b',  ascii: '[V]',   none: '' },  //
  agent:     { nerd: '\uf544',  ascii: '[A]',   none: '' },  //
};

export function getIcon(name: string, iconSet: IconSet): string {
  const entry = ICON_MAP[name];
  if (!entry) return '';
  const icon = entry[iconSet];
  return icon ? icon + ' ' : '';
}
