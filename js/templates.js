export function html(strings, ...values) {
  const str = strings.reduce((acc, s, i) => acc + s + (values[i] ?? ''), '');
  return str.trim();
}

export function repeat(items, render) {
  return items.map(render).join('');
}
