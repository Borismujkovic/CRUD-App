import React, { FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { addSingleBlog } from "../../../redux/user/blogSlice";

const StyledNewBlog = styled.div`
  .new-blog {
    min-height: calc(100vh - 140px);
    min-width: 70vw;
    max-width: 90vw;
    padding: 30px 100px;
  }

  .back {
    border: 2px solid #1a7d86;
    padding: 5px;
    margin: 10px;
    cursor: pointer;
    color: #1a7d86;
    border-radius: 5px;
    &:hover {
      background-color: #1a7d86;
      color: white;
    }
  }
  .new-blog h1 {
    text-align: center;
  }

  .form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 50%;
  }

  .form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid $gray;
    outline: 0;
    font-size: 1.3rem;
    color: black;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    border-bottom: 1px solid #11998e;

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ .form__label {
      font-size: 1.3rem;
      cursor: text;
      top: 20px;
    }
  }

  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: gray;
  }

  .form__field:focus {
    ~ .form__label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #187c85;
      font-weight: 700;
    }
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-color: #187c85;
    border-image-slice: 1;
  }
  /* reset input */
  .form__field {
    &:required,
    &:invalid {
      box-shadow: none;
    }
  }

  .textarea {
    margin: 20px 0;
  }
  textarea {
    border: 1px solid #11998e;
    border-radius: 5px;
    padding: 10px;
    letter-spacing: 1.5px;
  }

  @media screen and (max-width: 992px) {
    textarea {
      width: 700px;
      height: 300px;
    }
  }

  @media screen and (max-width: 764px) {
    .form__group {
      width: 80%;
    }
    textarea {
      width: 500px;
      height: 250px;
    }
  }

  @media screen and (max-width: 576px) {
    textarea {
      width: 450px;
      height: 200px;
    }
  }

  @media screen and (max-width: 480px) {
    .new-blog {
      padding: 30px;
    }
    textarea {
      width: 300px;
      height: 150px;
    }
  }
`;

const CreateBlog = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  const navigate = useNavigate();

  const routeChange = () => {
    navigate(`/`);
  };

  const [newBlog, setNewBlog] = useState({
    id: "",
    userId: Number(userId),
    datePosted: "",
    title: "",
    body: "",
  });

  const confirmHandler = (event: FormEvent) => {
    event.preventDefault();

    dispatch(addSingleBlog({ ...newBlog, id: uuidv4() }));
    routeChange();
  };

  return (
    <StyledNewBlog>
      <div className="new-blog">
        <Link to="/">
          <button className="back">Go back</button>
        </Link>
        <h1>Create new blog</h1>
        <form action="" onSubmit={confirmHandler}>
          <div className="form__group field">
            <input
              className="form__field"
              id="name"
              name="name"
              onChange={(event) => {
                setNewBlog({ ...newBlog, title: event.target.value });
              }}
              placeholder="Name"
              required
              type="input"
            />
            <label className="form__label">Title</label>
          </div>
          <div className="textarea">
            <textarea
              cols={120}
              name="blog"
              onChange={(event) => {
                setNewBlog({ ...newBlog, body: event.target.value });
              }}
              placeholder="Write a blog..."
              required
              rows={20}
            />
          </div>
          <button className="back" type="submit">
            Confirm
          </button>
        </form>
      </div>
    </StyledNewBlog>
  );
};

export default CreateBlog;
