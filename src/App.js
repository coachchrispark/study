import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
  // Render: componentWillMount() -> render() -> componentDidMount()

  // update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDIdUpdate()

  state = {};

  // 1
  // componentWillMount() {
  //   console.log('will mount');
  // }

  // 3
  componentDidMount() {
    this._getMovies();
  }

  // componentDidMount() {
  //   fetch('https://yts.lt/api/v2/list_movies.json?sort_by=rating')
  //     .then(response => response.json())
  //     .then(json => {
  //       this.setState({
  //         movies: json.data.movies
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }

  // componentDidMount() {
  //   fetch('https://yts.lt/api/v2/list_movies.json?sort_by=download_count')
  //     .then()
  //     .catch(function(err) {
  //       console.log(err);
  //     });
  // }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => (
      // console.log(movie);
      <Movie
        title={movie.title_long}
        poster={movie.medium_cover_image}
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    ));
    return movies;
  };

  // _renderMovies = () => {
  //   const movies = this.state.movies.map(movie => {
  //     // console.log(movie);
  //     return (
  //       <Movie
  //         title={movie.title_long}
  //         poster={movie.medium_cover_image}
  //         key={movie.id}
  //         genres={movie.genres}
  //         synopsis={movie.synopsis}
  //       />
  //     );
  //   });
  //   return movies;
  // };

  // for using Async/Await
  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies // movies : movies
    });
  };

  // return Promises(), Object -> JSON(converting)
  _callApi = () =>
    fetch('https://yts.lt/api/v2/list_movies.json?sort_by=rating')
      .then(response => response.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));

  // 'https://yts.lt/api/v2/list_movies.json?sort_by=download_count'

  // 2
  render() {
    // console.log('did render');
    const { movies } = this.state; // this.state.movies
    return (
      <div className={movies ? 'App' : 'App--loading'}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
