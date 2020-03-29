import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  z-index: 999999999;
`;

export const NavWrapper = styled.div`
  width: 100%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  background: #fff;
  min-height: 63px;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.7rem 0.4rem 0.7rem 0.7rem;
    margin: 0 auto;
    max-width: ${props => props.theme.width.maxPx}px;
  }
`;

export const Logo = styled.img`
  height: 2rem;
  margin: 0.1rem 0.6em 0.1rem 0.2rem;
`;

export const Header = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: baseline;
`;

export const H1 = styled.h1`
  font-weight: 400;
  font-size: 1.5rem;
  margin: 0;
`;

export const Time = styled.time`
  font-size: 0.9rem;
  color: #777;
  display: flex;
  margin-left: 0.5rem;

  &:hover {
    cursor: default;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  box-sizing: content-box;
  font-size: 1.2rem;
  color: #aaa;
  padding: 0.8rem;

  &:hover {
    cursor: pointer;
  }
`;

export const Nav = styled.nav`
  margin: 0 auto;
  overflow: hidden;
  transition: max-height 0.3s;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 1.2rem;
  max-width: ${props => props.theme.width.maxPx}px;
  max-height: ${props => (props.show ? "300px" : "0")};
`;

export const NavLink = styled(RouterLink)`
  margin: 0 0 1rem 0;
  width: max-content;
  text-decoration: none;
  color: inherit;
  color: #666;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const UserLink = styled(NavLink)`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1.3rem;
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  display: flex;
  color: inherit;
  align-items: center;
`;

export const Divider = styled.div`
  width: 35px;
  margin: 0.5rem 0 1rem 0;
  border-bottom: 1px solid #ddd;
`;
