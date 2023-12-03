import { $api } from "./helpers";
export default defineEventHandler(async (event) => {
  const { page } = getQuery(event);
  const response = await cachedMovies(page);
  return response.results;
});

const cachedMovies = cachedFunction(
  async (page) => {
    const url = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&page=${page}`;
    const response = await $api(url);

    return response;
  },
  {
    maxAge: 60 * 60,
    name: "movieLibrary",
    getKey: (page) => page,
  }
);
