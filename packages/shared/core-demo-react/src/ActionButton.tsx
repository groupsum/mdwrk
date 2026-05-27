import React from 'react';

type ActionButtonProps = {
  readonly label: string;
  readonly onClick: () => void;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly className?: string;
};

export function ActionButton({
  label,
  onClick,
  type = 'button',
  className,
}: ActionButtonProps): React.JSX.Element {
  return (
    <button
      type={type}
      className={['demo-action-button', className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <span className="demo-action-button__label">{label}</span>
    </button>
  );
}
