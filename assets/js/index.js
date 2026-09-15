import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const homeSection = document.querySelector("#home");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector(".carousel");
const mainContent = document.querySelector(".page__main-content");
const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".decks__list");

function createDeckEl(item) {
  const deckElement = deckTemplate.content
    .querySelector(".deck")
    .cloneNode(true);

  const deckLink = deckElement.querySelector(".deck__link");
  deckLink.href = `#carousel/${item.id}`;
  // Set the deck title

  deckElement.querySelector(".deck__title").textContent = item.name;

  // Set the card count
  deckElement.querySelector(".deck__count").textContent =
    `${item.cards.length} cards`;

  // Set the deck color
  const colorName = hexToString(item.color);

  deckElement.classList.remove("deck_color_green");
  deckElement.classList.add(`deck_color_${colorName}`);

  // Delete button
  const deleteBtn = deckElement.querySelector(".deck__delete-btn");

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
    mainContent.classList.remove("page__main-content_location_carousel");
  } else if (hash.startsWith("#carousel/")) {
    const currentDeckID = hash.split("/")[1];
    const currentDeck = getDeckByID(currentDeckID);

    renderCarouselView(currentDeck);

    homeSection.style.display = "none";
    notFoundSection.style.display = "none";
    carouselSection.style.display = "flex";
    mainContent.classList.add("page__main-content_location_carousel");
  } else {
    homeSection.style.display = "none";
    notFoundSection.style.display = "flex";
    carouselSection.style.display = "none";
    mainContent.classList.remove("page__main-content_location_carousel");
  }
}

decks.forEach(renderDeckEl);

window.addEventListener("hashchange", renderCurrentView);

renderCurrentView();
