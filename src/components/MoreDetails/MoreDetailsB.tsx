import React, { useState, useEffect, Children } from 'react';
import { moreDetailsService } from '../../services/moreDetailsService';
import { Config } from '../../config/default';
import './style.scss';
import ReviewList from '../Review/ReviewList';
import YouTube from 'react-youtube';
import { MovieItem } from '../Movie/Movie';

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
  const [accordion, setAccordion] = useState([
    {
      id: 0,
      open: false,
    },
    {
      id: 1,
      open: false,
    },
  ]);

  const toggleTabs = (index: number) => {
    setAccordion(
      accordion.map((item, i) => {
        console.log('in here ', item, i);

        if (i === index) {
          item.open = !item.open;
        } else {
          item.open = false;
        }
        return item;
      })
    );
  };

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
            <section
            // aria-labelledby="acr-label" aria-hidden="true"
            >
              <header id="acr-label">More details</header>
              <div className="acr__container">
                <div
                  className={'acr__item ' + (accordion[0].open ? 'open' : '')}
                  onClick={e => {
                    e.stopPropagation();
                    console.log('aaa');
                    toggleTabs(0);
                  }}
                >
                  <div className="acr__item__header">Trailer</div>
                  {/* <YouTube videoId={data?.video[0].key} /> */}
                  <div className="acr__item__body">Hello1</div>
                </div>
                <div
                  onClick={e => {
                    e.stopPropagation();
                    console.log('bbb');
                    toggleTabs(1);
                  }}
                  className={'acr__item ' + (accordion[1].open ? 'open' : '')}
                >
                  <div className="acr__item__header">Reviews</div>
                  {/* <YouTube videoId={data?.video[0].key} /> */}
                  <div className="acr__item__body">Hello12</div>
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
