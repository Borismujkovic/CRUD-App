import React, { useState } from "react";
import styled from "styled-components";

import { BlogPost } from "../../../data/data";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { editSingleBlog } from "../../../redux/user/blogSlice";

const StyledModal = styled.div`
  #Modal {
    height: 100vh;
    width: 100%;
    background-color: rgba(77, 75, 75, 0.658);
    padding-top: 100px;
    display: flex;
    justify-content: center;
    align-items: start;
    z-index: 10;
    position: fixed;
    
  }
  .modal-content {
    background-color: #fff;
    min-height: 550px;
    min-width: 800px;
    padding: 30px 10px;
    border-radius: 12px;
    animation: slide-down 300ms ease-out forwards;
  }

  @keyframes slide-down {
    from{
      opacity: 0;
      transform: traslateY:(-8rem);
    }
    to{
      opacity: 1;
      transformY: (0);
    }
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

  textarea {
    margin-top: 20px;
    border: 2px solid #1a7d86;
  }

  .confirm-btn {
    border: 2px solid #1a7d86;
    padding: 5px;
    margin-top: 10px;
    cursor: pointer;
    color: #1a7d86;
    border-radius: 5px;
    &:hover {
      background-color: #1a7d86;
      color: white;
    }
  }

  .modal-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-title img {
    height: 40px;
    cursor: pointer;
    background-color: transparent;
    padding: 7px;
    border-radius: 50%;
    &:hover {
      box-shadow: 0px 0px 6px -2px rgba(0, 0, 0, 0.88);
    }
  }

  .modal-title button img {
    height: 25px;
  }

  

  @media screen and (max-width: 992px) {
    .modal-content {
      min-height: 300px;
      min-width: 750px;
    }
  }

  @media screen and (max-width: 764px) {
    .modal-content {
      min-height: 200px;
      min-width: 550px;
    }
  }

  @media screen and (max-width: 576px) {
    .modal-content {
      min-height: 150px;
      min-width: 200px;
    }
    .modal-content h1 {
      font-size: 20px;
    }

    textarea {
      height: 150px;
      width: 300px;
    }
    .form__field {
      font-size: 15px;
      width: 170%;
    }
  }
`;

interface ISingleModal {
  singleBlog: BlogPost;
  modalHandler: () => void;
}

const Modal: React.FC<ISingleModal> = ({ singleBlog, modalHandler }) => {
  const dispatch = useAppDispatch();

  const [editBlog, setEditBlog] = useState({
    id: singleBlog.id,
    userId: singleBlog.userId,
    datePosted: singleBlog.datePosted,
    title: singleBlog.title,
    body: singleBlog.body,
  });

  return (
    <StyledModal>
      <div id="Modal">
        <div className="modal-content">
          <div className="modal-title">
            <h1>Edit Blog</h1>
            <img
              alt="close"
              onClick={modalHandler}
              src="https://cdn-icons-png.flaticon.com/128/2961/2961937.png"
            />
          </div>
          <div className="container">
            <div className="form__group field">
              <input
                className="form__field"
                id="name"
                name="name"
                onChange={(event) => {
                  setEditBlog({ ...editBlog, title: event.target.value });
                }}
                placeholder="Name"
                required
                type="input"
                value={editBlog.title}
              />
              <label className="form__label">Title</label>
            </div>
          </div>
          <div>
            <textarea
              cols={70}
              id=""
              name=""
              rows={15}
              value={editBlog.body}
              onChange={(event) => {
                setEditBlog({ ...editBlog, body: event.target.value });
              }}
            />
          </div>
          <button
            className="confirm-btn"
            onClick={() => {
              dispatch(editSingleBlog({ id: editBlog.id, data: editBlog }));
              modalHandler();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </StyledModal>
  );
};

export default Modal;
