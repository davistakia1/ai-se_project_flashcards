import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deck-view.js";

const homeSection = document.querySelector("#home");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector(".carousel");

const deckSection = document.querySelector("#deck-view");
const deckPracticeButton = document.querySelector(
  "#deck-view .gallery__practice-btn",
);

const mainContent = document.querySelector(".page__main-content");
const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".gallery__list");

function createDeckEl(item) {
  const deckElement = deckTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const deckLink = deckElement.querySelector(".card__link");
  deckLink.href = `#deck/${item.id}`;
  // Set the deck title

  deckElement.querySelector(".card__title").textContent = item.name;

  // Set the card count
  deckElement.querySelector(".card__count").textContent =
    `${item.cards.length} cards`;

  // Set the deck color
  const colorName = hexToString(item.color);

  deckElement.classList.remove("card_color_green");
  deckElement.classList.add(`card_color_${colorName}`);

  // Delete button
  const deleteBtn = deckElement.querySelector(".card__btn_type_delete");

  deleteBtn.addEventListener("click", () => {
    deckElement.remove();
  });

  return deckElement;
}

function renderDeckEl(item) {
  const deckElement = createDeckEl(item);

  deckList.prepend(deckElement);
}

function renderCurrentView() {
  const hash = window.location.hash || "#home";

  if (hash === "#home") {
    homeSection.style.display = "block";
    notFoundSection.style.display = "none";
    carouselSection.style.display = "none";
    deckSection.style.display = "none";
    mainContent.classList.remove("page__main-content_location_carousel");
  } else if (hash.startsWith("#carousel/")) {
    const currentDeckID = hash.split("/")[1];
    const currentDeck = getDeckByID(currentDeckID);

    renderCarouselView(currentDeck);

    homeSection.style.display = "none";
    notFoundSection.style.display = "none";
    carouselSection.style.display = "flex";
    deckSection.style.display = "none";
    mainContent.classList.add("page__main-content_location_carousel");
  } else if (hash.startsWith("#deck/")) {
    const currentDeckID = hash.split("/")[1];
    const currentDeck = getDeckByID(currentDeckID);

    renderDeckView(currentDeck);

    deckPracticeButton.onclick = () => {
      window.location.hash = `#carousel/${currentDeck.id}`;
    };

    homeSection.style.display = "none";
    notFoundSection.style.display = "none";
    carouselSection.style.display = "none";
    deckSection.style.display = "block";
  } else {
    homeSection.style.display = "none";
    notFoundSection.style.display = "flex";
    carouselSection.style.display = "none";
    mainContent.classList.remove("page__main-content_location_carousel");
    deckSection.style.display = "none";
  }
}

decks.forEach(renderDeckEl);

window.addEventListener("hashchange", renderCurrentView);

renderCurrentView();
