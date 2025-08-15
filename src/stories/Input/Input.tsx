import { useId } from "react";
import type { InputHTMLAttributes, ForwardedRef } from "react";
import styles from "./input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "text" | "number" | "email";
  fullWidth?: boolean;
  id?: string;
};

export default function Input(
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement> = null
) {
  const { label, error, helperText, variant, fullWidth, id, ...inputProps } =
    props;

  const inputId = id || `input-${useId()}`;

  return (
    <div className={styles.className}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input ref={ref} id={inputId} {...inputProps} />
    </div>
  );
}
