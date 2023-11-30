import { options } from "~/data/const.js";
export default defineEventHandler(async (event) => {
  const { search } = getQuery(event);
  const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`;
  const response = await $fetch(url, options);
  return response.results;
});
