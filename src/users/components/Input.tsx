import { css, SerializedStyles } from '@emotion/react';
import { ChangeEvent, ReactNode } from 'react';

import { primaryTextStyles } from '../../shared/styles';

interface InputProps {
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  css?: SerializedStyles;
}

const inputStyles = css`
  width: 648px;
  height: 24px;
  ${primaryTextStyles};

  @media (max-width: 768px) {
    width: 324px;
  }
`;

export const Input = ({ onChange, ...props }: InputProps) => {
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => onChange(value);

  return (
    <input
      type="text"
      onChange={handleChange}
      data-testid="search-users-input"
      css={inputStyles}
      {...props}
    />
  );
};
