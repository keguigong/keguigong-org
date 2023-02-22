import { Frame } from "./util-canvas-draw"

type Callback = (arr: number[], i: number, j: number, swapped: boolean) => void

export const swap = (arr: number[], i: number, j: number) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

/**
 * Bubble Sort
 * @param arr
 * @param callback
 * @returns
 */
export const bubbleSort = (arr: number[], callback?: Callback) => {
  let swapped = false
  for (let max = arr.length; max > 0; max--) {
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

/**
 * Selection Sort
 * @param arr
 * @param callback
 * @returns
 */
export const selectionSort = (arr: number[], callback?: Callback) => {
  let swapped = false
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      callback && callback.call(undefined, arr.slice(), i, j, swapped)
      if (arr[j] < arr[i]) {
        swap(arr, i, j)
        swapped = !swapped
      }
      callback && callback.call(undefined, arr.slice(), i, j, swapped)
    }
  }

  return arr
}

/**
 * Insertion Sort
 * @param arr
 * @param callback
 * @returns
 */
export const insertionSort = (arr: number[], callback?: Callback) => {
  let swapped = false
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j >= 0; j--) {
      callback && callback.call(undefined, arr.slice(), i, j, swapped)
      if (arr[j] < arr[j - 1]) {
        swap(arr, j - 1, j)
        swapped = !swapped
      } else break
      callback && callback.call(undefined, arr.slice(), i, j, swapped)
    }
  }

  return arr
}

/**
 * Quick Sort
 * @param arr
 * @param callback
 * @param low
 * @param high
 * @returns
 */
export const quickSort = (arr: number[], callback?: Callback, low = 0, high = arr.length - 1) => {
  if (low < high) {
    let pivot = partition(arr, callback, low, high)
    quickSort(arr, callback, low, pivot - 1)
    quickSort(arr, callback, pivot + 1, high)
  }
  return arr

  function partition(arr: number[], callback?: Callback, low = 0, high = arr.length - 1) {
    let pivot = arr[low]
    while (low < high) {
      while (low < high && arr[high] > pivot) {
        callback && callback.call(undefined, arr.slice(), low, high, true)
        --high
        callback && callback.call(undefined, arr.slice(), low, high, true)
      }
      arr[low] = arr[high]
      while (low < high && arr[low] <= pivot) {
        callback && callback.call(undefined, arr.slice(), low, high, true)
        ++low
        callback && callback.call(undefined, arr.slice(), low, high, true)
      }
      arr[high] = arr[low]
    }
    arr[low] = pivot
    return low
  }
}

export const genRandomNums = () => {
  let arr: number[] = []
  for (let i = 0; i < 100; i++) {
    arr.push(Math.floor(Math.random() * 100))
  }
  return arr
}

export const genFrameArr = (
  arr: number[],
  fn: (arr: number[], callback?: Callback) => number[]
) => {
  let outArr: Frame[] = []
  fn.call(null, arr, (arr1, i, j, swapped) => {
    outArr.push({
      data: arr1,
      highlight: [i, j],
      swapped
    })
  })
  return outArr
}
