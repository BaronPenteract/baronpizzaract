import React from 'react';
import ContentLoader from 'react-content-loader';

const SceletonPizzaBlock = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#c3c3c3"
    foregroundColor="#ecebeb"
  >
    <circle cx="141" cy="115" r="115" />
    <rect x="0" y="252" rx="7" ry="7" width="280" height="27" />
    <rect x="2" y="299" rx="7" ry="7" width="280" height="88" />
    <rect x="4" y="417" rx="5" ry="5" width="91" height="27" />
    <rect x="124" y="407" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
);

export default SceletonPizzaBlock;
