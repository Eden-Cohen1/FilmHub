//make number in a 19B / 19M / 19K Format
export const shortenNumber = (number) => {
  const billion = 1e9;
  const million = 1e6;
  const thousand = 1e3;

  if (number >= billion) {
    return (number / billion).toFixed(1) + "B";
  } else if (number >= million) {
    return (number / million).toFixed(1) + "M";
  } else if (number >= thousand) {
    return (number / thousand).toFixed(1) + "K";
  } else {
    return number.toString();
  }
};

//cut description text to a maximum length
export const truncateText = (text, maxLength) => {
  if (text?.length > maxLength) {
    return text?.slice(0, maxLength) + "...";
  }
  return text;
};

//shorten headline for films whith too long of an headline
export const sliceHeadline = (headline) => {
  const newHead = headline.split(":");
  if (headline?.length < 30 || newHead.length === 1) {
    return headline;
  }
  return newHead[0];
};

//sorting functions

export const sortByRating = (movies) => {
  const movieList = movies.sort((a, b) => b.vote_average - a.vote_average);
  console.log(movieList);
  movies = movieList;
};

export const sortByDate = (movies) => {
  const movieList = movies.sort((a, b) => {
    return new Date(b.release_date) - new Date(a.release_date);
  });
  movies = movieList;
};

export const sortByTitle = (movies) => {
  const movieList = movies.sort((a, b) => a.title.localeCompare(b.title));
  movies = movieList;
};
