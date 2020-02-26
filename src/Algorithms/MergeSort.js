export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const temp = array.slice();
  mergeSort(array, 0, array.length - 1, temp, animations);
  return animations;
}

function mergeSort(arr, start, end, temp, animations) {
  if (start === end) return;
  const middle = Math.floor((start + end) / 2);
  mergeSort(temp, start, middle, arr, animations);
  mergeSort(temp, middle + 1, end, arr, animations);
  merge(arr, start, middle, end, temp, animations);
}

function merge(arr, start, middle, end, temp, animations) {
  let i = start;
  let k = start;
  let j = middle + 1;
  while (i <= middle && j <= end) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (temp[i] <= temp[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, temp[i]]);
      arr[k++] = temp[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, temp[j]]);
      arr[k++] = temp[j++];
    }
  }
  while (i <= middle) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, temp[i]]);
    arr[k++] = temp[i++];
  }
  while (j <= end) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, temp[j]]);
    arr[k++] = temp[j++];
  }
}
