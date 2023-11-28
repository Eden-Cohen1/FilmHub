const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWQxYzE1YzBmYjk3MzI0OTE2NjQ2ZDMwYTcyZmIzMiIsInN1YiI6IjY0ZWRlYWQ0MDZmOTg0MDBlYjYxNzgxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hFIhicNcXNXZeY4Ic-tejV3K-O6WO38-Q55xDz1UwPg",
  },
};
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  console.log(id);
  const urlDetails = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const urlReviews = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
  const movie = await $fetch(urlDetails, options);
  const reviews = await $fetch(urlReviews, options);
  return { movie, reviews };
});
