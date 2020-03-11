import styled, { CreateStyled } from '@emotion/styled';

export type Theme = {
  color?: {
    primary: string;
    secondary: string;
  };
  border?: {
    radius: string | null;
  };
  mode?: string;
};

export default styled as CreateStyled<Theme>;
