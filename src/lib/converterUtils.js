export default function deepCopyObject(value, copies = new WeakMap()) {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (copies.has(value)) {
    return copies.get(value);
  }

  const copy = Array.isArray(value) ? [] : {};

  copies.set(value, copy);

  Object.keys(value).forEach((key) => {
    copy[key] = deepCopyObject(value[key], copies);
  });

  return copy;
}
