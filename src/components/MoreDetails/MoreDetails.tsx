import React, { Fragment, useEffect, useState } from 'react';
import { moreDetailsService } from '../../services/moreDetailsService';
import './MoreDetails.scss';
import ReviewList from '../Review/ReviewList';
import { SimilarMoviesList } from '../SimilarMovies/SimilarMovies';
import { Trailer } from './Trailer';

interface MoreDetailsProps {
  movieId: number;
}
const MoreDetails: React.FC<MoreDetailsProps> = props => {
  const [data, setData] = useState();
  const [isloading, setLoading] = useState(true);
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
  const ToggleEventHandler = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    toggleTabs(index);
  };

  useEffect(() => {
    (() => {
      let returnedData: any = null;
      moreDetailsService(props.movieId)
        .then(results => {
          returnedData = results;
        })
        .catch(error => console.log(error))
        .finally(() => {
          setData(returnedData);
          setLoading(false);
        });
    })();
  }, []);

  return (
    <Fragment>
      {isloading && <div> Please wait..</div>}
      {!isloading && (
        <section>
          <header id="acr-label">More details</header>
          <div className="acr__container">
            <div
              className={'acr__item ' + (accordion[0].open ? 'open' : '')}
              // tslint:disable-next-line: jsx-no-lambda
              onClick={e => ToggleEventHandler(e, 0)}
              data-testid="youtubeTrailer"
            >
              <div className="acr__item__header">Trailer</div>
              <Trailer data={data} />
            </div>
            <div
              // tslint:disable-next-line: jsx-no-lambda
              onClick={e => ToggleEventHandler(e, 1)}
              className={'acr__item ' + (accordion[1].open ? 'open' : '')}
              data-testid="reviewsList"
            >
              <div className="acr__item__header">Reviews</div>
              <div className="acr__item__body">
                <ReviewList reviews={data.reviews} />
              </div>
            </div>
            <div
              // tslint:disable-next-line: jsx-no-lambda
              onClick={e => ToggleEventHandler(e, 2)}
              className={'acr__item ' + (accordion[2].open ? 'open' : '')}
              data-testid="similarMovies"
            >
              <div className="acr__item__header">Similar Movies</div>
              <div className="acr__item__body">
                <SimilarMoviesList movies={data.similarMovies} />
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default MoreDetails;
