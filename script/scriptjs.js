'use strict';
// Get Elemnts by id

//Declare all Variables what i wants to use it

var arrayAllMallPics = [];
var leftPicImg = document.getElementById('left_pic_img');
var midPictImg = document.getElementById('mid_pic_img');
var rightPictImg = document.getElementById('right_pic_img');
var leftPicText = document.getElementById('left_pic_h2');
var midPicText = document.getElementById('mid_pic_h2');
var rightPicText = document.getElementById('right_pic_h2');
var mallSection = document.getElementById('mallAllPics');
var trialsleft = 25;
var clearDataBtn = document.getElementById('clearLocalStorage');
var shownImages = [];
var picCanvas = document.getElementById('picChart').getContext('2d');
// End Declaration

var productsArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

for (let index = 0; index < productsArray.length; index++) {

    new MallPics(productsArray[index]);

}
//Constructor
function MallPics(image) {
    this.name = image.split('.')[0];
    this.url = 'Img/' + image;
    this.counter = 0;
    this.timeShow = 0;
    arrayAllMallPics.push(this);

}
//saving data to localStorage: setItem
function storeData() {

    localStorage.setItem('order', JSON.stringify(arrayAllMallPics));

}
// Clear data in localStorage
function clearLocalStorage() {

    localStorage.clear();

    arrayAllMallPics = [];

    renderChart();
}

function checkAndRestore() {

    if (localStorage.length > 0) { // check if the local storage has any values in it
        arrayAllMallPics = JSON.parse(localStorage.getItem('order')); // restore the data from the local storage
        // renderChart();

    }

}

function renderMallPicst(leftImage, midImage, rightImage) {
    leftPicImg.setAttribute('src', arrayAllMallPics[leftImage].url);
    midPictImg.setAttribute('src', arrayAllMallPics[midImage].url);
    rightPictImg.setAttribute('src', arrayAllMallPics[rightImage].url);

    leftPicText.textContent = arrayAllMallPics[leftImage].name;
    midPicText.textContent = arrayAllMallPics[midImage].name;
    rightPicText.textContent = arrayAllMallPics[rightImage].name;

    arrayAllMallPics[leftImage].timeShow++;
    arrayAllMallPics[midImage].timeShow++;
    arrayAllMallPics[rightImage].timeShow++;

    console.log(arrayAllMallPics);
}

function pickAMall() {
    //will randomly generate three unique product images

    do {
        var leftImage = Math.round(Math.random() * (arrayAllMallPics.length - 1))
        var leftPicImageName = arrayAllMallPics[leftImage].name;
    } while (checkAvailability(leftPicImageName));

    do {
        var midImage = Math.round(Math.random() * (arrayAllMallPics.length - 1))
        var midPicImageName = arrayAllMallPics[midImage].name;
    } while (midImage === leftImage || checkAvailability(midPicImageName));

    do {
        var rightImage = Math.round(Math.random() * (arrayAllMallPics.length - 1))
        var rightPicImageName = arrayAllMallPics[rightImage].name;
    } while (leftImage === rightImage || midImage === rightImage || checkAvailability(rightPicImageName));


    shownImages = [];

    shownImages.push(
        arrayAllMallPics[leftImage],
        arrayAllMallPics[midImage],
        arrayAllMallPics[rightImage]
    )
    renderMallPicst(leftImage, midImage, rightImage)
    //Calling function when know no images repeated
}

function checkMallPic(objectIndicator) {
    for (var index = 0; index < arrayAllMallPics.length; index++) {
        if (arrayAllMallPics[index].url === objectIndicator) {
            arrayAllMallPics[index].counter++;
            trialsleft--;
        }
    }
}
//new MallPics('wine-glass', 'wine-glass.jpg');
pickAMall();
clearDataBtn.addEventListener('click', clearLocalStorage);
checkAndRestore();

mallSection.addEventListener('click', countImg);
function countImg(event) {
    var targetId = event.target.id;
    // console.log(targetId);
    if (trialsleft !== 0) { // we are checking if the user has trials left
        if (targetId === 'left_pic_img' || targetId === 'right_pic_img' || targetId === 'mid_pic_img') { // we are checking if the user clicked on the correct image
            var objectIndicator = event.target.getAttribute('src');
            checkMallPic(objectIndicator);
            // numberShown(objectIndicator);
            pickAMall();

        }
    } else {
        mallSection.removeEventListener('click', countImg);

        renderChart();
        storeData();

    }
}

function numberShown(objectIndicator) {
    for (let i = 0; i < arrayAllMallPics.length; i++) {
        if (arrayAllMallPics[i].url === objectIndicator) {
            arrayAllMallPics[i].timeShow++;

        }
    }

}

var results = document.getElementById("results");
var ul = document.createElement("ul");
var section = document.getElementById("getLst");
results.addEventListener("click", function () {
    ul.innerHTML = "";

    for (let i = 0; i < arrayAllMallPics.length; i++) {

        var li = document.createElement("li");
        //li.textContent =  + " / " + "counter: " + arrayAllMallPics[i].counter + " / " + "Time shown: " + arrayAllMallPics[i].timeShow;

        li.textContent = `${arrayAllMallPics[i].name} counter: ${arrayAllMallPics[i].counter} Time shown: ${arrayAllMallPics[i].timeShow}`;

        ul.appendChild(li);
    }

    section.appendChild(ul);
});


//Render Chart Here 
function renderChart() {

    var arrayOfPicNames = [];
    var arrayOfPicCount = [];
    var arrayOfPicShown = [];


    for (var index = 0; index < arrayAllMallPics.length; index++) {
        arrayOfPicNames.push(arrayAllMallPics[index].name);
        arrayOfPicCount.push(arrayAllMallPics[index].counter);
        arrayOfPicShown.push(arrayAllMallPics[index].timeShow);
    }

    var myChart = new Chart(picCanvas, {
        type: 'bar',
        data: {
            labels: arrayOfPicNames, // array of labels (names of the goats)
            datasets: [
                {
                    label: '# of Pics Clicks',
                    data: arrayOfPicCount, // array of values (count for each goat when it was clicked)
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Time shown for the Pics',
                    data: arrayOfPicShown, // array of values (count for each goat when it was clicked)
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
function checkAvailability(selectedPicName) {

    for (var index = 0; index < shownImages.length; index++) {
        if (shownImages[index].name === selectedPicName) {
            return true;
        }
    }
    return false;
}

