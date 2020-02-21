import styled from "../lib/styled";

type BoxProps = {
  bg?: string;
  radius?: string;
};

const Box = styled("div")<BoxProps>`
  padding: 20px;
  background-color: ${props => props.bg || props.theme.color.primary};
  box-sizing: border-box;
  border-radius: ${props => props.theme.border.radius};
  line-height: 1;

  .box-header {
    background-color: ${props => props.theme.color.secondary};
    border-bottom: 1px solid ${props => props.theme.color.secondary};
    color: ${props => props.theme.color.primary};
  }

  .box-content {
    margin-top: 20px;
  }
`;

export default Box;
