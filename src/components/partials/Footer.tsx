import * as React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  text-align: center;
  padding: 15px;
  height: 70px;
  width: 100%;
  position: relative;
`;

const Footer = () => (
  <StyledHeader>
    <footer id="blog">
      <span>© {new Date().getFullYear()} Copyright Boris Mujkovic</span>
    </footer>
  </StyledHeader>
);

export default Footer;
