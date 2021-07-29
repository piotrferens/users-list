import { css } from '@emotion/react';

import { primaryTextStyles, secondaryTextStyles } from '../../shared/styles';

interface UserProps {
  count: number;
  name: string;
  email: string;
}

const containerStyles = css`
  &:not(:last-child) {
    margin-bottom: 9px;
  }
`;

const countStyles = css`
  ${secondaryTextStyles};
  margin-right: 4px;
`;

const nameStyles = css`
  ${primaryTextStyles};
  font-weight: bold;
  margin-right: 12px;
`;

export const User = ({ count, name, email }: UserProps) => (
  <div css={containerStyles}>
    <span css={countStyles}>{count}.</span> <span css={nameStyles}>{name}</span>
    <span css={countStyles}>@{email}</span>
  </div>
);
