import { Theme } from './models/Settings';

export type ThemeConfig = {
  id: Theme;
  values: {
    [key: string]: string;
    appBgColor: string;
    primaryTextColor: string;
    secondaryTextColor: string;
    letterDefaultColor: string;
    letterNoMatchColor: string;
    letterWordMatchColor: string;
    letterExactMatchColor: string;
  };
};

export const themes: ThemeConfig[] = [
  {
    id: Theme.Light,
    values: {
      appBgColor: '#ffffff',
      primaryTextColor: 'rgba(0, 0, 0, 0.88)',
      secondaryTextColor: 'rgba(0, 0, 0, 0.5)',
      letterDefaultColor: '#d4d6da',
      letterNoMatchColor: '#797b7d',
      letterWordMatchColor: '#c5b566',
      letterExactMatchColor: '#79a86b',
    },
  },
  {
    id: Theme.Dark,
    values: {
      appBgColor: '#000000',
      primaryTextColor: 'rgba(255, 255, 255, 0.88)',
      secondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      letterDefaultColor: '#5F646D',
      letterNoMatchColor: '#323334',
      letterWordMatchColor: '#A3923E',
      letterExactMatchColor: '#58814B',
    },
  },
];
