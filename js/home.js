document.addEventListener('DOMContentLoaded', (event) => {
    const totalItems = 5;
    let mainContainer = document.querySelector("#main-container");
    let currentItem = 0;
    let previousButton = mainContainer.querySelector(".previous-button");
    let nextButton = mainContainer.querySelector(".next-button");
    let liList = mainContainer.querySelectorAll(".carousel li");
    let carouselDotsArray = mainContainer.querySelectorAll(".carousel-buttons span");

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
        carouselDotsArray[currentItem].classList.remove("selected");
        if(onNextPrevClick) {
            if(currentItem == 0 && number == -1) {
                currentItem = totalItems - 1;
            }
            else if(currentItem == (totalItems-1) && number == 1) {
                currentItem = 0;
            }
            else {
                currentItem = currentItem + number;
            }
        }
        else {
            currentItem = number;
        }
        liList[currentItem].classList.add("selected");
        carouselDotsArray[currentItem].classList.add("selected");
        liList[currentItem].scrollIntoView({behavior: "smooth"});
    }
});