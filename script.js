window.onload = () => {
    setUpEventListeners();
}

const setUpEventListeners = () => {
    const weekday = [
        "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
    ];    
    const quoteDisplay = document.querySelector('#quote');
    const timePopUp = document.querySelector('#time-modal');
    const overlay = document.querySelector('#overlay');
    const currencyMessage = document.querySelector('.currency-modal');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuClose = document.querySelector('.menu-close');
    const shopIcon = document.querySelector('.shop-icon');
    const currencyEl = document.querySelector('#currency'); //element to display currency
    const shopModalClose = document.querySelector('.shop-modal-close');
    const coinEL = document.querySelector('.coins');
    const shareEL = document.querySelector('.shareEl');
    const shareContainer = document.querySelector('.share-icon-container');
    const slider = document.querySelector('#rangeEL');//slider variables
    const sliderOutput = document.querySelector('.time-modal-text');
    const playButton = document.querySelector('#play-button');
    const pauseButton = document.querySelector('#pause-button');
    const stopButton = document.querySelector('#stop-button');
    const timeModalSubmit = document.querySelector('.time-modal-submit');
    const timeModalClose = document.querySelector('.time-modal-close');
    const currencyModalClose = document.querySelector('.currency-modal-close');

    if (slider){
        slider.oninput = () =>{
            sliderOutput.innerHTML = slider.value + " minutes";
            slider.addEventListener('input', () => {
                //TODO: properly add gradient to slider
                let x = slider.value;
                let color = 'linear-gradient(90deg, #A885BC ' + x + '%, #BC8C85 ' + x + '%)';
                slider.style.background = color;
            });
        }
    }
    //retrieve currency from local storage
    let existingCurrency = localStorage.getItem('coins');
    //if currency is null, set it to 0
    let currency = existingCurrency ? existingCurrency : 0;
    currencyEl.innerHTML = currency;

    let totalTime = 0;
    let timeInterval;
    let isTimerRunning = false;
    let quoteOfTheDay;

    let studyHistoryInfo = {
        monday: {
            'date': 'Monday',
            'study-time': 0
        },  
        tuesday: {
            'date': 'Tuesday',
            'study-time': 0
        },
        wednesday: {
            'date': 'Wednesday',
            'study-time': 0
        },
        thursday: {
            'date': 'Thursday',
            'study-time': 0
        },
        friday: {
            'date': 'Friday',
            'study-time': 0
        },
        saturday: {
            'date': 'Saturday',
            'study-time': 0
        },
        sunday: {
            'date': 'Sunday',
            'study-time': 0
        }
        }

    //check if study time is stored in local storage
    for (let day in studyHistoryInfo){
        //retrieves study minutes for each day of the week from local storage
        let existingStudyTime = localStorage.getItem(studyHistoryInfo[day]["date"]);
        //if study time is null, set it to 0
        let studyTime = existingStudyTime ? existingStudyTime : 0;

        if (existingStudyTime === null){
            localStorage.setItem(studyHistoryInfo[day]["date"], 0);
        }
    }
    
    //functions
    const startTimer = () => {
            if (totalTime === 0){
                let minutes = slider.value;
                let seconds = 0;
            
                totalTime = (minutes * 60) + seconds; //total time in seconds
            }
        
            let currencyTime = totalTime;
            let historyTime = Math.floor(totalTime / 60);   //saves the inutes to be stored in history localStorage
            timeInterval = setInterval(() => {
                isTimerRunning = true;
                let minutes = Math.floor(totalTime / 60);   //minutes left, math.floor rounds down to the nearest whole number
                let seconds = totalTime % 60;
        
                //checks if min/sec are less than 0 if they are, 0+min/sec else just display min/sec
                let displayMin = (minutes < 10) ? "0" + minutes : minutes;
                let displaySec = (seconds < 10) ? "0" + seconds : seconds;
        
                document.querySelector('.countdown').innerHTML = displayMin + ':' + displaySec;
                if (totalTime <= 0){
                    let amountEarned = Math.floor(currencyTime / 2)
                    currency = parseInt(currency) + amountEarned;
                    let modalContainer = currencyMessage;
                    let modalElement = document.createElement("currencyMessage");
        
                    //store currency in local storage
                    localStorage.setItem('coins', currency);
                    currencyEl.innerHTML = currency;
        
                    //store study info in array, gather day of the week
                    updateHistoryArray(getStudyInfo(historyTime/60));
        
                    if (amountEarned > 0){
                        currencyAnimation(modalContainer, modalElement, amountEarned);
                    }
        
                    clearInterval(timeInterval); //stops timer setInterval
                    document.querySelector('.countdown').innerHTML = "00:00"
                    isTimerRunning = false;
                    //displays play button again
                    switchButtons();
                } else{
                    //decrements time every second
                    totalTime--;
                }
        
        
             }, 10)   // 1000ms = 1s occurs every second
            
    }

    const showTimeModal = () =>{
        timePopUp.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    const toggleShop = () =>{
        document.querySelector('.shop-modal').classList.toggle('active');
        overlay.classList.toggle('active');
    }
    
    const toggleMenu = () =>{
        document.querySelector('.menu').classList.toggle('active');
        overlay.classList.toggle('active');
    }
    const toggleModal = () =>{
        document.querySelector('#time-modal').classList.toggle('active');
        document.querySelector('#overlay').classList.toggle('active');
    }
    
    const toggleCurrencyMessage = () =>{
        currencyMessage.classList.toggle('active');
        overlay.classList.toggle('active');
    }
    
    const currencyAnimation = (container, element, amountEarned) =>{
        toggleCurrencyMessage();
        element.innerHTML += `<h3><span id='coin-logo'></span><span>${amountEarned}</span> kitty kash found!</h3>`;
        container.appendChild(element);
    
        //TODO: add animation to coin
        coinEL.style.animation = 'float 0.6s ease-in-out 1';
        coinEL.addEventListener('animationend', () =>{coinEL.style.animation = ''}//resets animation
        );
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

    const getStudyInfo = (currency) =>{
        let d = new Date();
        let day = weekday[d.getDay];
        let currentStudyInfo = {
            'date': new Date().toLocaleString('en-uk', {  weekday: 'long' }),
            'study-time': currency
        }
        return currentStudyInfo;
    }
    
    const updateHistoryArray = (currentStudyInfo) =>{
        let previousStudyTime = localStorage.getItem(currentStudyInfo["date"]);
        let updatedStudyTime = parseInt(previousStudyTime) + currentStudyInfo["study-time"];

        localStorage.setItem(currentStudyInfo["date"], updatedStudyTime); 
    
    }


    //event listeners
    hamburgerMenu.addEventListener('click', toggleMenu);
    menuClose.addEventListener('click', toggleMenu);
    shopIcon.addEventListener('click', toggleShop);
    shopModalClose.addEventListener('click', toggleShop);
    shareEL.addEventListener('click', () => {
        shareContainer.classList.toggle('active');
    });
    playButton.addEventListener('click', () =>{
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
    pauseButton.addEventListener('click', pauseTimer);
    stopButton.addEventListener('click', () => {
        isTimerRunning = false;
        document.querySelector('.countdown').innerHTML = "00:00"
        totalTime = 0;
        clearInterval(timeInterval);
        switchButtons();
    });
    timeModalSubmit.addEventListener('click', () => {
        startTimer();
        showTimeModal();
        switchButtons();
    });
    timeModalClose.addEventListener('click', showTimeModal);
    currencyModalClose.addEventListener('click', () => {
        toggleCurrencyMessage();
        currencyMessage.removeChild('currencyMessage');
    });
}


//API code to retrieve quote of the day
//object to store study history
// const fetchData = async() =>{
//     const url = 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'a79c202c29msh3d60f4f1a64ce48p1aaa25jsne46a2eeb1e4c',
//             'X-RapidAPI-Host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
//         }
//     };
    
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result);
//         quoteOfTheDay = result.text;
//         document.getElementById('quote').innerHTML = quoteOfTheDay;

//     } catch (error) {
//         console.error(error);
//     }
// }
// //call function to retrieve promise
// fetchData()

//storing and retrieving user currency 



