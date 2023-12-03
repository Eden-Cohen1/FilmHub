import { $api, validateID } from "./helpers";
export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  if (validateID(id)) {
    const reviews = await cachedReviews(id);
    return reviews;
  }
});

const cachedReviews = cachedFunction(
  async (id) => {
    const url = `/movie/${id}/reviews?language=en-US&page=1`;
    const review = await $api(url);
    return review;
  },
  {
    maxAge: 60 * 60,
    name: "reviews",
    getKey: (id) => id,
  }
);
