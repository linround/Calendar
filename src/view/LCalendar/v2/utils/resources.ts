export const NONE = {}
export function resources(resources) {
  return {
    map() {
      if (!resources) return []
    },
  }
}
