import { AxiosRequestConfig } from 'axios';
import ReviewCard from 'components/ReviewCard';
import ReviewInputCard from 'components/ReviewInputCard';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { Review } from 'types/review';
import { requestBackend } from 'util/requests';
import { hasAnyRoles } from 'util/auth';
import { Movie } from 'types/movie';

import './styles.css';

type UrlParams = {
  movieId: string;
};

type reviewList = Review[];

export const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();
  const [movie, setMovie] = useState<Movie>();
  const [reviewList, setReviewList] = useState<reviewList>();

  const returnMovie = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  const returnReviews = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setReviewList(response.data);
    });
  }, [movieId]);

  useEffect(() => {
    returnMovie();
    returnReviews();
  }, [returnReviews, returnMovie]);

  return (
    <div className="movie-details-container">
      <div className="base-card movie-card-container">
        <div className="img-container">
          <img src={movie?.imgUrl} alt={movie?.title} />
        </div>
        <div className="movie-info-container">
          <h1>{movie?.title}</h1>
          <h3>{movie?.year}</h3>
          <h5>{movie?.subTitle}</h5>
          <div className="synopsis-container">
            <p>{movie?.synopsis}</p>
          </div>
        </div>
      </div>

      {hasAnyRoles(['ROLE_MEMBER']) && (
        <div className="review-input-card">
          <ReviewInputCard movieId={movieId} insertReview={returnReviews} />
        </div>
      )}

      <div className="base-card coments-container">
        <div className="reviews-content-container">
          {reviewList?.map((reviews) => (
            <ReviewCard review={reviews} key={reviews.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
