const token = process.env.TOKEN;

export const $api = $fetch.create({
  baseURL: `https://api.themoviedb.org/3`,
  headers: { accept: "application/json", Authorization: `Bearer ${token}` },
});

export const validateID = (id) => id?.length < 11 && id?.length > 2;

export const validateSearch = (search) => search?.length < 30;
