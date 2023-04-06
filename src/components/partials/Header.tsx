import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.div`
  background-color: #1a7d86;
  color: white;
  text-align: center;
  padding: 15px;
  min-height: 70px;
  width: 100%;
  position: relative;

  a {
    text-decoration: none;
    color: white;
  }
`;

const Header = () => (
  <StyledHeader>
    <div id="blog">
      <Link to="/">
        <h1>CURD Application</h1>
      </Link>
    </div>
  </StyledHeader>
);

export default Header;
