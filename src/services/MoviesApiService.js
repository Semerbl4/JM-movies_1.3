class MoviesApiService {
  getMovies = async (title, page = null) => {
    let currentPage = page;

    if (page) {
      currentPage = `&page=${page}`;
    } else {
      currentPage = ``;
    }

    let movies = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=c33f54366ccf34ec81775c2d46bea63e&query=${title}${currentPage}`
    );
    // console.log(movies)

    if (movies.ok) {
      movies = await movies.json();
      // console.log(movies)
      return movies;
    }

    throw new Error(movies.status);
    // console.log(this.state)
  };
}

export default MoviesApiService;
