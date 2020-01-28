import React, { useState, useEffect } from 'react';
import { moreDetailsService } from '../../services/moreDetailsService';
import './MoreDetails.scss';
import ReviewList from '../Review/ReviewList';
import YouTube from 'react-youtube';
import { SimilarMoviesList } from '../SimilarMovies/SimilarMovies';

interface MoreDetailsProps {
  movieId: number;
  closePopup: () => void;
}
const MoreDetails: React.FC<MoreDetailsProps> = props => {
  const [data, setData] = useState();
  const [isloading, setLoading] = useState(true);
  const [isDisplaying, setDisplay] = useState(true);
  const [accordion, setAccordion] = useState([
    {
      id: 0,
      open: false,
    },
    {
      id: 1,
      open: false,
    },
    {
      id: 2,
      open: false,
    },
  ]);

  const toggleTabs = (index: number) => {
    setAccordion(
      accordion.map((item, i) => {
        if (i === index) {
          item.open = !item.open;
        } else {
          item.open = false;
        }
        return item;
      })
    );
  };
  const toggleTrailer = () => {
    toggleTabs(0);
  };

  const toggleReviews = () => {
    toggleTabs(1);
  };

  const toggleSimilarMovies = () => {
    toggleTabs(2);
  };

  useEffect(() => {
    (() => {
      let returnedData: any = null;
      moreDetailsService(props.movieId)
        .then(results => {
          returnedData = results;
        })
        // tslint:disable-next-line: no-console
        .catch(error => console.log(error))
        .finally(() => {
          console.log(returnedData);
          setData(returnedData);
          setLoading(false);
        });
    })();
  }, []);

  return (
    <React.Fragment>
      {isDisplaying && (
        <div>
          {isloading && <div> Please wait..</div>}
          {!isloading && (
            <section>
              <header id="acr-label">More details</header>
              <div className="acr__container">
                <div
                  className={'acr__item ' + (accordion[0].open ? 'open' : '')}
                  onClick={toggleTrailer}
                >
                  <div className="acr__item__header">Trailer</div>
                  <YouTube
                    videoId={data?.video[0].key}
                    containerClassName="acr__item__body"
                    className="acr__item__body"
                  />
                </div>
                <div
                  onClick={toggleReviews}
                  className={'acr__item ' + (accordion[1].open ? 'open' : '')}
                >
                  <div className="acr__item__header">Reviews</div>
                  <div className="acr__item__body">
                    <ReviewList reviews={data?.reviews} />
                  </div>
                </div>
                <div
                  onClick={toggleSimilarMovies}
                  className={'acr__item ' + (accordion[2].open ? 'open' : '')}
                >
                  <div className="acr__item__header">Similar Movies</div>
                  <div className="acr__item__body">
                    <SimilarMoviesList movies={data?.similarMovies} />
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default MoreDetails;
