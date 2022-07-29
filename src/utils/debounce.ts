export const debounce = (fn: (e: any) => void, ms: number = 100) => {
  let timer: any
  return (...args: any) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(null, args)
    }, ms)
  }
}
