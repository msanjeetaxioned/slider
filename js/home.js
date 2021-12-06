document.addEventListener('DOMContentLoaded', (event) => {
    const totalItems = 5;
    let mainContainer = document.querySelector("#main-container");
    let currentItem = 1;
    let previousButton = mainContainer.querySelector(".previous-button");
    let nextButton = mainContainer.querySelector(".next-button");

    let ul = mainContainer.querySelector(".carousel > ul");
    let liList = mainContainer.querySelectorAll(".carousel li");
    let imgList = mainContainer.querySelectorAll(".carousel li img");
    let carouselDotsArray = mainContainer.querySelectorAll(".carousel-buttons span");

    let cloneOfFirst = liList[0].cloneNode(true);
    let cloneOfLast = liList[liList.length-1].cloneNode(true);

    ul.append(cloneOfFirst);
    ul.prepend(cloneOfLast);

    liList = mainContainer.querySelectorAll(".carousel li");
    // Scroll to Actual First Element(ie. 2nd Element in Array after cloning)
    ul.scrollLeft = liList[currentItem].offsetLeft - 50;

    // Remove default drag of img behaviour
    for(let img of imgList) {
        img.addEventListener("dragstart", function(event) {
            event.preventDefault();
        });
    }

    let startX, endX, diffX, minDiff = 100;
    ul.addEventListener("mousedown", function(event) {
        startX = parseInt(event.clientX);
    });

    ul.addEventListener("mouseup", function(event) {
        endX = parseInt(event.clientX);
        diffX = Math.abs(endX-startX);
        if(diffX >= minDiff) {
            if(endX > startX) {
                changeDisplayedItem(true, -1);
            }
            else {
                changeDisplayedItem(true, 1);
            }
        }
    });

    document.addEventListener("keydown", function(event) {
        if(event.key === "ArrowLeft") {
            changeDisplayedItem(true, -1);
        }
        else if(event.key === "ArrowRight") {
            changeDisplayedItem(true, 1);
        }
    })

    previousButton.addEventListener("click", function() {
        changeDisplayedItem(true, -1);
    });

    nextButton.addEventListener("click", function() {
        changeDisplayedItem(true, 1);
    });

    for(let carouselDot of carouselDotsArray) {
        carouselDot.addEventListener("click", function() {
            changeDisplayedItem(false, parseInt(this.getAttribute("data-id")));
        });
    }

    function changeDisplayedItem(onNextPrevClick, number) {
        liList[currentItem].classList.remove("selected");
        carouselDotsArray[currentItem-1].classList.remove("selected");
        if(onNextPrevClick) {
            if(currentItem == 1 && number == -1) {
                currentItem = totalItems;
                horizontalScrollToElement(ul, liList[0].offsetLeft, 400, true);
            }
            else if((currentItem == totalItems) && (number == 1)) {
                currentItem = 1;
                horizontalScrollToElement(ul, liList[liList.length-1].offsetLeft, 400, true);
            }
            else {
                currentItem = currentItem + number;
                horizontalScrollToElement(ul, liList[currentItem].offsetLeft, 400);
            }
        }
        else {
            currentItem = number;
            horizontalScrollToElement(ul, liList[currentItem].offsetLeft, 400);
        }
        liList[currentItem].classList.add("selected");
        carouselDotsArray[currentItem-1].classList.add("selected");
    }

    function horizontalScrollToElement(scrollLayer, destination, duration, callback) {
        if (duration <= 0) {
            if(callback) {
                ul.scrollLeft = liList[currentItem].offsetLeft - 50;
            }
            return;
        }
        const difference = destination - scrollLayer.scrollLeft - 50;
        const perTick = (difference / duration) * 10;
    
        let timeout = setTimeout(function() {
            scrollLayer.scrollLeft = scrollLayer.scrollLeft + perTick;
            if (scrollLayer.scrollLeft === destination) {
                clearTimeout(timeout);
                if(callback) {
                    ul.scrollLeft = liList[currentItem].offsetLeft - 50;
                }
                return;
            }
            horizontalScrollToElement(scrollLayer, destination, duration - 10, callback);
        }, 10);
    }
});