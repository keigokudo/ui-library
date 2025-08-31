import { clsx } from "../../utils/utils";
import styles from "./button.module.scss";

type BaseButtonProps = {
  variant?: "contained" | "outlined" | "text";
  children: React.ReactNode;
};

// if href is passed, it should be typed for button so that it can pass native attributes.
type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "href"> & {
    href?: never;
  };

type ButtonAsLink = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const { variant = "contained", children } = props;
  const classNames = [styles.button];
  if (variant !== "contained") {
    classNames.push(styles[variant]);
  }

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <a
        className={clsx(classNames)}
        href={href}
        role="button"
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const { ...buttonProps } = props;
  return (
    <button
      className={clsx(classNames)}
      {...(buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)} // any better way to do this?
    >
      {children}
    </button>
  );
}
