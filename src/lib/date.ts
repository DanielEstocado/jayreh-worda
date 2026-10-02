// Today as a YYYY-MM-DD string, the shape every mock date uses.
export function today() {
  return new Date().toISOString().slice(0, 10);
}
