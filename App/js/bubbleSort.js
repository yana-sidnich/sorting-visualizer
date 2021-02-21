function bubbleSort() {
  var isSorted = false;

  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < arraySize - 1; i++) {
      if (divsSizes[i] > divsSizes[i + 1]) {
        visualizeSort(i, "red");
        visualizeSort(i + 1, "red");
        let temp = divsSizes[i];
        divsSizes[i] = divsSizes[i + 1];
        divsSizes[i + 1] = temp;
        isSorted = false;
        visualizeSort(i, "red");
        visualizeSort(i + 1, "red");
      }
    }
  }
}
