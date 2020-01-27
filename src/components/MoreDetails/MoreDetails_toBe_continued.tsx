import React, { useState, useEffect } from 'react';
import { moreDetailsService } from '../../services/moreDetailsService';
import { Config } from '../../config/default';
import './style.scss';
import ReviewList from '../Review/ReviewList';
import YouTube from 'react-youtube';

// ● Video Trailer (if any)
// ● Reviews (up to 2)
// ● Similar Movies
interface MoreDetailsProps {
  movieId: number;
  closePopup: () => void;
}
const MoreDetails: React.FC<MoreDetailsProps> = props => {
  const [data, setData] = useState();
  const [isloading, setLoading] = useState(true);
  const [active, isactive] = useState(false);
  useEffect(() => {
    (() => {
      let returnedData: any = null;
      moreDetailsService(props.movieId)
        .then(results => {
          console.log(results);
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
    <React.Fragment>
      <div>
        {isloading && <div> Please wait..</div>}
        {!isloading && (
          <section
            className="acr--show"
            id="acr-text"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="acr-label"
            aria-hidden="true"
          >
            <header id="acr-label">More details</header>
            <div className="acr_trailer-container">
              <a>Trailer</a>
              <div>
                <YouTube videoId={data?.video[0].key} />
              </div>
            </div>
            <div className="acr_reviews">
              <a>Reviews</a>
              <ReviewList reviews={data?.reviews} />
            </div>
            <div className="acr_similar">
              <a>Similar Movies</a>
              <ReviewList reviews={data?.reviews} />
            </div>
          </section>
        )}
      </div>
    </React.Fragment>
  );
};

export default MoreDetails;
