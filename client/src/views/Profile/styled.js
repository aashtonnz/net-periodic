import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageHeader } from "../../views/styled";

export const UserImg = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 5rem;
  border: 1px solid #eee;
  display: block;
  margin: 3.5rem auto 0.5rem auto;
`;

export const Header = styled(PageHeader)`
  padding: 0 0 0 0;
`;

export const Username = styled.div`
  font-size: 1rem;
  color: #333;
  font-weight: 400;
`;

export const NumSubscribed = styled.div`
  font-size: 1rem;
  color: #777;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const LinkIcon = styled(FontAwesomeIcon)`
  font-size: 0.8rem;
  margin-right: 0.3rem;
  color: #aaa;

  &:hover {
    cursor: pointer;
    color: #333;
  }
`;

export const ProfileLink = styled.a`
  font-size: 1rem;
  color: ${props => props.theme.color.primary};
`;

export const Wrapper = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;
