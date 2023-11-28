const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWQxYzE1YzBmYjk3MzI0OTE2NjQ2ZDMwYTcyZmIzMiIsInN1YiI6IjY0ZWRlYWQ0MDZmOTg0MDBlYjYxNzgxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hFIhicNcXNXZeY4Ic-tejV3K-O6WO38-Q55xDz1UwPg";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { page } = query;
  console.log(page);
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&page=${page}`;

  const response = await $fetch(url, options);
  return response;
});
