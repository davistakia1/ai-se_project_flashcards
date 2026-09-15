import { hexToString } from "./colors.js";

function removeColorClasses(element) {
  [...element.classList].forEach((className) => {
    if (className.includes("_color_")) {
      element.classList.remove(className);
    }
  });
}

function renderCarouselView(deck) {
  const carouselSection = document.querySelector(".carousel");
  const carouselTitle = document.querySelector(".carousel__title");
  const carouselCard = document.querySelector(".carousel__card");
  const carouselCardText = document.querySelector(".carousel__card-text");
  const flipButton = document.querySelector(".carousel__btn_type_flip");
  const leftButton = document.querySelector(".carousel__btn_type_left");
  const rightButton = document.querySelector(".carousel__btn_type_right");

  carouselSection.style.display = "flex";

  removeColorClasses(carouselCard);

  const colorName = hexToString(deck.color);
  carouselCard.classList.add(`card__carousel_color_${colorName}`);

  let currentIndex = 0;
  let showingQuestion = true;

  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];

    carouselTitle.textContent = `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;

    if (showingQuestion) {
      carouselCardText.textContent = currentCard.question;
      carouselCard.classList.remove("carousel__card_color_white");
    } else {
      carouselCardText.textContent = currentCard.answer;
      carouselCard.classList.add("carousel__card_color_white");
    }

    leftButton.disabled = currentIndex === 0;
    rightButton.disabled = currentIndex === deck.cards.length - 1;
  }

  flipButton.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  });

  rightButton.addEventListener("click", () => {
    currentIndex += 1;
    showingQuestion = true;
    updateDisplay();
  });

  leftButton.addEventListener("click", () => {
    currentIndex -= 1;
    showingQuestion = true;
    updateDisplay();
  });
  updateDisplay();
}

export { renderCarouselView };
