import { useEffect } from "react";

/**
 * Custom React hook that listens for the Escape key press and calls the provided callback.
 *
 * @param onEscape - Function to be called when the Escape key is pressed.
 *
 * @example
 * useEscapeKey(() => {
 *   // Close modal or perform any action on Escape key press
 * });
 */
export default function useEscapeKey(onEscape: () => void) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onEscape]);
}
