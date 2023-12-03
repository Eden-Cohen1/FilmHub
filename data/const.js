import { sortByRating, sortByDate, sortByTitle } from "../utils/index.js";

export const radioButtons = [
  { text: "rating", function: sortByRating },
  { text: "date", function: sortByDate },
  { text: "A-Z", function: sortByTitle },
];
