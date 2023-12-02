import { options, validateSearch } from "~/data/const.js";

export default defineEventHandler(async (event) => {
  const { search } = getQuery(event);
  if (validateSearch(search)) {
    const response = await cachedSearch(search);
    return response.results;
  }
});

const cachedSearch = cachedFunction(
  async (search) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`;
    const response = await $fetch(url, options);
    return response;
  },
  {
    maxAge: 60 * 60,
    name: "singleMovie",
    getKey: (search) => search,
  }
);
