import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { BlogPost, User } from "../../../../data/data";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { deleteSingleUser } from "../../../../redux/user/userSlice";
import SingleBlog from "../Blogs/SingleBlog";

const StyledSingleUsers = styled.div`
  a {
    text-decoration: none;
  }
  .users {
    margin: 10px;
    width: 60%;
    display: flex;
    justify content: center;
    align-items: center;  
  }

  .table {
    border: 1px solid white;
    border-radius: 10px;
  }

  .del-user{
    border: 2px solid #1a7d86;
    padding: 5px;
    margin: 10px 0;
    cursor: pointer;
    color: #1a7d86;
    border-radius: 5px;
    margin-left: 10px;
    &:hover {
      background-color: #1a7d86;
      color: white;
    }
  }
  .user {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }
  .username {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .username > p {
    font-weight: 700;
  }
  .user-info {
    background-color: white;
  }
  .user-collapsed {
    transform: rotate(3.142rad);
    transition: 0.5s ease-in-out;
  }
  img {
    height: 20px;
    transition: 0.5s ease-in-out;
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
  .content {
    color: #8b7f75;
    max-height: 0;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0, 1, 0, 1);
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    align-items: center;
  }

  .show {
    height: auto;
    max-height: 9999px;
    transition: all 0.5s cubic-bezier(1, 0, 1, 0);
  }
  .content .blog-link {
    font-weight: 700;
    cursor: pointer;
    margin: 5px 23px;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      color: #1a7d86;
    }
  }

  .blog-link p:hover{
    color: #1a7d86;
  }

  .content a {
    color: black;
    width: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .blog {
    border: 1px solid white;
    width: 90%;
    padding: 5px;
    border-radius: 10px;
    &:hover {
      color: #1a7d86;
    }
  }

  .content a img {
    padding: 2px;
    transition: none;
    margin-left: 5px;
    &:hover {
      background-color: #ed4637;
      border-radius: 50%;
    }
  }

  @media screen and (max-width: 768px) {
    #Users {
      width: 80vw;
    }
    .users {
      width: 70%;
    }
    .blog-link{
      width: 90% !important;
    }
  }

  @media screen and (max-width: 576px) {
    .content a {
      width: 100%;
    }
    .users {
      width: 50%;
    }
    .blog-link{
      width: 100% !important;
    }
  }
`;

interface ISingleUser {
  user: User;
  index: number;
  blogList: BlogPost[];
}

const SingleUser: React.FC<ISingleUser> = (props) => {
  const dispatch = useAppDispatch();
  const [singleUserBlogs, setSingleUserBlogs] = useState<BlogPost[]>([]);
  const [accordion, setAccordion] = useState<number | null>(null);

  useEffect(() => {
    const userBlogs = props.blogList.filter(
      (blog) => blog.userId === props.user.id,
    );
    setSingleUserBlogs(userBlogs);
  }, [props.blogList]);

  const toggleAccordion = (index: number) => {
    if (accordion === index) {
      return setAccordion(null);
    }

    setAccordion(index);
  };

  return (
    <StyledSingleUsers>
      <div id="Users">
        <div className="users">
          <div className="table">
            <div className="user">
              <div
                className="username"
                onClick={() => {
                  toggleAccordion(props.index);
                }}
              >
                <p>
                  {props.user.first_name} {props.user.last_name}
                </p>
                <span>{accordion === props.index ? "-" : "+"}</span>
              </div>
              <div
                className={
                  accordion === props.index ? "content show" : "content"
                }
              >
                {singleUserBlogs.map((blog, index) => (
                  <SingleBlog blog={blog} key={`${index}_blog`} />
                ))}
                <div className="blog-link">
                  <Link to={`user/create_blog/${props.user.id}`}>
                    <p>Create New Blog +</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              className="del-user"
              onClick={() => dispatch(deleteSingleUser(props.user.id))}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </StyledSingleUsers>
  );
};

export default SingleUser;
