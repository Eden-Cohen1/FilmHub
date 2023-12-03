import { $api, validateID } from "../helpers.js";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  if (validateID(id)) {
    const movie = await cachedSingleMovie(id);
    return movie;
  }
});

const cachedSingleMovie = cachedFunction(
  async (id) => {
    const url = `/movie/${id}?language=en-US`;
    const movie = await $api(url);

    return movie;
  },
  {
    maxAge: 60 * 60,
    name: "singleMovie",
    getKey: (id) => id,
  }
);
