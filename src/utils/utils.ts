type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, any>
  | ClassValue[];

/**
 * Combines multiple class names into a single string, handling arrays and filtering out falsy values.
 * Useful for dynamically constructing CSS class strings in React or other frameworks.
 *
 * @param {ClsxValue[]} classes - A variable number of class names or arrays of class names.
 * @returns {string} A single string of space-separated class names, with falsy values removed.
 * @example
 * clsx("btn", undefined, "active", ["text-bold", "p-2"]) // Returns "btn active text-bold p-2"
 */

export function clsx(...classes: ClassValue[]): string {
  return classes
    .flatMap(processClassValue) // Flattens nested arrays into a single array
    .filter(Boolean) // Removes falsy values (e.g., undefined, null, false)
    .join(" "); // Joins class names with a space
}

function processClassValue(cls: ClassValue): ClassValue {
  if (isPlainObject(cls)) {
    return Object.entries(cls as Record<string, any>)
      .filter(([_, value]) => Boolean(value)) // Filters out entries with falsy values
      .map(([key]) => key);
  }
  return cls;
}

function isPlainObject(value: ClassValue) {
  const isObject = typeof value === "object";
  const isNotNull = value != null;
  const isNotArray = !Array.isArray(value);

  return isObject && isNotNull && isNotArray;
}
