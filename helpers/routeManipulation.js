export function removeLangExtension(route) {
  return route.replace(/___..$/, '')
}