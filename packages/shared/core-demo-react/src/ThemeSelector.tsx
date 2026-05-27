import React from 'react';
import { DropdownSelector, type DropdownSelectorOption } from './DropdownSelector.js';

export type ThemeSelectorOption = DropdownSelectorOption;

type ThemeSelectorProps = {
  readonly value: string;
  readonly options: readonly ThemeSelectorOption[];
  readonly onChange: (value: string) => void;
  readonly label?: string;
  readonly className?: string;
};

export function ThemeSelector({
  value,
  options,
  onChange,
  label = 'Theme',
  className,
}: ThemeSelectorProps): React.JSX.Element {
  return (
    <DropdownSelector
      value={value}
      options={options}
      onChange={onChange}
      label={label}
      className={['demo-theme-selector', className].filter(Boolean).join(' ')}
    />
  );
}
