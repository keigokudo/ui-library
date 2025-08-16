import { useId } from "react";
import type { InputHTMLAttributes, ForwardedRef } from "react";
import styles from "./input.module.scss";
import { clsx } from "../../utils/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "text" | "number" | "email";
  isFullWidth?: boolean;
  id?: string;
};

export default function Input(
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement> = null
) {
  const {
    label,
    error,
    helperText,
    variant,
    isFullWidth = false,
    id,
    ...inputProps
  } = props;

  const inputId = id || `input-${useId()}`;

  const containerClasses = clsx(styles.container, {
    [styles.fullWidth]: isFullWidth,
  });

  return (
    <div className={containerClasses}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input ref={ref} id={inputId} {...inputProps} />
    </div>
  );
}
