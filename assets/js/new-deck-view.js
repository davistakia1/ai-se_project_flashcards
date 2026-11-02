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

function handleNewDeckSubmit(e) {
  e.preventDefault();

  const formData = new FormData(newDeckForm);
  const inputValues = Object.fromEntries(formData);

  const jsonData = JSON.parse(inputValues["deck-json"]);
  const color = normalizeColor(inputValues.color);
  const id = `${slugify(jsonData.name)}-${Date.now()}`;

  decks.push({
    id,
    color,
    name: jsonData.name,
    cards: jsonData.cards,
  });

  window.location.hash = "deck/" + id;
}

newDeckForm.addEventListener("submit", handleNewDeckSubmit);
