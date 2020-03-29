import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "../AppBar";
import Footer from "../Footer";
import Spinner from "../Spinner";
import theme from "../../theme";
import { clearAlert } from "../../actions/page";
import { Wrapper, Content, Background } from "./styled";

const Root = ({ children, clearAlert, isLoading }) => {
  const [hasNav, setHasNav] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    clearAlert();
  }, [pathname, clearAlert]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper isLanding={pathname === "/"}>
        <AppBar hasNav={hasNav} onToggleNav={() => setHasNav(!hasNav)} />
        <Background hasShadow={hasNav} onClick={() => setHasNav(false)} />
        {isLoading && (
          <Content>
            <Spinner />
          </Content>
        )}
        <Content isLoading={isLoading}>{children}</Content>
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
};

Root.propTypes = {
  children: PropTypes.node.isRequired,
  clearAlert: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapPropsToState = state => ({
  isLoading: state.page.isLoading
});

export default connect(mapPropsToState, { clearAlert })(Root);
