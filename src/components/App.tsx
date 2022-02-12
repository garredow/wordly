import kebabcase from 'lodash.kebabcase';
import { Fragment, h, VNode } from 'preact';
import { Route, Router } from 'preact-router';
import { useEffect } from 'preact/hooks';
import { SettingsProvider, useSettings } from '../contexts';
import { TextSize } from '../models';
import Home from '../routes/Home';
import { themes } from '../themes';

export function AppWrapper(): VNode {
  return (
    <div id="preact_root">
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </div>
  );
}

export default function App(): VNode {
  const { settings } = useSettings();

  useEffect(() => {
    // Theme
    const theme = themes.find((a) => a.id === settings.theme) || themes[0];
    for (const id in theme.values) {
      document.documentElement.style.setProperty(`--${kebabcase(id)}`, theme.values[id]);
    }
    document.documentElement.style.setProperty('--app-accent-color', `#${settings.accentColor}`);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme.values.headerBgColor);

    if (theme.settings.accentText) {
      document.documentElement.style.setProperty('--accent-text-color', `#${settings.accentColor}`);
    }
    if (theme.settings.accentHighlight) {
      document.documentElement.style.setProperty(
        '--highlight-bg-color',
        `#${settings.accentColor}`
      );
    }
    if (theme.settings.accentHeader) {
      document.documentElement.style.setProperty('--header-bg-color', `#${settings.accentColor}`);
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', `#${settings.accentColor}`);
    }

    const fontSize = {
      [TextSize.Smallest]: 9,
      [TextSize.Small]: 10,
      [TextSize.Medium]: 11,
      [TextSize.Large]: 12,
      [TextSize.Largest]: 13,
    };
    document.documentElement.style.setProperty(
      '--base-font-size',
      `${fontSize[settings.textSize]}px`
    );
  }, [settings]);

  return (
    <Fragment>
      <Router>
        <Route path="/" component={Home} default={true} />
      </Router>
    </Fragment>
  );
}
