export function renderDeckView(deck) {
  const deckTitle = document.querySelector("#deck-view .gallery__title");
  deckTitle.textContent = deck.name;

  const cardList = document.querySelector("#deck-view .gallery__list");
  cardList.innerHTML = "";

  const cardTemplate = document.querySelector("#card-template");

  function createCard(cardData) {
    const cardElement = cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    cardElement.querySelector(".card__title").textContent = cardData.question;
    let showingQuestion = true;
    const deleteBtn = cardElement.querySelector(".card__btn_type_delete");

    const flipBtn = cardElement.querySelector(".card__btn_type_flip");
    flipBtn.addEventListener("click", () => {
      showingQuestion = !showingQuestion;
      cardElement.querySelector(".card__title").textContent = showingQuestion
        ? cardData.question
        : cardData.answer;

      if (showingQuestion) {
        cardElement.classList.remove("card_color_white");
      } else {
        cardElement.classList.add("card_color_white");
      }
    });

    deleteBtn.addEventListener("click", () => {
      cardElement.remove();
    });
    return cardElement;
  }

  deck.cards.forEach((card) => {
    cardList.append(createCard(card));
  });
}
