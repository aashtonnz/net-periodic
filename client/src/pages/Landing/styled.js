import styled from "styled-components";

export const Heading = styled.h2`
  font-weight: 400;
  font-size: 2rem;
  margin: 0.5rem;
`;

export const Divider = styled.div`
  width: 30px;
  margin: 1.1rem;
  border-bottom: 1px solid #ddd;
`;

export const P = styled.p`
  width: 100%;
  margin: 0.4rem;
  font-size: 1rem;
`;

export const Countdown = styled.p`
  width: 100%;
  margin: 0.5rem;
  font-size: 1.5rem;
`;

export const Wrapper = styled.div`
  height: 75vh;
  display: flex;
  width: 100%;
  align-items: center;
  background-size: cover;

  & > div {
    text-align: center;
    flex-direction: column;
    display: flex;
    align-items: center;
    width: 100%;
  }

  @media (max-width: ${props => props.theme.width.maxPx}Px) {
    padding-top: 1.5rem;
  }
`;
