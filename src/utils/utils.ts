/**
 * Combines multiple class names into a single string, handling arrays and filtering out falsy values.
 * Useful for dynamically constructing CSS class strings in React or other frameworks.
 *
 * @param {ClsxValue[]} classes - A variable number of class names or arrays of class names.
 * @returns {string} A single string of space-separated class names, with falsy values removed.
 * @example
 * clsx("btn", undefined, "active", ["text-bold", "p-2"]) // Returns "btn active text-bold p-2"
 */
type ClsxValue = string | boolean | undefined | null | ClsxValue[];
export function clsx(...classes: ClsxValue[]) {
  return classes
    .flat() // Flattens nested arrays into a single array
    .filter(Boolean) // Removes falsy values (e.g., undefined, null, false)
    .join(" "); // Joins class names with a space
}
