/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const basic = css`
  display: flex;
  flex-direction: column;
`;

const VerticalContainer = ({ children }) => <div css={style}>{children}</div>;

export default VerticalContainer;
