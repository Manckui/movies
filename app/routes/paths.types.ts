export const makePath = (...pathSlices: string[]): string => {
  return (
    "/" +
    pathSlices
      .map((slice) => slice.replace(/^\/+|\/+$/g, "")) // Rimuove gli slash iniziali e finali
      .filter((slice) => slice.length > 0) // Elimina eventuali stringhe vuote
      .join("/")
  ) // Concatena i path con "/"
}
