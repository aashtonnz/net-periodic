import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  opacity: 0.9;
  font-weight: 600;
  color: #fff;
  background: ${props => props.theme.color.primary};

  &.danger {
    background: ${props => props.theme.color.danger};
  }
`;
