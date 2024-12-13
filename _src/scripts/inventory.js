import * as player from './player.js';

var inventory = [-1, -1, -1, -1, -1];
const htmlInventory = document.getElementById("inventory");
const stats = document.getElementById("stats");
const inventoryDetails = document.getElementById("inventorySelectedDetails");
const slots = Array.from(htmlInventory.getElementsByClassName("inventorySlot"));
var selectedInventorySlot = 1;

htmlInventory.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === "BUTTON";
    if ((isButton) && (event.target.parentElement.className == "inventorySlot")){
        const index = slots.indexOf(event.target.parentElement);
        slotSelected(index)
        resetGUI()
    }
});

htmlInventory.addEventListener('dblclick', (event) => {
    const isButton = event.target.nodeName === "BUTTON";
    if ((isButton) && (event.target.parentElement.className == "inventorySlot")){
        const index = slots.indexOf(event.target.parentElement);
        if (inventory[index] != -1){
            inventory[index].action()
            inventory[index] = -1
        }
        resetGUI()
    }
});

function changeInventory(_slot, _item){
    inventory[_slot] = _item
    resetGUI()
}

function resetGUI(){
    stats.innerHTML = player.health + "% HEALTH";
    if  (inventory[selectedInventorySlot] != -1){
        inventoryDetails.innerHTML = "Selected Item: " + inventory[selectedInventorySlot].name;
    }
    else{
        inventoryDetails.innerHTML = "Selected Item: Nothing"
    }
    for (let i = 0; i < htmlInventory.childElementCount-1; i++){
        let _buttonSlot = htmlInventory.children[i].querySelector("button")
        if (inventory[i] != -1){
            _buttonSlot.style.backgroundImage = "url(" + inventory[i].sprite + ")";
        }
        else{
            _buttonSlot.style.backgroundImage = ""
        }

        if (i == selectedInventorySlot){
            htmlInventory.children[i].style.border = "1px red solid"
        }
        else{
            htmlInventory.children[i].style.border = "1px white solid"
        }
    }
}

function slotSelected(_elementIndex){
    selectedInventorySlot = _elementIndex
}

export {changeInventory, resetGUI, slotSelected, selectedInventorySlot};