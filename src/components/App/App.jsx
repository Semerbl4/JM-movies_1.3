import './App.css';
import 'antd/dist/antd.css';

import React from 'react';

import { Alert, Pagination } from 'antd';

import MoviesApiService from '../../services/MoviesApiService';

import Filters from '../Filters/Filters';
import Search from '../Search/Search';
import MoviesList from '../MoviesList/MoviesList';

export default class App extends React.Component {
  moviesApiServise = new MoviesApiService();

  state = {
    movies: null,
    loading: false,
    error: false,
    totalPages: null,
    currentPage: 1,
  };

  online = window.navigator.onLine;

  changeMovies = (title, page) => {
    this.setState((state) => ({
      loading: !state.loading,
      totalPages: null,
    }));

    this.moviesApiServise
      .getMovies(title, page)
      .then((res) => {
        this.setState((state) => ({
          movies: res.results,
          loading: !state.loading,
          totalPages: res.total_pages,
        }));
      })
      .catch((res) => {
        this.setState({ error: res.message });
      });
  };

  setCurrentPage = (page) => {
    // console.log(page)
    this.setState({ currentPage: page });
  };

  render() {
    const { movies } = this.state;
    const { loading } = this.state;
    const { error } = this.state;
    const { totalPages } = this.state;
    const { currentPage } = this.state;

    // console.log(totalPages)

    if (!this.online) {
      return <Alert type="warning" message="Ваш интернет приказал долго жить (Отсутствует соединение сети)" />;
    }

    return (
      <main className="app">
        <Filters />
        <Search changeMovies={this.changeMovies} currentPage={currentPage} />
        {error ? (
          <Alert message={`Произошла ошибка ${error}`} type="error" />
        ) : (
          <MoviesList movies={movies} loading={loading} />
        )}
        {!loading && movies ? (
          <Pagination
            className="pagination"
            defaultCurrent={currentPage}
            total={totalPages * 10}
            showSizeChanger={false}
            onChange={(page) => {
              this.setCurrentPage(page);
            }}
          />
        ) : null}
      </main>
    );
  }
}
