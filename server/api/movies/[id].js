import { options } from "~/data/const.js";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const urlDetails = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const movie = await $fetch(urlDetails, options);
  return movie;
});
