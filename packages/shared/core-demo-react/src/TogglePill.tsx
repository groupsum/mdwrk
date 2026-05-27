import React from 'react';

type TogglePillProps = {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
  readonly className?: string;
};

export function TogglePill({
  label,
  checked,
  onChange,
  className,
}: TogglePillProps): React.JSX.Element {
  return (
    <label
      className={['demo-toggle-pill', className].filter(Boolean).join(' ')}
      data-checked={checked ? 'true' : 'false'}
    >
      <input
        className="demo-toggle-pill__input"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="demo-toggle-pill__indicator" aria-hidden="true" />
      <span className="demo-toggle-pill__label">{label}</span>
    </label>
  );
}
