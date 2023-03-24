import * as React from "react";
import { Link } from "react-router-dom";

import { BlogPost } from "../../../../data/data";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import {
  blogsActions,
  deleteSingleBlog,
} from "../../../../redux/user/blogSlice";
import { truncateString } from "../../../../utils/stringUtils";

interface ISingleBlog {
  blog: BlogPost;
}

const SingleBlog: React.FC<ISingleBlog> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="blog-link"
      onClick={() => dispatch(blogsActions.setSelectedBlog(props.blog))}
    >
      <Link to={`/user/${props.blog.userId}/blog/${props.blog.id}`}>
        <div className="blog">
          <p>{truncateString(props.blog.title)}</p>
        </div>
      </Link>
      <div
        className="blog-img"
        onClick={() => dispatch(deleteSingleBlog(props.blog.id))}
      >
        <img
          alt="delete-blog"
          src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
        />
      </div>
    </div>
  );
};

export default SingleBlog;
