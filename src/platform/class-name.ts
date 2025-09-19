export type ClassNameAttribute = undefined | string | Record<string, boolean>

export function className(...args: ClassNameAttribute[]): string {
  let result = []
  for (const arg of args) {
    if (!arg) continue
    if (typeof arg === 'string') {
      result.push(arg)
    } else {
      for (const [key, value] of Object.entries(arg)) {
        if (value) result.push(key)
      }
    }
  }

  return result.join(' ')
}