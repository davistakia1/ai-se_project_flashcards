export const fetchedDecks = [];

/**
 * Finds a fetched deck by its database ID.
 * @param {string} deckId - The deck's unique ID.
 * @returns {Object|undefined} The matching deck, if found.
 */
export function getDeckByID(deckId) {
  return fetchedDecks.find((deck) => deck._id === deckId);
}
