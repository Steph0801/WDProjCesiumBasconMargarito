let dragged;
const base = document.getElementById('base');
const sprites = document.querySelectorAll('.sprite');

sprites.forEach(sprite => {
    sprite.addEventListener("drag", (e) => {
        console.log("dragging");
    })
    sprite.addEventListener("dragstart", (e) => {
        console.log("Drag is starting");
    })
    sprite.addEventListener("dragend", (e) => {
        console.log("Drag ended");
    })
});