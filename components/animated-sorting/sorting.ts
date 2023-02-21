export const swap = (arr: number[], i: number, j: number) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

export const bubble = (
  arr: number[],
  callback?: (arr: number[], i: number, j: number, swapped: boolean) => void
) => {
  for (let max = arr.length; max > 0; max--) {
    let swapped = false
    for (let i = 0; i < max - 1; i++) {
      callback && callback.call(undefined, arr.slice(), i, i + 1, swapped)
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1)
        swapped = !swapped
      }
      callback && callback.call(undefined, arr.slice(), i, i + 1, swapped)
    }
  }

  return arr
}
