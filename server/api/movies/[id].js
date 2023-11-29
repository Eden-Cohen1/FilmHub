const token = process.env.TOKEN;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const urlDetails = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const urlReviews = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
  const movie = await $fetch(urlDetails, options);
  const reviews = await $fetch(urlReviews, options);
  return { movie, reviews };
});
