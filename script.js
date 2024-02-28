let currency = 100;
let totalTime = 0;
let timeInterval;
let isTimerRunning = false;
let quoteOfTheDay;
const fetchData = async() =>{
    const url = 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a79c202c29msh3d60f4f1a64ce48p1aaa25jsne46a2eeb1e4c',
            'X-RapidAPI-Host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        quoteOfTheDay = result.text;
        document.getElementById('quote').innerHTML = quoteOfTheDay;

    } catch (error) {
        console.error(error);
    }
}
//call function to retrieve promise
fetchData()

//storing and retrieving user currency 
let userCurrency = localStorage.getItem('carrots');

if (userCurrency){
    let userData = JSON.parse(userCurrency);
} else {
    localStorage.setItem(
        'carrot', 0 
        );
}



const startTimer = () => {
    if (totalTime === 0){
        document.querySelector('.countdown-background').classList.toggle('active')
        let minutes = parseInt(document.getElementById('min-input').value);
        let seconds = parseInt(document.getElementById('sec-input').value);

        //input field is 0 is nothing has been entered
        if (isNaN(minutes)) {
            minutes = 0;
        }
    
        if (isNaN(seconds)) {
            seconds = 0;
        }
    
        totalTime = (minutes * 60) + seconds; //total time in seconds
    }

    let currencyTime = totalTime;
    timeInterval = setInterval(() => {
        isTimerRunning = true;
        let minutes = Math.floor(totalTime / 60);   //minutes left, math.floor rounds down to the nearest whole number
        let seconds = totalTime % 60;

        //checks if min/sec are less than 0 if they are, 0+min/sec else just display min/sec
        let displayMin = (minutes < 10) ? "0" + minutes : minutes;
        let displaySec = (seconds < 10) ? "0" + seconds : seconds;

        document.getElementById('countdown').innerHTML = displayMin + ':' + displaySec;
        if (totalTime <= 0){
            let amountEarned = Math.floor(currencyTime / 2)
            currency+= amountEarned;
            document.getElementById('currency').innerHTML = currency;
            let modalContainer = document.querySelector('.currency-modal');
            let modalElement = document.createElement("currencyMessage");
            if (amountEarned > 0){
                toggleCurrencyMessage();
                modalElement.innerHTML += `<h3><span>${amountEarned}</span> carrots found!</h3>`;
                modalContainer.appendChild(modalElement);
            }

            clearInterval(timeInterval); //stops timer setInterval
            document.getElementById('countdown').innerHTML = "00:00"
            document.querySelector('.countdown-background').classList.toggle('active')
            isTimerRunning = false;
            //displays play button again
            switchButtons();
        } else{
            //decrements time every second
            totalTime--;
        }


     }, 1000)   //occurs every second
    
}


const showTimeModal = () =>{
    document.getElementById('time-modal').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

const toggleShop = () =>{
    document.querySelector('.shop-modal').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

const toggleMenu = () =>{
    document.querySelector('.menu').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}
const toggleModal = () =>{
    document.getElementById('time-modal').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

const toggleCurrencyMessage = () =>{
    document.querySelector('.currency-modal').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

const switchButtons = () =>{
    document.querySelector('.pause-stop-button-container').classList.toggle('active');
    document.querySelector('.play-button-container').classList.toggle('inactive');
}

const pauseTimer = () =>{
    if (isTimerRunning){
        clearInterval(timeInterval);
        isTimerRunning = false;
    } else {
        startTimer(); // Resume the timer only if it's paused
    }
    switchButtons();
}


document.getElementById('currency').innerHTML = currency;

document.querySelector('.shareEl').addEventListener('click', () => {
    document.querySelector('.share-icon-container').classList.toggle('active');
});

document.getElementById('play-button').addEventListener('click', () =>{
    if (isTimerRunning) {
        // If the timer is running, just switch buttons
        switchButtons();
    } else if (totalTime > 0) {
        // If the timer is not running and totalTime is set, resume the timer
        startTimer();
        switchButtons();
    } else {
        // If the timer is not running and totalTime is not set, show the time modal
        showTimeModal();
    }
});

document.querySelector('.hamburger-menu').addEventListener('click', toggleMenu);
document.querySelector('.shop-icon').addEventListener('click', toggleShop);
document.querySelector('.shop-modal-close').addEventListener('click', toggleShop);

document.querySelector('.currency-modal-close').addEventListener('click', () => {
    toggleCurrencyMessage();
    document.querySelector('.currency-modal').removeChild('currencyMessage');
});

document.querySelector('.time-modal-submit').addEventListener('click', () => {
        startTimer();
        showTimeModal();
        switchButtons();
});
document.getElementById('stop-button').addEventListener('click', () => {
    isTimerRunning = false;
    document.querySelector('.countdown-background').classList.toggle('active');
    document.getElementById('countdown').innerHTML = "00:00"
    totalTime = 0;
    clearInterval(timeInterval);
    switchButtons();
});
document.getElementById('pause-button').addEventListener('click', pauseTimer);

