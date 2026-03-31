import type { ThemeDefinition } from '../../types.js';

export const nordTheme: ThemeDefinition = {
  name: 'nord',
  meta: { author: 'agent-status-line', variant: 'dark' },
  base: {
    bg: '#2e3440',
    fg: '#d8dee9',
    separator_fg: '#3b4252',
  },
  segments: {
    'model': {
      normal: { fg: '#81a1c1', bg: '#3b4252' },
      warn: { fg: '#000000', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'context': {
      normal: { fg: '#a3be8c', bg: '#3b4252' },
      warn: { fg: '#000000', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'rate-limit': {
      normal: { fg: '#a3be8c', bg: '#3b4252' },
      warn: { fg: '#000000', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'cost': {
      normal: { fg: '#b48ead', bg: '#3b4252' },
      warn: { fg: '#000000', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'git': {
      normal: { fg: '#a3be8c', bg: '#3b4252' },
      warn: { fg: '#000000', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'session': {
      normal: { fg: '#88c0d0', bg: '#3b4252' },
      warn: { fg: '#000000', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'directory': {
      normal: { fg: '#d08770', bg: '#3b4252' },
      warn: { fg: '#000000', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'vim-mode': {
      normal: { fg: '#81a1c1', bg: '#3b4252' },
      warn: { fg: '#000000', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
    'agent-info': {
      normal: { fg: '#b48ead', bg: '#3b4252' },
      warn: { fg: '#000000', bg: '#ebcb8b' },
      critical: { fg: '#ffffff', bg: '#bf616a' },
    },
  },
};
