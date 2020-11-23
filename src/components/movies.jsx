import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import Filtering from "./common/filtering";
import { paginate } from "../utils/paginate";
import MoviesTable from "./movies-table";
import _ from "lodash";
import SearchBox from "./common/searchbox";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
    } = this.state;
    let filtered = selectedGenre
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      sortColumn,
      searchQuery,
    } = this.state;
    if (this.state.movies.length === 0)
      return <p>There are no movies in database </p>;

    const { totalCount, movies } = this.getPagedData();
    return (
      <div>
        <div className="row">
          <div className="col-2">
            <Filtering
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
              allItems={allMovies}
            />
          </div>
          <div className="col">
            <button
              onClick={() => this.props.history.push("/movies/new")}
              className="btn btn-primary"
            >
              New Movie
            </button>
            <p>Showing {totalCount} movies</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              onDelete={this.handleDelete}
              movies={movies}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
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
