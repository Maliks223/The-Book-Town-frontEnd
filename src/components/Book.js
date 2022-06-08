import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector } from "react-redux";
import axios from "axios";
import "./CSS files/book.css";

const Book = ({
  id,
  title,
  author,
  description,
  category,
  image,
  refreshFunc,
  suspended,
}) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const handleEdit = (e) => {
    navigate(`/books/${id}`);
  };

  const deleteRequest = async () => {
    let token = localStorage.getItem("token");
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const res = await axios
      .delete(`http://localhost:3002/books/delete/${id}`, { headers: headers })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const holdClick = async () => {
    const res = await axios
      .put(`http://localhost:3002/books/update/${id}`, {
        suspended: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest().then(() => refreshFunc());
  };

  // const handleAccept = () => {
  //   acceptRequest()
  //     .then(() => navigate("/books"));
  // };

  return (
    <div className="card-container">
      {isLoggedIn && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      )}
      <img src={`http://localhost:3002/${image}`} />
      <div className="card-content">
        <div className="card-body">
          <h1>Title: {title}</h1>
          <p>Author: {author}</p>
          <p>Description: {description}</p>
          <h4>Category: {category}</h4>
          {suspended && <p>Suspended</p>}
        </div>
        {!isLoggedIn && !suspended && (
          <button className="Book-button" type="submit" onClick={holdClick}>
            <Link className="Book-btn" to="/user" state={{ bookId: id }}>
              Lend
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Book;
