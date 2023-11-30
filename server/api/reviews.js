import { options } from "~/data/const.js";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const urlReviews = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
  const reviews = await $fetch(urlReviews, options);
  return reviews;
});
