export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export enum TextSize {
  Smallest = 'smallest',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Largest = 'largest',
}

export enum AppBarSize {
  Hidden = 'hidden',
  Compact = 'compact',
  Normal = 'normal',
}

export type Settings = {
  theme: Theme;
  accentColor: string;
  textSize: TextSize;
  appBarSize: AppBarSize;
};
