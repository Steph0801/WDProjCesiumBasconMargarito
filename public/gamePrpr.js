const base = document.getElementById('base');
const sprites = document.querySelectorAll('.sprite');

const flavors = {
    cheese: ["cheese"],
    pepperoni: ["cheese","pepperoni"],
    hawaiian: ["cheese","ham","pineapple"],
    vegan: ["cheese","mushrooms","olives","onions","pepper"],
};


const layers = {
    cheese: ["../assets/cheeseP.png"],
    pepperoni: ["../assets/cheeseP.png", "../assets/pepperoniP.png"],
    hawaiian: ["../assets/cheeseP.png", "../assets/hw-1.png", "../assets/hawaiian.png"],
    vegan: ["../assets/cheeseP.png", "../assets/vg-1.png", "../assets/vg-2.png", "../assets/vg-3.png", "../assets/vegan.png"]
};
