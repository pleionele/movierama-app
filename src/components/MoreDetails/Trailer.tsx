import * as React from 'react';
import YouTube from 'react-youtube';

export const Trailer = (props: any) => {
  const { data } = props;
  try {
    return (
      <YouTube
        videoId={data.video[0].key}
        containerClassName="acr__item__body"
        className="acr__item__body"
      />
    );
  } catch (e) {
    return <div className="acr__item__body"> No available trailer</div>;
  }
};
