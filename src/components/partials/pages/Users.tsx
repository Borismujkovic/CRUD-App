import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import {
  fetchBlogs,
  selectBlogs,
  shouldReloadUserBlogs,
} from "../../../redux/user/blogSlice";
import {
  fetchUsers,
  loadingUsers,
  selectUsers,
  shouldReloadUserList,
  usersActions,
} from "../../../redux/user/userSlice";
import Loading from "../Loading";
import SingleUser from "./Users/SIngleUser";

const StyledUsers = styled.div`
  #Users {
    // min-height: calc(100vh - 140px);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  h1 {
    text-align: center;
    color: #1a7d86;
    padding: 15px 0;
  }

  img {
    height: 20px;
    transition: 0.5s ease-in-out;
  }

  .inputs {
    display: flex;
    justify-content: flex-end;
  }

  .sort {
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .container {
    margin: 10px 0;
    transform: translate(-10%);
  }

  .search-box {
    input[type="text"] {
      border: none;
      background: none;
      z-index: 1;
      width: 25px;
      height: 25px;
      transition: all 0.25s ease-in 0.25s;
      color: transparent;
      font-size: 0.75rem;
      line-height: 25px;
      &:hover {
        cursor: pointer;
        &:focus {
          cursor: text;
        }
        + span {
          background: rgba(255, 255, 255, 0.2);
        }
      }
      &:focus {
        width: 200px;
        padding: 0 10px;
        outline: none;
        color: black;
        background: none;
        color: black;

        + span {
          width: 200px;
          &::before {
            width: 2px;
            opacity: 0;
            transition: all 0.25s ease-in;
          }
        }
      }
      + span {
        z-index: -1;
        position: absolute;
        border: 2px solid white;
        top: 0;
        width: 25px;
        height: 25px;
        transition: all 0.25s ease-in 0.25s;
        border-radius: 25px;
        left: 0;
        &::before {
          transition: all 0.25s ease-in 0.5s;
          transform-origin: left top;
          content: "";
          position: absolute;
          width: 10px;
          height: 5px;
          border-radius: 5px;
          background: white;
          transform: rotate(45deg) translate(26px, -2px);
        }
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px auto;
  }
  .pagination span {
    height: 20px;
    margin: 0 7px;
  }
  .collapse {
    color: red;
    cursor: pointer;
  }

  .paginationBtns {
    width: 100%;
    height: 40px;
    margin: 20px 0;
    list-style-type: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .paginationBtns > li {
    height: 10px !important;
  }

  .paginationBtns a {
    padding: 10px;
    margin: 8px;
    border-radius: 5px;
    border: 1px solid white;
    color: black;
    display: hidden;
  }

  .paginationBtns a:hover {
    background-color: #1a7d86;
    color: white;
  }

  .paginationActive a {
    background-color: #1a7d86;
    color: white;
  }

  @media screen and (max-width: 768px) {
    #Users {
      // width: 60%;
    }
  }
`;

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useTypedSelector(selectUsers);
  const isLoadingUserList = useTypedSelector(loadingUsers);
  const shouldReloadUsers = useTypedSelector(shouldReloadUserList);
  const shouldReloadBlogs = useTypedSelector(shouldReloadUserBlogs);

  const blogList = useTypedSelector(selectBlogs);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = usersPerPage * pageNumber;

  const filterUserList = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(usersActions.filterUsers(event.target.value));
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchBlogs());

    return () => {};
  }, []);

  useEffect(() => {
    if (shouldReloadUsers) {
      dispatch(fetchUsers());
    }
    if (shouldReloadBlogs) {
      dispatch(fetchBlogs());
    }
  }, [shouldReloadUsers, shouldReloadBlogs]);

  const displayedUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user, index) => (
      <SingleUser
        blogList={blogList}
        index={index}
        key={`${index}_user`}
        user={user}
      />
    ));

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = (value: { selected: number }) => {
    setPageNumber(value.selected);
  };

  return isLoadingUserList ? (
    <Loading />
  ) : (
    <StyledUsers>
      <div id="Users">
        <h1>All of our Users</h1>
        <div className="inputs">
          <div className="container">
            <div className="search-box">
              <input onChange={(event) => filterUserList(event)} type="text" />
              <span />
            </div>
          </div>
        </div>
        <div className="users">
          {displayedUsers}
          <ReactPaginate
            activeClassName="paginationActive"
            containerClassName="paginationBtns"
            disabledClassName="paginationDisabled"
            nextClassName="nextBtn"
            nextLabel="Next"
            onPageChange={(selectedItem) => {
              changePage(selectedItem);
            }}
            pageCount={pageCount}
            previousClassName="previousBtn"
            previousLabel="Back"
          />
        </div>
      </div>
    </StyledUsers>
  );
};

export default Users;
