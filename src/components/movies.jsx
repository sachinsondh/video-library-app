import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import Filtering from "./common/filtering";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 4,
    currentPage: 1,
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  render() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
    } = this.state;
    if (this.state.movies.length === 0)
      return <p>There are no movies in database </p>;

    const filtered = selectedGenre
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);
    return (
      <div>
        <div className="row">
          <div className="col-2">
            <Filtering
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
              allItems={this.state.movies}
            />
          </div>
          <div className="col">
            <p>Showing {filtered.length} movies</p>

            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
                        className="btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
