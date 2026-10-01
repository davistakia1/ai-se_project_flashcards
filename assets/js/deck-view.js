export function renderDeckView(deck) {
  const deckTitle = document.querySelector(".gallery__title");
  deckTitle.textContent = deck.name;

  const cardList = document.querySelector(".gallery__list");
  cardList.innerHTML = "";

  const cardTemplate = document.querySelector("#card-template");

  function createCard(cardData) {
    const cardElement = cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    cardElement.querySelector(".card__title").textContent = cardData.question;
    return cardElement;
  }

  console.log(deck);
}
