const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const linewidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(document.querySelector(".color-option"));
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("mode-erase");
const eraser = document.getElementById("eraser");

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = linewidth.value;

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting == true) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
  ctx.beginPath();
}

function onMouseDown() {
  isPainting = true;
}

function onMouseUp() {
  isPainting = false;
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;
  color.value = event.target.dataset.color;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasFilling() {
  if (isFilling) {
    ctx.fillRect(0, 0, 800, 800);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 800);
}

function onClickErase(event) {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
document.addEventListener("mouseup", onMouseUp);

linewidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
canvas.addEventListener("click", onCanvasFilling);
destroyBtn.addEventListener("click", onDestroyClick);
eraser.addEventListener("click", onClickErase);
