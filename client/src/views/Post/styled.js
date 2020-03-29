import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  TopicLink as ViewTopicLink,
  PostLink as ViewPostLink
} from "../../views/styled";

export const Wrapper = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
`;

export const UserImg = styled.img`
  height: 2rem;
  width: 2rem;
  border-radius: 1.8rem;
  margin-top: 0.5rem;
  margin-bottom: -0.2rem;
  border: 1px solid #eee;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const TitleBox = styled.div`
  font-size: 1.4rem;
`;

export const Title = styled.a`
  font-weight: 400;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  &:visited {
    color: #aaa;
  }

  @media (max-width: ${props => props.theme.width.maxPx}Px) {
    font-size: 1.4rem;
  }
`;

export const UnlikedIcon = styled(FontAwesomeIcon)`
  padding-right: 0.3rem;
  font-size: 1.2rem;
  color: #ccc;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    color: ${props => props.theme.color.primary};
  }
`;

export const LikedIcon = styled(UnlikedIcon)`
  color: ${props => props.theme.color.primary};

  &:hover {
    color: #ccc;
  }
`;

export const NumLikes = styled.span`
  margin-right: 0.15rem
  font-size: 0.8rem;
  color: #999;
  text-align: right;
`;

export const TopicLink = styled(ViewTopicLink)`
  &:not(:last-child) {
    margin-right: 0.4rem;
  }
`;

export const PostLink = styled(ViewPostLink)`
  text-align: center;
  width: 100%;
`;

export const DeleteIcon = styled(FontAwesomeIcon)`
  margin-top: 0.5rem;
  font-size: 1.6rem;
  color: #aaa;

  &:hover {
    cursor: pointer;
    color: #333;
  }
`;

export const LikeWrapper = styled.div`
  display: flex;
`;
