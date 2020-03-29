import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { Link as RouterLink } from "react-router-dom";

export const PageHeader = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  padding: 2rem 0 1.5rem 0;
`;

export const Button = styled.button`
  font-size: 1rem;
  padding: 0.1rem 0.7rem 0 0.7rem;
  height: 32px;
  color: #333;
  border: none;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export const PrimaryButton = styled(Button)`
  color: #fff;
  background: ${props => props.theme.color.primary};
  border-color: ${props => props.theme.color.primary};
`;

export const Input = styled.input`
  width: 100%;
  max-width: 330px;
  font-size: 1rem;
  padding: 0.4rem 0.5rem 0.3rem 0.5rem;
  margin-bottom: 1.2rem;
  background: inherit;
  border: 1px solid #ddd;
  border-radius: 5px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.color.primary};
  }
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: ${props => props.theme.color.primary};

  &:hover {
    text-decoration: underline;
  }
`;

export const A = styled.a`
  text-decoration: none;
  color: ${props => props.theme.color.primary};

  &:hover {
    text-decoration: underline;
  }
`;

export const Divider = styled.div`
  width: 35px;
  margin: 0.5rem;
  border-bottom: 1px solid #ddd;
`;

export const UserLink = styled(RouterLink)`
  font-size: 1rem;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const PostLink = styled.a`
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 280px;
  text-decoration: none;
  color: #777;

  &:hover {
    text-decoration: underline;
  }
`;

export const UserImg = styled.img`
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 1.8rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;

  &:hover {
    cursor: pointer;
    border-color: #888;
  }
`;

export const TopicLink = styled(RouterLink)`
  font-size: 1rem;
  text-decoration: none;
  color: ${props => props.theme.color.primary};

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const TextArea = styled(TextareaAutosize)`
  width: calc(100% - 2rem);
  font-size: 1rem;
  padding: 0.4rem 0.5rem 0.3rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  min-height: 6.5rem;
  max-width: 330px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.color.primary};
  }
`;

export const NumChars = styled.div`
  width: 100%;
  font-size: 0.9rem;
  text-align: right;
  height: 1.2rem;
  max-width: 330px;
`;

export const CheckBox = styled.input`
  margin-left: 0.2rem;
`;
