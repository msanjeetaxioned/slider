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
        console.log(liList);
        if(onNextPrevClick) {
            if(currentItem == 0 && number == -1) {
                liList[currentItem].classList.remove("selected");
                carouselDotsArray[currentItem].classList.remove("selected");
                currentItem = totalItems - 1;
                liList[currentItem].classList.add("selected");
                carouselDotsArray[currentItem].classList.add("selected");
                liList[currentItem].scrollIntoView({behavior: "smooth"});
                return;
            }
            if(currentItem == (totalItems-1) && number == 1) {
                liList[currentItem].classList.remove("selected");
                carouselDotsArray[currentItem].classList.remove("selected");
                currentItem = 0;
                liList[currentItem].classList.add("selected");
                carouselDotsArray[currentItem].classList.add("selected");
                liList[currentItem].scrollIntoView({behavior: "smooth"});
                return;
            }
            liList[currentItem].classList.remove("selected");
            carouselDotsArray[currentItem].classList.remove("selected");
            currentItem = currentItem + number;
            liList[currentItem].classList.add("selected");
            carouselDotsArray[currentItem].classList.add("selected");
            liList[currentItem].scrollIntoView({behavior: "smooth"});
        }
        else {
            liList[currentItem].classList.remove("selected");
            carouselDotsArray[currentItem].classList.remove("selected");
            currentItem = number;
            liList[number].classList.add("selected");
            carouselDotsArray[currentItem].classList.add("selected");
            liList[currentItem].scrollIntoView({behavior: "smooth"});
        }
    }
});