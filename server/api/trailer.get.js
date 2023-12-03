import { $api, validateID } from "./helpers";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  if (validateID(id)) {
    const trailer = await cachedTrailer(id);
    return trailer.results;
  }
});

const cachedTrailer = cachedFunction(
  async (id) => {
    const url = `/movie/${id}/videos?language=en-US`;
    const trailer = await $api(url);
    return trailer;
  },
  {
    maxAge: 60 * 60,
    name: "trailer",
    getKey: (id) => id,
  }
);
