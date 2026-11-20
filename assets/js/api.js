const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";
const token = "01a1e6f9-4369-761d-ab89-bd6472b14a58";
const headers = {
  "Content-Type": "application/json",
  Authorization: token,
};

function processResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}

export function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers }).then(processResponse);
}
export function deleteDeck(deckId) {
  return fetch(`${baseUrl}/decks/${deckId}`, {
    method: "DELETE",
    headers,
  }).then(processResponse);
}
export function addDeck({ name, color, cards }) {
  return fetch(`${baseUrl}/decks`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, color, cards }),
  })
    .then(processResponse)
    .then((newDeck) => {
      return getDecks().then((decks) => {
        const savedDeck = decks.find((deck) => deck._id === newDeck._id);

        if (!savedDeck) {
          return Promise.reject("Could not load the newly created deck.");
        }

        return savedDeck;
      });
    });
}
