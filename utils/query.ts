/**
 * Converte un oggetto in una query string.
 * @param obj - L'oggetto contenente parametri (string | number | boolean | undefined)
 * @returns La query string generata
 */
export const obj2qstring = (
  obj: { [x: string]: string | number | boolean | undefined } = {}
): string => {
  const queryString = Object.entries(obj)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");
  return queryString ? `?${queryString}` : "";
};
