import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider as ViewDivider, Button } from "../../views/styled";
import { SelectButton } from "../../views/Select/styled";

export const SubHeader = styled.div`
  margin-bottom: 0.5rem;
  margin-top: -0.2rem;
  font-size: 1.2rem;
  font-weight: 400;
`;

export const Divider = styled(ViewDivider)`
  width: 100%;
  margin: 2rem 0;
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;

  &:first-of-type {
    margin-top: 1rem;
  }
`;

export const RemoveIcon = styled(FontAwesomeIcon)`
  margin-left: 0.5rem;
  color: #ccc;

  &:hover {
    color: #aaa;
    cursor: pointer;
  }
`;

export const ShowSubsButton = styled(SelectButton)`
  width: 150px;
`;

export const ShowTopicButton = styled(SelectButton)`
  width: 150px;

  &:not(:first-of-type) {
    margin-top: 1.2rem;
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DeleteButton = styled(Button)`
  color: #fff;
  font-weight: 700;
  background: ${props => props.theme.color.danger};
  border-color: ${props => props.theme.color.danger};
`;

export const FileInput = styled.input`
  margin-bottom: 1.2rem;
  padding: 0.8rem 1rem;
  background: inherit;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  max-width: 330px;
`;

export const PopularTopics = styled.div`
  margin-top: 1rem;
`;

export const SettingsIcon = styled(FontAwesomeIcon)`
  margin-right: 0.2rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;

export const LogoutButton = styled(Button)`
  width: 72px;
`;

export const EditButton = styled(LogoutButton)`
  margin-right: 0.5rem;
`;

export const Wrapper = styled.div`
  margin-top: 3rem;
  width: 100%;
`;
