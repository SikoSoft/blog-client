export function arrayUnique(array) {
  return [
    ...new Set(array.map(element => JSON.stringify(element)))
  ].map(element => JSON.parse(element));
}

export function arrayHasObject(array, object) {
  return array
    .map(element => JSON.stringify(element))
    .some(element => JSON.stringify(object) === element);
}
