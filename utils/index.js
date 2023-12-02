const img_starting_path = "https://image.tmdb.org/t/p/original";

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

//fetching functions
export const fetchLibraryPage = async (page) => {
  const { data } = await useFetch(`/api/movies?page=${page}`, {
    transform: (response) => {
      const movies = [];
      response.forEach((oldMovie) => {
        const movie = {};
        movie.poster_path = oldMovie.poster_path
          ? img_starting_path + oldMovie.poster_path
          : "";
        movie.overview = truncateText(oldMovie.overview, 280);
        movie.title = sliceHeadline(oldMovie.title);
        movie.vote_average = oldMovie.vote_average.toFixed(1);
        movie.release_date = oldMovie.release_date?.split("-")[0];
        movie.id = oldMovie.id;

        movies.push(movie);
      });
      return movies;
    },
  });
  return data.value;
};

export const fetchSearch = async (search) => {
  const { data } = await useFetch(`/api/search?search=${search}`, {
    transform: (response) => {
      const movies = [];
      response.forEach((oldMovie) => {
        const movie = {};
        movie.poster_path = oldMovie.poster_path
          ? img_starting_path + oldMovie.poster_path
          : "";
        movie.overview = truncateText(oldMovie.overview, 280);
        movie.title = sliceHeadline(oldMovie.title);
        movie.vote_average = oldMovie.vote_average.toFixed(1);
        movie.release_date = oldMovie.release_date?.split("-")[0];
        movie.id = oldMovie.id;
        movies.push(movie);
      });
      return movies;
    },
  });
  return data.value;
};

export const fetchSingleMovie = async (id) => {
  const { data } = await useFetch(`/api/movies/${id}`, {
    transform: (response) => {
      const movie = {};
      movie.backdrop_path = img_starting_path + response.backdrop_path;
      movie.poster_path = img_starting_path + response.poster_path;
      movie.title = truncateText(response.title, 55);
      movie.release_date = response.release_date.split("-")[0];
      movie.production_company = response.production_companies[0].name;
      movie.genres = response.genres;
      movie.vote_average = response.vote_average.toFixed(1);
      movie.budget = shortenNumber(response.budget);
      movie.overview = response.overview;
      movie.homepage = response.homepage;
      return movie;
    },
  });
  return data.value;
};

export const fetchReviews = async (id) => {
  const { data } = await useFetch(`/api/reviews/?id=${id}`, {
    transform: (response) => {
      const reviews = [];
      response.results.forEach((rev) => {
        const review = {};
        review.content = rev.content;
        review.avatar = rev.author_details.avatar_path
          ? img_starting_path + rev.author_details.avatar_path
          : "";
        review.author = rev.author;
        review.created_at = rev.created_at.split("T")[0];
        reviews.push(review);
      });
      return reviews;
    },
  });
  return data.value;
};

export const fetchTrailer = async (id) => {
  const { data } = await useFetch(`/api/trailer?id=${id}`, {
    transform: (response) => {
      for (const video of response) {
        if (video.type == "Trailer" && video.type === "YouTube") {
          return video.key;
        }
      }
    },
  });
  return data.value;
};

//notification for unsorder library
export const notifyUnsorted = () => {
  return ElNotification({
    title: "Pay Attention..",
    message: h(
      "i",
      { style: { fontSize: "0.8rem" } },
      "Loaded more videos, Library is unsorted..\n Click to go up 👆"
    ),
    position: "bottom-left",
    duration: 6000,
    onClick: () => {
      window.scrollTo({ top: 0 });
    },
  });
};
