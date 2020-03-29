import styled from "styled-components";
import { Button, Divider as ViewDivider } from "../../views/styled";

export const Wrapper = styled.div`
  padding-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FilterBox = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

export const ShowMoreButton = styled(Button)`
  margin-top: 1rem;
`;

export const Divider = styled(ViewDivider)`
  width: 100%;
  margin: 0rem 0 0.8rem 0;
`;

export const NoPostsMsg = styled.div`
  color: #aaa;
  font-size: 3rem;
  margin-top: 1rem;
`;
