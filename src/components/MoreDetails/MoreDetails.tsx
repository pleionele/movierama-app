import React, { useState, useEffect } from 'react';
import { moreDetailsService } from '../../services/moreDetailsService';
import { Config } from '../../config/default';
import './style.scss';
import ReviewList from '../Review/ReviewList';
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
  const [isDisplaying, setDisplay] = useState(true);

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
      {isDisplaying && (
        <div>
          {isloading && <div> Please wait..</div>}
          {!isloading && (
            <div data-testid="moreDetails" className="popup">
              <div data-testid="youtubeVideo" className="popup_inner">
                <h2>More details</h2>
                <button
                  // tslint:disable-next-line: jsx-no-lambda
                  onClick={() => {
                    props.closePopup();
                    setDisplay(false);
                  }}
                >
                  Close me
                </button>
                {/* <iframe src={Config.TrailerUrl + data?.video[0].key} /> */}
                <ReviewList reviews={data?.reviews} />
              </div>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default MoreDetails;
