import { options, validateID } from "~/data/const.js";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  if (validateID(id)) {
    const reviews = await cachedReviews(id);
    return reviews;
  }
});

const cachedReviews = cachedFunction(
  async (id) => {
    console.log("~~Unchached reviews call~~");
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
