import { addDeck } from "./api.js";
import { fetchedDecks } from "./decks.js";

const newDeckForm = document.querySelector("#new-deck-form");
const submitBtn = newDeckForm.querySelector(".new-deck-view__submit-btn");
const textarea = newDeckForm.querySelector(".new-deck-view__textarea");

export function disableSubmitBtn() {
  submitBtn.disabled = false;
}

function normalizeColor(value) {
  if (!value) {
    return "#64d583";
  }

  const hex = value.replace(/^#/, "");

  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    return "#64d583";
  }

  return `#${hex.toLowerCase()}`;
}

export function showError(message) {
  errorMessage.textContent = message;
  errorModal.classList.add("modal_visible");
}

function validateName(name) {
  if (typeof name !== "string" || name.length < 2 || name.length > 80) {
    return null;
  }

  return name;
}

function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

function handleNewDeckSubmit(e) {
  e.preventDefault();

  const formData = new FormData(newDeckForm);
  const inputValues = Object.fromEntries(formData);

  const jsonData = parseJSON(inputValues["deck-json"]);

  if (jsonData === null) {
    showError("Invalid JSON. Please check the syntax and try again.");
    return;
  }

  if (validateName(jsonData.name) === null) {
    showError("The deck name must be a string between 2 and 80 characters.");
    return;
  }

  if (!Array.isArray(jsonData.cards)) {
    showError('The deck must contain a "cards" field that is an array.');
    return;
  }

  const colorValue = normalizeColor(inputValues.color);

  if (
    typeof jsonData.color === "string" &&
    jsonData.color.toLowerCase() !== colorValue
  ) {
    showError(
      "The color in your JSON must match the color selected in the color picker.",
    );
    return;
  }
  addDeck({
    name: jsonData.name,
    color: document.querySelector('#new-deck-form input[name="color"]:checked')
      .value,
    cards: jsonData.cards,
  })
    .then((newDeck) => {
      fetchedDecks.push(newDeck);
      window.location.hash = "deck/" + newDeck._id;
    })
    .catch(showError);
}

newDeckForm.addEventListener("submit", handleNewDeckSubmit);

const errorModal = document.querySelector("#error-modal");
const errorCloseBtn = errorModal.querySelector(".modal__close");
const errorMessage = errorModal.querySelector(".modal__error");

errorCloseBtn.addEventListener("click", function () {
  errorModal.classList.remove("modal_visible");
});
