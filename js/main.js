const canvas = document.getElementById("canvas");
const body = document.querySelector("body");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let theColor = '#000000'; // Default color
let lineW = 5;
let prevX = null;
let prevY = null;
let draw = false;

body.style.backgroundColor = "#FFFFFF"; // Fixed background color
const theInput = document.getElementById("favcolor");

theInput.addEventListener("input", function(){
    theColor = theInput.value;
    body.style.backgroundColor = theColor;
}, false);

const ctx = canvas.getContext("2d");
ctx.lineWidth = lineW;
ctx.strokeStyle = theColor; // Default stroke style

const ageInput = document.getElementById("ageinputId");
ageInput.addEventListener("input", function(){
    lineW = Number(ageInput.value); // Ensure it's a number
    document.getElementById("ageOutputId").innerHTML = lineW;
    ctx.lineWidth = lineW;
});

const clrs = Array.from(document.querySelectorAll(".clr"));
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr;
    });
});

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
    const data = canvas.toDataURL("image/png"); // Fixed MIME type
    const a = document.createElement("a");
    a.href = data;
    a.download = "sketch.png";
    a.click();
});

window.addEventListener("mousedown", () => draw = true);
window.addEventListener("mouseup", () => draw = false);

window.addEventListener("mousemove", (e) => {
    if (!draw) return;

    if (prevX === null || prevY === null) {
        prevX = e.clientX;
        prevY = e.clientY;
        return;
    } 

    const currentX = e.clientX;
    const currentY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    prevX = currentX;
    prevY = currentY;
});



