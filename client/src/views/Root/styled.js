import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0 auto;
`;

export const Content = styled.div`
  margin: 0 auto;
  padding: calc(63px + 1rem) 1rem 5rem 1rem;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  max-width: ${props => props.theme.width.maxPx}px;
  display ${props => (props.isLoading ? "none" : "flex")};
`;

export const Background = styled.div`
  transition: background 0.3s;
  position: fixed;
  width: 100%;
  height: 100%;
  display: ${props => (props.hasShadow ? "normal" : "none")};
  background: rgba(0, 0, 0, ${props => (props.hasShadow ? 0.4 : 0)});
`;
