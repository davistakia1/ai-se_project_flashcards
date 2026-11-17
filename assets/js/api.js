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
