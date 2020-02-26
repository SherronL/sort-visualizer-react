import React from "react";
import { getMergeSortAnimations } from "../Algorithms/MergeSort.js";
import "./SortVisualizer.css";

// constants
const ANIMATION_SPEED_MS = 1;
const ARRAY_SIZE = 300;
const PRIMARY_COLOR = "#3f7cc0";
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.reset();
  }

  // generates new array
  reset() {
    const array = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  mergeSort() {
    const mergeSortAnimations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < mergeSortAnimations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = mergeSortAnimations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = mergeSortAnimations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the mergeSortAnimations (as they currently do), then
  // this method will be broken.

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        <button className="button" onClick={() => this.reset()}>
          Generate New Array
        </button>
        <button className="button" onClick={() => this.mergeSort()}>
          Merge Sort
        </button>
        <button className="button" onClick={() => this.quickSort()}>
          Quick Sort
        </button>
        <button className="button" onClick={() => this.heapSort()}>
          Heap Sort
        </button>
        <button className="button" onClick={() => this.bubbleSort()}>
          Bubble Sort
        </button>
        <div>
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
