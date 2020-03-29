import styled from "styled-components";
import { Button } from "../styled";

export const SelectButton = styled(Button)`
  width: 130px;
  padding: 0.2rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  & > span {
    margin-right: 0.4rem;
  }
`;

export const Option = styled.div`
  text-align: left;
  padding: 0.24rem 0.5rem;
  font-size: 1rem;
  color: #333;

  &:first-child {
    padding-top: 0.36rem;
  }

  &:last-child {
    padding-bottom: 0.36rem;
  }

  &:hover {
    cursor: pointer;
    background: #f5f5f5;
  }
`;

export const OptionsWrapper = styled.div`
  margin-top: 32px;
  width: 130px;
  position: absolute;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 5px;
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0.3rem 1.5rem 0.3rem;
`;
