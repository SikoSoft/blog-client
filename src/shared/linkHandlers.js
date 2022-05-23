export function linksByEntity(entity, links = this?.links) {
  if (links) {
    return links.filter(link => link.entity === entity);
  }
  return [];
}

export function linksByMethod(method, links = this?.links) {
  if (links) {
    return links.filter(link => link.method === method);
  }
  return [];
}

export function linksByRel(rel, links = this?.links) {
  if (links) {
    return links.filter(link => link.rel === rel);
  }
  return [];
}

export function link(method, entity = "", links = this?.links) {
  if (links) {
    return links
      .filter(link => link.entity === entity || !entity)
      .filter(link => link.method === method)[0];
  }
  return false;
}

export default {
  linksByEntity,
  linksByMethod,
  linksByRel,
  link
};
