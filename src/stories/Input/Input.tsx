import { useState, useId } from "react";
import type { InputHTMLAttributes, ForwardedRef, FocusEvent } from "react";
import styles from "./input.module.scss";
import { clsx } from "../../utils/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium" | "large";
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
    variant = "outlined",
    size = "medium",
    isFullWidth = false,
    id,
    onFocus,
    onBlur,
    ...inputProps
  } = props;

  const uniaueId: string = useId();
  const inputId = id || `input-${uniaueId}`;

  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(
    !!inputProps.value || !!inputProps.defaultValue
  );

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    // Calls the optional onFocus callback provided by the parent component
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    // Calls the optional onBlur callback provided by the parent component
    onBlur?.(e);
  };

  const containerClasses = clsx(
    styles.container,
    styles[variant],
    styles[size],
    {
      [styles.fullWidth]: isFullWidth,
      [styles.focused]: isFocused,
      [styles.hasValue]: hasValue || isFocused,
    }
  );

  return (
    <div className={containerClasses}>
      <div className={styles.inputWrapper}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...inputProps}
        />

        {/* Outline for outlined variant */}
        {variant === "outlined" && <fieldset className={styles.outline} />}
      </div>
    </div>
  );
}
