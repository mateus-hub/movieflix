// import { ReactComponent as MovieImage } from 'assets/images/movie.svg';
import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import MovieFilter, { MovieFilterData } from 'components/MovieFilter';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const Movies = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: MovieFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getMovies = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: '/movies',
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genre?.id,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="movie-container">
      <MovieFilter onSubmitFilter={handleSubmitFilter} />

      <div className="row">
        {page?.content.map((movies) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={movies.id}>
            <div className="base-card movie-card">
              <Link to={'/movies/' + movies.id.toString()}>
                <div className="card-top-container">
                  <img src={movies.imgUrl} alt={movies.title} />
                </div>
                <div className="card-bottom-container">
                  <h1>{movies.title}</h1>
                  <h2>{movies.year}</h2>
                  <p>{movies.subTitle}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <Pagination
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={handlePageChange}
          forcePage={page?.number}
        />
      </div>
    </div>
  );
};

export default Movies;
