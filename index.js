let bars_container = document.getElementById("bars_container");
let slider = document.getElementById("slider");
let speed = document.getElementById("speed");
let select_algo = document.getElementById("algo");
let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let stop_btn = document.getElementById("stop_btn");


let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 5;
let speedFactor = 10;
let unsorted_array = new Array(numOfBars);
let stop = false;

slider.addEventListener("input", function () {
    numOfBars = slider.value;
    maxRange = slider.value;
    //console.log(numOfBars);
    bars_container.innerHTML = "";
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
  });
  speed.addEventListener("change", (e) => {
    speedFactor = speed.value;
    // console.log(speedFactor);
  });
  
  let algotouse = "";
  
  select_algo.addEventListener("change", function () {
    algotouse = select_algo.value;
  });
  
  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function createRandomArray() {
    let array = new Array(numOfBars);
    for (let i = 0; i < numOfBars; i++) {
      array[i] = randomNum(minRange, maxRange);
    }
  
    return array;
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
  });
  
  function renderBars(array) {
    if(numOfBars<=15){
        heightFactor= 25;
    }
    else if(numOfBars>15 && numOfBars<30){
        heightFactor= 10;
    }
    else{
        heightFactor = 5;
    }
    for (let i = 0; i < numOfBars; i++) {
      let bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.width = 1000/numOfBars +"px";
      bar.style.height = array[i] * heightFactor + "px";
      bars_container.appendChild(bar);
    }
  }
  
  randomize_array.addEventListener("click", function () {
    unsorted_array = createRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
  });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  let p = 0;
  let q = 0;
  
  async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i=p; i < array.length; i++) {
      for (let j=q; j < array.length - i - 1; j++) {
        bars[j].style.backgroundColor = "yellow";
        if (array[j] > array[j + 1]) {
          for (let k = 0; k < bars.length; k++) {
            if (k !== j && k !== j + 1 && k < bars.length-i) {
              bars[k].style.backgroundColor = "";
            }
          }
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          bars[j].style.height = array[j] * heightFactor + "px";
          bars[j].style.backgroundColor = "red";
          // bars[j].innerText = array[j];
          bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
          bars[j + 1].style.backgroundColor = "red";
          // bars[j + 1].innerText = array[j + 1];
          p=i;
          if(stop){
            q=j;
          }
          else q=0;
          if(stop) break;
          await sleep(speedFactor);
        }
        if(stop) break;
        await sleep(speedFactor);
      }
      await sleep(speedFactor);
      if(!stop) bars[array.length - i-1].style.backgroundColor = "green";
    }
    return array;
  }

  stop_btn.addEventListener("click",function(){
    stop = true;
  })
  // pose_btn.addEventListener("click",function(){
  //   stop = true;
  // })
  sort_btn.addEventListener("click", function () {
    stop = false;
    bubbleSort(unsorted_array);
  });