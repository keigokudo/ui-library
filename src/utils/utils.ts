/**
 * Flexible type representing class name values.
 * Supports strings, numbers, booleans, null, undefined, objects, and nested arrays.
 */
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
 * @param {ClassValue[]} classes - A variable number of class names or arrays of class names.
 * @returns {string} A single string of space-separated class names, with falsy values removed.
 * @example
 * ```typescript
 * clsx("btn", undefined, "active", ["text-bold", "p-2"]) // Returns "btn active text-bold p-2"
 * clsx("base", { active: true, disabled: false }) // Returns "base active"
 * clsx("btn", isLoading && "loading", variant && `variant-${variant}`) // Conditional classes
 * ```
 */
export function clsx(...classes: ClassValue[]): string {
  return classes
    .flatMap(processClassValue) // Flattens nested arrays into a single array
    .filter(Boolean) // Removes falsy values (e.g., undefined, null, false)
    .join(" "); // Joins class names with a space
}

/**
 * Processes a single class value based on its type.
 * - For objects: extracts keys where the corresponding value is truthy
 * - For other types: returns the value unchanged
 *
 * @param {ClassValue} cls - The class value to process
 * @returns {ClassValue} Processed class value - either the original value or an array of truthy keys
 *
 * @example
 * ```typescript
 * processClassValue("btn") // Returns "btn"
 * processClassValue(["a", "b"]) // Returns ["a", "b"]
 * processClassValue({ active: true, hidden: false }) // Returns ["active"]
 * processClassValue(null) // Returns null
 * ```
 */
function processClassValue(cls: ClassValue): ClassValue {
  if (isPlainObject(cls)) {
    return Object.entries(cls)
      .filter(([_, value]) => Boolean(value)) // Filters out entries with falsy values
      .map(([key]) => key);
  }
  return cls;
}

/**
 * Type guard that checks if a value is a plain object (not array or null).
 * A plain object is an object created by {} or Object constructor,
 * excluding arrays, null, Date, RegExp, and other built-in objects.
 *
 * @param {ClassValue} value - The value to check
 * @returns {boolean} True if the value is a plain object, false otherwise
 *
 * @example
 * ```typescript
 * isPlainObject({}) // Returns true
 * isPlainObject({ a: 1, b: 2 }) // Returns true
 * isPlainObject([]) // Returns false
 * isPlainObject(null) // Returns false
 * isPlainObject(new Date()) // Returns false
 * ```
 */
function isPlainObject(value: ClassValue): value is Record<string, any> {
  const isObject = typeof value === "object";
  const isNotNull = value != null;
  const isNotArray = !Array.isArray(value);

  return isObject && isNotNull && isNotArray;
}
