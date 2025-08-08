import styles from "./button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "contained" | "outlined" | "text";
  children: React.ReactNode;
};

export default function Button({
  variant = "contained",
  children,
  ...props
}: ButtonProps) {
  const classNames = [styles.button];
  if (variant !== "contained") {
    classNames.push(styles[variant]);
  }

  return (
    <button className={classNames.join(" ")} {...props}>
      {children}
    </button>
  );
}
