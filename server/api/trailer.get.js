import { options, validateID } from "~/data/const.js";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  if (validateID(id)) {
    const trailer = await cachedTrailer(id);
    return trailer.results;
  }
});

const cachedTrailer = cachedFunction(
  async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const trailer = await $fetch(url, options);
    return trailer;
  },
  {
    maxAge: 60 * 60,
    name: "trailer",
    getKey: (id) => id,
  }
);
