const token = process.env.TOKEN;
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
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&page=${page}`;

  const response = await $fetch(url, options);
  return response;
});
