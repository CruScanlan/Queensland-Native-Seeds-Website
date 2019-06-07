/* eslint-disable react/prop-types, import/prefer-default-export */

// It's not ready yet: https://github.com/gatsbyjs/gatsby/issues/8237.
//
// import React from 'react';
// import withRoot from './src/withRoot';

// const WithRoot = withRoot(props => props.children);

// export const wrapRootElement = ({ element }) => {
//   return <WithRoot key={Math.random()}>{element}</WithRoot>;
// };

exports.shouldUpdateScroll = ({prevRouterProps, routerProps, getSavedScrollPosition }) => {
    if(!prevRouterProps) return true;
    const pathName = routerProps.location.pathname;
    if(pathName === "/plant-profiles") {
        const savedPos = getSavedScrollPosition({ pathname: "/plant-profiles"});
        return savedPos;
    }
    return [0, 0];
}