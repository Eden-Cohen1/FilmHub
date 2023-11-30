import { options } from "~/data/const.js";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const reviews = await cachedReviews(id);
  return reviews;
});

const cachedReviews = cachedFunction(
  async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
    const review = await $fetch(url, options);
    return review;
  },
  {
    maxAge: 60 * 60,
    name: "reviews",
    getKey: (id) => id,
  }
);
