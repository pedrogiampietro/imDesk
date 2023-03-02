export function setStorageModel(prop: string, model: string) {
  localStorage.setItem(prop, JSON.stringify(model));
}

export function getStorageModel(prop: string) {
  const value = localStorage.getItem(prop);
  if (value) {
    return JSON.parse(value);
  }
  return null;
}

export function removeStorage(item: string) {
  localStorage.removeItem(item);
}

export function removeAllStorage(props: []) {
  props.forEach((item: string) => removeStorage(item));
}

export function clearStorage() {
  localStorage.clear();
}
