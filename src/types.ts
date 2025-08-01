import type { SelectFormikHandler, SelectSimpleHandler } from "@/components/Select";
import type { SelectOptionType } from "@/components/Select/SelectOption";
import type { MouseEvent, FocusEvent } from "react";

export type Size = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export type Position = "center" | "right" | "left" | "top" | "bottom";

export type Variant =
  | "light"
  | "dark"
  | "success"
  | "danger"
  | "warning"
  | "none"
  | "primary"
  | "info"
  | "black";

export interface CommonFieldProps {
  id: string;
  name?: string;
  label?: string | null;
  helpText?: string | null;
  placeholder?: string | null;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  resetDisabled?: boolean;
  error?: string | boolean | string[];
  // eslint-disable-next-line no-unused-vars
  onFocus?: (e: MouseEvent | FocusEvent) => void;
  // eslint-disable-next-line no-unused-vars
  onReset?: (field: string, value: string | number, shouldValidate?: boolean | undefined) => void;
}

export interface CustomSelectFieldProps<T, V> {
  id: string;
  name: string;
  label?: string | null;
  disabled?: boolean;
  placeholder?: string | null;
  error?: string | string[] | boolean;
  required?: boolean;
  helpText?: string | null;
  popupLabel?: string | null;
  dpPosition?: Position;
  dpFullscreen?: boolean;
  dpWidth?: number;
  fixedOptions?: SelectOptionType<T, V>[];
  // eslint-disable-next-line no-unused-vars
  onFocus?: (e?: MouseEvent | FocusEvent) => void;
}

export interface CustomSingleSelectFieldProps<T, V> extends CustomSelectFieldProps<T, V> {
  value: V;
  onChange: SelectSimpleHandler<T, V> | SelectFormikHandler<V>;
}

export interface CustomMultipleSelectFieldProps<T, V> extends CustomSelectFieldProps<T, V> {
  min?: number;
  max?: number;
  value: V[];
  onChange: SelectSimpleHandler<T, V> | SelectFormikHandler<V>;
}

export type UploadedFileItem = {
  url: string;
  name: string;
  type: string; // "image" | "pdf";
  isPlaceholder?: boolean;
};
