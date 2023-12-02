import { options } from "~/data/const.js";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { page } = query;
  const response = await cachedMovies(page);
  return response.results;
});

const cachedMovies = cachedFunction(
  async (page) => {
    console.log("~~Unchached Library call~~");
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&page=${page}`;
    const response = await $fetch(url, options);

    return response;
  },
  {
    maxAge: 60 * 60,
    name: "movieLibrary",
    getKey: (page) => page,
  }
);
