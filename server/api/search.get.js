import { $api, validateSearch } from "./helpers";

export default defineEventHandler(async (event) => {
  const { search } = getQuery(event);
  if (validateSearch(search)) {
    const response = await cachedSearch(search);
    return response.results;
  }
});

const cachedSearch = cachedFunction(
  async (search) => {
    const url = `/search/movie?query=${search}&include_adult=false&language=en-US&page=1`;
    const response = await $api(url);
    return response;
  },
  {
    maxAge: 60 * 60,
    name: "singleMovie",
    getKey: (search) => search,
  }
);
