import React from 'react';

type ThemeStyle = React.CSSProperties | undefined;

function setStyleProperty(style: CSSStyleDeclaration, key: string, value: string) {
  if (key.startsWith('--')) {
    style.setProperty(key, value);
    return;
  }
  style.setProperty(key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`), value);
}

function clearStyleProperty(style: CSSStyleDeclaration, key: string) {
  if (key.startsWith('--')) {
    style.removeProperty(key);
    return;
  }
  style.removeProperty(key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`));
}

export function useApplyDocumentTheme(themeStyle: ThemeStyle): void {
  React.useEffect(() => {
    if (typeof document === 'undefined' || !themeStyle) {
      return;
    }

    const rootStyle = document.documentElement.style;
    const bodyStyle = document.body.style;
    const appliedKeys = Object.entries(themeStyle)
      .filter(([, value]) => typeof value === 'string')
      .map(([key, value]) => {
        const stringValue = value as string;
        setStyleProperty(rootStyle, key, stringValue);
        return key;
      });

    const background = [
      'radial-gradient(circle at top, color-mix(in srgb, var(--accent) 18%, transparent), transparent 30%)',
      'linear-gradient(180deg, color-mix(in srgb, var(--bg-app, var(--bg-panel)) 92%, transparent) 0%, var(--bg-app, var(--bg-panel)) 100%)',
    ].join(', ');

    bodyStyle.background = background;
    bodyStyle.backgroundColor = String(themeStyle['--bg-app'] ?? themeStyle.backgroundColor ?? 'transparent');
    bodyStyle.color = String(themeStyle.color ?? 'inherit');
    if (typeof themeStyle.colorScheme === 'string') {
      bodyStyle.colorScheme = themeStyle.colorScheme;
    }

    return () => {
      for (const key of appliedKeys) {
        clearStyleProperty(rootStyle, key);
      }
      bodyStyle.background = '';
      bodyStyle.backgroundColor = '';
      bodyStyle.color = '';
      bodyStyle.colorScheme = '';
    };
  }, [themeStyle]);
}
