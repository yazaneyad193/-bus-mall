'use strict';
// Get Elemnts by id

var arrryAllMallPics = [];

var leftPicImg = document.getElementById('left_pic_img');
var midPictImg = document.getElementById('mid_pic_img');
var rightPictImg = document.getElementById('right_pic_img');
var leftPicText = document.getElementById('left_pic_h2');
var midPicText = document.getElementById('mid_pic_h2');
var rightPicText = document.getElementById('right_pic_h2');
var mallSection = document.getElementById('mallAllPics');
var trialsleft = 5;
// End Declaration

//Constructor
function MallPics(name, image) {
    this.image = image;
    this.name = name;
    this.url = 'assets/' + image;
    this.counter = 0;
    this.timeShow = 0;

    arrryAllMallPics.push(this);
}


function renderMallPicst(leftImage, midImage, rightImage) {
    leftPicImg.setAttribute('src', arrryAllMallPics[leftImage].url);
    midPictImg.setAttribute('src', arrryAllMallPics[midImage].url);
    rightPictImg.setAttribute('src', arrryAllMallPics[rightImage].url);

    leftPicText.textContent = arrryAllMallPics[leftImage].name;
    midPicText.textContent = arrryAllMallPics[midImage].name;
    rightPicText.textContent = arrryAllMallPics[rightImage].name;

}


function pickAMall() {
    do {
        var leftImage = Math.round(Math.random() * (arrryAllMallPics.length - 1));
        var midImage = Math.round(Math.random() * (arrryAllMallPics.length - 1));
        var rightImage = Math.round(Math.random() * (arrryAllMallPics.length - 1))
    } while (leftImage === midImage || leftImage === rightImage || midImage === rightImage);
    console.log(leftImage);
    console.log(rightImage);
    console.log(midImage);
    renderMallPicst(leftImage, midImage, rightImage)
}


function checkMallPic(objectIndicator) {
    for (var index = 0; index < arrryAllMallPics.length; index++) {
        if (arrryAllMallPics[index].url === objectIndicator) {
            arrryAllMallPics[index].counter++;
            trialsleft--;
        }
    }
}
new MallPics('bag', 'bag.jpg');
new MallPics('banana', 'banana.jpg');
new MallPics('boots', 'boots.jpg');
new MallPics('chair', 'chair.jpg');
new MallPics('pen', 'pen.jpg');

pickAMall();
mallSection.addEventListener('click', countGoats);

function countGoats(event) {
    var targetId = event.target.id;
    // console.log(targetId);
    if (trialsleft !== 0) { // we are checking if the user has trials left
        if (targetId === 'left_pic_img' || targetId === 'right_pic_img' || targetId === 'mid_pic_img') { // we are checking if the user clicked on the correct image
            var objectIndicator = event.target.getAttribute('src');
            checkMallPic(objectIndicator);
            pickAMall();


        }

    } else {
        mallSection.removeEventListener('click', countGoats);
        console.log(arrayOfGoats);
    }
}



var results = document.getElementById("results");

results.addEventListener("click", function () {
    var ul = document.createElement("ul");
    var section = document.getElementById("getLst");
    section.appendChild(ul);
    for (let i = 0; i < 20; i++) {
        var li = document.createElement("li");
        li.textContent = arrryAllMallPics[i].name + " / " + "counter: " + arrryAllMallPics[i].counter + " / " + "Time shown: " + arrryAllMallPics[i].timeShow;
        ul.appendChild(li);
    }
});
