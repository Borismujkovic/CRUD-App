import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import { GlobalStyles } from "./components/GlobalStyles/GlobalStyles";
import Footer from "./components/partials/Footer";
import Header from "./components/partials/Header";
import CreateBlog from "./components/partials/pages/CreateBlog";
import UserBlog from "./components/partials/pages/UserBlog";
import Users from "./components/partials/pages/Users";

const StyledWrapper = styled.div`
   {
    background-image: linear-gradient(to bottom right, #dceefc, #939193);
    min-height: 100vh;
    width: 100%;
    position: relative;
  }
`;

interface IAppProps {}

const App: React.FC<IAppProps> = () => (
  <StyledWrapper>
    <GlobalStyles />
    <Header />
    <Routes>
      <Route element={<Users />} path="/" />
      <Route element={<UserBlog />} path="/user/:userId/blog/:blogId" />
      <Route element={<CreateBlog />} path="/user/create_blog/:userId" />
    </Routes>
    <Footer />
  </StyledWrapper>
);

export default App;