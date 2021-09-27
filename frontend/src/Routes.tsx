import { Router, Switch, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Navbar from 'components/Navbar';
import MoviesDetails from 'pages/MoviesDetails';
import history from 'util/history';
import Movie from 'pages/Movies';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/movies" exact>
        <Movie />
      </Route>
      <Route path="/movies/:movieId">
        <MoviesDetails />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
