import { FC, FocusEventHandler } from "react";

type SwitchFieldProps = {
  id: string;
  name: string;
  label?: string | null;
  helpText?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  onFocus?: FocusEventHandler;
};

const UISwitchField: FC<SwitchFieldProps> = ({
  id,
  name,
  label,
  helpText,
  value,
  onFocus,
  onChange,
}) => {
  return (
    <div className="flex items-start justify-between">
      {(!!label || !!helpText) && (
        <div className="mt-1 mr-2">
          {!!label && <span className="mr-3 text-gray-900">{label}</span>}
          {!!helpText && (
            <p className="mt-2 text-sm text-gray-300">{helpText}</p>
          )}
        </div>
      )}

      <label
        htmlFor={id}
        className="relative inline-flex cursor-pointer items-center"
      >
        <input
          id={id}
          name={name}
          checked={value}
          type="checkbox"
          className="peer sr-only outline-none"
          onChange={(e) => onChange(e.target.checked)}
          onFocus={onFocus}
        />
        <span className="peer h-8 w-14 rounded-full bg-gray-200 after:absolute after:top-[4px] after:left-[4px] after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-green-500" />
      </label>
    </div>
  );
};

export default UISwitchField;
