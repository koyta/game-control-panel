import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const PreloaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

function Loading() {
  return (
    <PreloaderContainer>
      <CircularProgress/>
    </PreloaderContainer>
  );
}

export default Loading;
