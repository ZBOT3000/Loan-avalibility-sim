import type { ChangeEvent, SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  value: string | '';
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  fullWidth?: boolean;
}

export default function SelectField({
  label,
  value,
  onChange,
  options,
  fullWidth = true,
  className,
  ...props
}: Props) {
  return (
    <div className={clsx('relative', fullWidth && 'w-full')}>
      <select
        value={value}
        onChange={(e) => onChange(e as ChangeEvent<HTMLSelectElement>)}
        className={clsx(
          'peer appearance-none w-full rounded-full px-5 pr-10 py-3 bg-cyan-400/14 border border-white/30 text-white transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent cursor-pointer',
          !value && 'text-white/50',
          className,
        )}
        {...props}
      >
        <option value="" disabled hidden>
          {label}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <svg
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
