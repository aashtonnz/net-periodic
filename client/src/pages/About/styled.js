import styled from "styled-components";

export const Content = styled.div`
  width: 100%;
  text-align: left;
  padding: 0 1rem;
  font-size: 1rem;
`;

export const Ul = styled.ul`
  & > li {
    margin-left: 1rem;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

export const Ol = styled.ol`
  & > li {
    margin-left: 1rem;
    padding-left: 0.5rem;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

export const SubHeader = styled.h3`
  margin: 2.8rem 0 1.5rem 0;
  font-weight: 400;
  font-size: 1.2rem;
`;
