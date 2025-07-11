import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  useEffect,
  useState,
} from "react";
import classNames from "classnames";
import useDebounce from "../../../../lib/hooks/useDebounce";

type RangeFieldProps = {
  id: string;
  name: string;
  value: number;
  min?: number;
  max?: number;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  step?: number;
  label?: string;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler;
};

const UIRangeField: FC<RangeFieldProps> = ({
  id,
  name,
  min = 0,
  max = 100,
  minPlaceholder,
  maxPlaceholder,
  step = 100,
  label,
  disabled = false,
  value,
  onChange,
  onValueChange,
  onFocus,
}) => {
  const [internalValue, setInternalValue] = useState<number>(value);
  const debouncedValue = useDebounce(internalValue, 50);

  // Update the internal value when the parent component changes the value prop
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Emit the debounced value to the parent component
  useEffect(() => {
    onValueChange && onValueChange(debouncedValue);
  }, [debouncedValue]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setInternalValue(Number(value));
  }

  return (
    <div>
      {!!label && (
        <label
          htmlFor={id}
          className="mb-1.5 block font-semibold text-gray-900"
        >
          {label}
        </label>
      )}
      <div
        className={classNames("flex items-center", {
          "opacity-50": disabled,
        })}
      >
        {minPlaceholder && (
          <span className="gray-300 mr-2 font-light">{minPlaceholder}</span>
        )}
        <input
          id={id}
          name={name}
          type="range"
          value={internalValue}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={handleChange}
          onFocus={onFocus}
          className="slider-thumb h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-150"
        />
        {maxPlaceholder && (
          <span className="gray-300 ml-2 font-light">{maxPlaceholder}</span>
        )}
      </div>
    </div>
  );
};

export default UIRangeField;
