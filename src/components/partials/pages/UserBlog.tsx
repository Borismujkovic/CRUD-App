import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { BlogPost, User } from "../../../data/data";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import {
  deleteSingleBlog,
  fetchBlogs,
  selectedBlog,
  shouldReloadUserBlogs,
} from "../../../redux/user/blogSlice";
import { selectUsers } from "../../../redux/user/userSlice";
import BlogEditModal from "./BlogEditModal";

const StyledUserBlog = styled.div`
  #user-blog {
    position: relative;
    min-height: 80vh;
    padding: 0 200px;
  }

  .button-div {
    width: 100%;
  }

  h2 {
    margin: 10px 0;
  }

  #user-blog {
    width: 100%;
  }

  .user-blog span {
    font-wieght: 700;
    font-size: 15px;
  }

  .user-blog p {
    margin-top: 50px;
  }

  .back {
    border: 2px solid #1a7d86;
    padding: 5px;
    margin: 10px 0;
    cursor: pointer;
    color: #1a7d86;
    border-radius: 5px;
    &:hover {
      background-color: #1a7d86;
      color: white;
    }
  }

  .blog-title {
    display: flex;
    align-items: center;
    justify-content: start;
  }
  .edit-img {
    height: 25px;
    margin-left: 10px;
    padding: 4px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: rgb(28, 27, 27, 0.41);
    }
  }

  .delete-btn button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #1a7d86;
    padding: 5px;
    margin: 10px 0;
    cursor: pointer;
    color: #1a7d86;
    border-radius: 5px;
    &:hover {
      background-color: #1a7d86;
      color: white;
    }
  }

  .delete-btn button img {
    height: 15px;
    margin-right: 8px;
  }

  @media screen and (max-width: 992px) {
    #user-blog {
      padding: 0 100px;
    }
  }

  @media screen and (max-width: 576px) {
    #user-blog {
      padding: 0 50px;
    }
    .back {
      padding: 3px;
    }
  }
`;

const UserBlog = () => {
  const dispatch = useAppDispatch();
  const users: User[] = useTypedSelector(selectUsers);
  const singleBlog: BlogPost = useTypedSelector(selectedBlog);
  const shouldReloadBlogs = useTypedSelector(shouldReloadUserBlogs);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { userId } = useParams();

  const singleUser = users.find((user) => user.id.toString() === userId);

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const navigate = useNavigate();

  const redirectToHome = () => {
    setTimeout(() => navigate("/"), 300);
  };

  useEffect(() => {
    if (shouldReloadBlogs) {
      dispatch(fetchBlogs());
    }
  }, [shouldReloadBlogs]);

  return (
    <StyledUserBlog>
      {modalOpen ? (
        <BlogEditModal modalHandler={modalHandler} singleBlog={singleBlog} />
      ) : null}
      <div id="user-blog">
        <div className="button-div">
          <Link to="/">
            <button className="back">Back to Users</button>
          </Link>
        </div>
        <div className="user-blog">
          <div className="blog-title">
            <h2>{singleBlog?.title}</h2>
            <img
              alt="edit"
              className="edit-img"
              onClick={modalHandler}
              src="https://cdn-icons-png.flaticon.com/128/1250/1250615.png"
            />
          </div>
          <span>
            <b>Author: </b>
            {`${singleUser?.first_name} ${singleUser?.last_name}`}
          </span>{" "}
          /{" "}
          <span>
            {new Date().getDate()}-{new Date().getMonth() + 1}-
            {new Date().getFullYear()}
          </span>
          <p>{singleBlog?.body}</p>
        </div>
        <div className="delete-btn">
          <button
            onClick={() => {
              dispatch(deleteSingleBlog(singleBlog?.id));
              redirectToHome();
            }}
          >
            <img
              alt="delete"
              src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
            />
            Delete This Blog
          </button>
        </div>
      </div>
    </StyledUserBlog>
  );
};

export default UserBlog;
