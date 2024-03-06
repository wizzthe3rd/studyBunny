window.onload = () => {
    setUpGraph();
}

const setUpGraph = () => {
    const backBtn = document.querySelector('.study-back-button');
    backBtn.addEventListener('click', () =>{
    window.location.href = "index.html";
    });

    //context
    const ctx = document.getElementById('study-history-chart');
    
    //creating a new chart passing in ID of canvas element
    new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [
            'Mondays', 
            'Tuesdays', 
            'Wednesdays', 
            'Thursdays', 
            'Fridays', 
            'Saturdays', 
            'Sundays'
        ],
        datasets: [{
        label: 'Hours Studied',
        data: [
            localStorage.getItem('Monday'),
            localStorage.getItem('Tuesday'),
            localStorage.getItem('Wednesday'),
            localStorage.getItem('Thursday'),
            localStorage.getItem('Friday'),
            localStorage.getItem('Saturday'),
            localStorage.getItem('Sunday')
        ],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)', 
            'rgba(54, 162, 235, 0.2)', 
            'rgba(255, 206, 86, 0.2)', 
            'rgba(75, 192, 192, 0.2)', 
            'rgba(153, 102, 255, 0.2)', 
            'rgba(255, 159, 64, 0.2)', 
            'rgba(255, 99, 132, 0.2)'], 
            borderColor: [
                'rgba(255, 99, 132, 1)', 
                'rgba(54, 162, 235, 1)', 
                'rgba(255, 206, 86, 1)', 
                'rgba(75, 192, 192, 1)', 
                'rgba(153, 102, 255, 1)', 
                'rgba(255, 159, 64, 1)', 
                'rgba(255, 99, 132, 1)'], 
        borderWidth: 3,
        borderRadius: 5
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                ticks: {
                    color: 'black',
                },
                beginAtZero: true
            },
            x: {
                ticks: {
                color: 'black',
            },
            }
        }
    }
    });

    //changes font for all elements
    Chart.defaults.font.family = "gamja flower";
    Chart.defaults.font.size = 12;
    Chart.defaults.font.weight = 'bold';

}

