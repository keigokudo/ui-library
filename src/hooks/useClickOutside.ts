import { useEffect, useRef } from "react";

/**
 * Custom React hook that detects clicks outside of a referenced element and calls the provided callback.
 * This can be used for closing header menu, modal or backdrop etc.
 *
 * @template T - The type of the HTML element to be referenced.
 * @param onClickOutside - Function to be called when a click occurs outside the referenced element.
 * @returns A React ref object to be attached to the target element.
 *
 * @example
 * const ref = useClickOutside<HTMLDivElement>(() => {
 *   // Close dropdown or modal when clicking outside
 * });
 *
 * return <div ref={ref}>Content</div>;
 */
export default function useClickOutside<T extends HTMLElement>(
  onClickOutside: () => void
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    // trigger the callback if the click happens outside of the target element
    const handleClick = (e: MouseEvent) => {
      const clickedElement = e.target as Node;
      const clickHappenedOutside =
        ref.current && !ref.current.contains(clickedElement);

      if (clickHappenedOutside) {
        onClickOutside();
      }
    };

    // run this click event every time the user clicks anywhere in the page
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClickOutside]);

  return ref;
}
