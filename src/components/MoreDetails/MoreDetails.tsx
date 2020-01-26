import React, { useState, useEffect } from 'react';
import { moreDetailsService } from '../../services/moreDetailsService';

// ● Video Trailer (if any)
// ● Reviews (up to 2)
// ● Similar Movies
interface MoreDetailsProps {
  movieId: number;
}
const MoreDetails: React.FC<MoreDetailsProps> = props => {
  //   const [data, setData] = useState();

  useEffect(() => {
    (async function callMoreDetailsService() {
      const results = await moreDetailsService(props.movieId);
      console.log(results);
    })();

    // setData(results.data);
  }, []);
  return (
    <div data-testid="moreDetails">
      <h2>More details</h2>
    </div>
  );
};

export default MoreDetails;
