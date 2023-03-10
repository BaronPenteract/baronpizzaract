import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaViewSceleton = (props) => (
  <ContentLoader
    speed={2}
    width={442}
    height={500}
    viewBox="0 0 442 500"
    backgroundColor="#a3a3a3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="221" cy="221" r="221" />
    <rect x="3" y="452" rx="0" ry="0" width="432" height="91" />
  </ContentLoader>
);

export default PizzaViewSceleton;
