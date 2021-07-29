import { css } from '@emotion/react';
import { ReactNode } from 'react';

import { primaryTextStyles } from '../../shared/styles';

interface LayoutProps {
  children: ReactNode;
}

const layoutStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${primaryTextStyles}
`;

export const Layout = ({ children }: LayoutProps) => <div css={layoutStyles}>{children}</div>;
