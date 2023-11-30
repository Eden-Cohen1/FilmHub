import { options } from "~/data/const.js";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  // const urlDetails = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const movie = await cachedSingleMovie(id);
  return movie;
});

const cachedSingleMovie = cachedFunction(
  async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const movie = await $fetch(url, options);

    return movie;
  },
  {
    maxAge: 60 * 60,
    name: "singleMovie",
    getKey: (id) => id,
  }
);
