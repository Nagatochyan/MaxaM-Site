"use strict";

let timeoutId, flag = "addition";
const texts = ["", "こ", "こん", "こんに", "こんにち", "こんにちは", "N", "Na", "Nag", "Naga", "Nagat", "Nagato", "Nagatoで", "Nagatoです","🕛", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚"];

const initialLoop = (arr, count = 0) => {
  location.hash = arr[count % arr.length];
  if (count === 0) {
    flag = "addition";
  } else if (count === arr.length - 1) {
    flag = "subtraction";
  }

  timeoutId = setTimeout(
    initialLoop.bind(
      this,
      arr,
      flag === "addition" ? count + 1 : count - 1
    ), 300);
};

const loop = (arr, count = 0, time = 75) => {
  location.hash = arr[count % arr.length];
  timeoutId = setTimeout(loop.bind(this, arr, count + 1, time), time);
};


initialLoop(texts);
window.addEventListener("hashchange", urlAnimations, false);