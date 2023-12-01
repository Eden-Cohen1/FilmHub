import { sortByRating, sortByDate, sortByTitle } from "../utils/index.js";
const token = process.env.TOKEN;
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const radioButtons = [
  { text: "rating", function: sortByRating },
  { text: "date", function: sortByDate },
  { text: "A-Z", function: sortByTitle },
];

export const validateID = (id) => id?.length < 10 && id?.length > 2;
export const validateSearch = (search) => search?.length < 30;
