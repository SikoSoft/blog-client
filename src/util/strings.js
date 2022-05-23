export function parseVars(string, variables) {
  return string.replaceAll(/\{([a-zA-Z]+)\}/g, (match, key) => {
    return variables && variables[key] ? variables[key] : key;
  });
}
