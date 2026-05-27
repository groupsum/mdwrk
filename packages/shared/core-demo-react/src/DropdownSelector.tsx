import React from 'react';

export type DropdownSelectorOption = {
  readonly id: string;
  readonly label: string;
};

type DropdownSelectorProps = {
  readonly value: string;
  readonly options: readonly DropdownSelectorOption[];
  readonly onChange: (value: string) => void;
  readonly label: string;
  readonly className?: string;
};

export function DropdownSelector({
  value,
  options,
  onChange,
  label,
  className,
}: DropdownSelectorProps): React.JSX.Element {
  return (
    <label className={['demo-dropdown-selector', className].filter(Boolean).join(' ')}>
      <span className="demo-dropdown-selector__label">{label}</span>
      <select
        className="demo-dropdown-selector__select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}
