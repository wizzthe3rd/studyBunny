window.onload = () => {
    setUpTdl();
}

const setUpTdl = () => {
    const backBtn = document.querySelector('.tdl-back-button');
    backBtn.addEventListener('click', () =>{
    window.location.href = "index.html";
});
}

const inputBox = document.getElementById("tdl-input");
const listContainer = document.querySelector(".list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        for (let i = 0; i < listContainer.length; i++) {
            listContainer[i].appendChild(li);
        }
    }
}