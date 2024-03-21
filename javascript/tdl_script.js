window.onload = () => {
    setUpTdl();
}

const setUpTdl = () => {
    const backBtn = document.querySelector('.tdl-back-button');
    backBtn.addEventListener('click', () =>{
    window.location.href = "index.html";
});
}