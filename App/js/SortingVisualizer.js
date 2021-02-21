// get all toggle elements with their eventListeners
var arraySizeToggle = document.getElementById("arraySize");
var sortingSpeedToggle = document.getElementById("sortingSpeed");
arraySizeToggle.addEventListener("input", setArraySize);
sortingSpeedToggle.addEventListener("input", setSortingSpeed);

// get all buttons elements with their eventListeners
var generatButton = document.getElementById("generateButton");
var sortingAlgorithms = document.querySelectorAll(".sortingAlgo");
generatButton.addEventListener("click", setArraySize);

// main array container
var arrayContainer = document.getElementById("arrayContainer");
var padding = arrayContainer.style.paddingLeft;
var position = arrayContainer.getBoundingClientRect();
var avilableheight = position.height;
var avilableWidth = position.width;
var margin = 0.5;

var arraySize = arraySizeToggle.value;
var sortingSpeed = sortingSpeedToggle.value;
var divs = [];
var divsSizes = [];

sortingAlgorithms.forEach((button) => {
  button.addEventListener("click", sortArray);
  // disable buttons
});

function resetArrayContainer() {
  arrayContainer.innerHTML = " ";
}

function setArraySize() {
  arraySize = arraySizeToggle.value;
  resetArrayContainer();
  generateNewArray();
}

function setSortingSpeed() {
  sortingSpeed = sortingSpeedToggle.value;
}

function generateNewArray() {
  for (let i = 0; i < arraySize; i++) {
    divsSizes[i] = Math.floor(Math.random() * (avilableheight - 50));
    divs[i] = document.createElement("div");
    arrayContainer.appendChild(divs[i]);
    divs[i].style =
      "background-color:black; margin:" +
      margin +
      "px; height:" +
      divsSizes[i] +
      "px; width:" +
      (avilableWidth / arraySize - 2 * margin) +
      "px;";
  }
}

window.onload = setArraySize();

var delay = 0;

function visualizeSort(index, color) {
  window.setTimeout(() => {
    divs[index].style =
      "background-color:" +
      color +
      "; margin:" +
      margin +
      "px; height:" +
      divsSizes[index] +
      "px; width:" +
      (avilableWidth / arraySize - 2 * margin) +
      "px;";
  }, (delay += 1000));
}

// function visualizeSort() {
//   for (let i = 0; i < arraySize; i++) {
//     divs[i].style =
//       "background-color:black; margin:" +
//       margin +
//       "px; height:" +
//       divsSizes[i] +
//       "px; width:" +
//       (avilableWidth / arraySize - 2 * margin) +
//       "px;";
//   }
// }

function bubbleSort() {
  var isSorted = false;

  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < arraySize - 1; i++) {
      visualizeSort(i, "red", sortingSpeed);
      visualizeSort(i + 1, "red", sortingSpeed);
      if (divsSizes[i] > divsSizes[i + 1]) {
        let temp = divsSizes[i];
        divsSizes[i] = divsSizes[i + 1];
        divsSizes[i + 1] = temp;
        isSorted = false;
        visualizeSort(i, "red");
        visualizeSort(i + 1, "red");
      }
      visualizeSort(i, "yellow");
    }
  }
}

function insertionSort() {
  for (let i = 1; i < arraySize; i++) {
    var current = divsSizes[i];
    var j = i - 1;

    while (j >= 0 && divsSizes[j] > current) {
      divsSizes[j + 1] = divsSizes[j];
      j--;
    }

    divsSizes[j + 1] = current;
  }

  visualizeSort();
}

function selectionSort() {
  var minIndex = 0;

  for (let i = 0; i < arraySize - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < arraySize; j++) {
      if (divsSizes[j] < divsSizes[minIndex]) {
        minIndex = j;
      }
    }
    var temp = divsSizes[i];
    divsSizes[i] = divsSizes[minIndex];
    divsSizes[minIndex] = temp;
  }

  visualizeSort();
}

function quickSort() {
  quickSortHelper(0, arraySize - 1);
  visualizeSort();
}

function quickSortHelper(startIndex, endIndex) {
  var partitionIndex = partition(startIndex, endIndex);
  if (startIndex < partitionIndex - 1) {
    quickSortHelper(startIndex, partitionIndex - 1);
  }

  if (partitionIndex < endIndex) {
    quickSortHelper(partitionIndex, endIndex);
  }
}

function partition(start, end) {
  var pivot = divsSizes[Math.floor((end + start) / 2)];

  while (start <= end) {
    while (divsSizes[start] < pivot) {
      start++;
    }

    while (divsSizes[end] > pivot) {
      end--;
    }

    if (start <= end) {
      var temp = divsSizes[start];
      divsSizes[start] = divsSizes[end];
      divsSizes[end] = temp;
      start++;
      end--;
    }
  }

  return start;
}

function mergeSort() {
  mergeSortHelper(0, arraySize - 1);
  visualizeSort();
}

function mergeSortHelper(start, end) {
  if (start < end) {
    var middle = Math.floor((start + end) / 2);
    mergeSortHelper(start, middle);
    mergeSortHelper(middle + 1, end);
    mergeArrays(start, middle, end);

    visualizeSort();
  }
}

function mergeArrays(start, middle, end) {
  var arr = [];
  var arrIndex = 0;
  var startCopyIndex = start;
  var middleCopyIndex = middle + 1;

  while (startCopyIndex <= middle && middleCopyIndex <= end) {
    if (divsSizes[startCopyIndex] <= divsSizes[middleCopyIndex]) {
      arr[arrIndex] = divsSizes[startCopyIndex];
      startCopyIndex++;
    } else {
      arr[arrIndex] = divsSizes[middleCopyIndex];
      middleCopyIndex++;
    }

    arrIndex++;
  }

  while (startCopyIndex <= middle) {
    arr[arrIndex] = divsSizes[startCopyIndex];
    startCopyIndex++;
    arrIndex++;
  }

  while (middleCopyIndex <= end) {
    arr[arrIndex] = divsSizes[middleCopyIndex];
    middleCopyIndex++;
    arrIndex++;
  }

  for (let i = 0; i < arrIndex; i++) {
    divsSizes[start] = arr[i];
    start++;
  }
}

function sortArray() {
  var sortingAlgo = this.getAttribute("id");

  switch (sortingAlgo) {
    case "quick":
      quickSort();
      break;

    case "Merge":
      mergeSort();
      break;

    case "bubble":
      bubbleSort();
      break;

    case "selection":
      selectionSort();
      break;

    case "insertion":
      insertionSort();
      break;

    case "heap":
      console.log("heyyyyyyy");
      break;

    default:
      break;
  }
}
