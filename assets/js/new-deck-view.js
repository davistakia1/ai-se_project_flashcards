import { decks } from "./decks.js";

const newDeckForm = document.querySelector("#new-deck-form");
const submitBtn = newDeckForm.querySelector(".new-deck-view__submit-btn");
const textarea = newDeckForm.querySelector(".new-deck-view__textarea");

export function disableSubmitBtn() {
  submitBtn.disabled = false;
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

function showError(message) {
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
  const id = `${slugify(jsonData.name)}-${Date.now()}`;

  decks.push({
    id,
    color: colorValue,
    name: jsonData.name,
    cards: jsonData.cards,
  });

  window.location.hash = "deck/" + id;
}

newDeckForm.addEventListener("submit", handleNewDeckSubmit);

const errorModal = document.querySelector("#error-modal");
const errorCloseBtn = errorModal.querySelector(".modal__close");
const errorMessage = errorModal.querySelector(".modal__error");

errorCloseBtn.addEventListener("click", function () {
  errorModal.classList.remove("modal_visible");
});
