import type { ThemeDefinition } from '../../types.js';

export const monokaiTheme: ThemeDefinition = {
  name: 'monokai',
  meta: { author: 'agent-status-line', variant: 'dark' },
  base: {
    bg: '#2d2a2e',
    fg: '#fcfcfa',
    separator_fg: '#403e41',
  },
  segments: {
    'model': {
      normal: { fg: '#78dce8', bg: '#403e41' },
      warn: { fg: '#000000', bg: '#ffd866' },
      critical: { fg: '#ffffff', bg: '#ff6188' },
    },
    'context': {
      normal: { fg: '#a9dc76', bg: '#403e41' },
      warn: { fg: '#000000', bg: '#ffd866' },
      critical: { fg: '#ffffff', bg: '#ff6188' },
    },
    'rate-limit': {
      normal: { fg: '#a9dc76', bg: '#403e41' },
      warn: { fg: '#000000', bg: '#ffd866' },
      critical: { fg: '#ffffff', bg: '#ff6188' },
    },
    'cost': {
      normal: { fg: '#ff6188', bg: '#403e41' },
      warn: { fg: '#000000', bg: '#ffd866' },
      critical: { fg: '#ffffff', bg: '#ff6188' },
    },
    'git': {
      normal: { fg: '#a9dc76', bg: '#403e41' },
      warn: { fg: '#000000', bg: '#ffd866' },
      critical: { fg: '#ffffff', bg: '#ff6188' },
    },
    'session': {
      normal: { fg: '#ab9df2', bg: '#403e41' },
      warn: { fg: '#000000', bg: '#ffd866' },
      critical: { fg: '#ffffff', bg: '#ff6188' },
    },
    'directory': {
      normal: { fg: '#fc9867', bg: '#403e41' },
      warn: { fg: '#000000', bg: '#ffd866' },
      critical: { fg: '#ffffff', bg: '#ff6188' },
    },
    'vim-mode': {
      normal: { fg: '#78dce8', bg: '#403e41' },
      warn: { fg: '#000000', bg: '#ffd866' },
      critical: { fg: '#ffffff', bg: '#ff6188' },
    },
    'agent-info': {
      normal: { fg: '#ab9df2', bg: '#403e41' },
      warn: { fg: '#000000', bg: '#ffd866' },
      critical: { fg: '#ffffff', bg: '#ff6188' },
    },
  },
};
