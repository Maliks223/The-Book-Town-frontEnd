import React from "react";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBook = () => {
  const history = useNavigate();
  const [image, setImage] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const sendRequest = async () => {
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("author", inputs.author);
    formData.append("description", inputs.description);
    formData.append("category", inputs.category);
    formData.append("image", image);
    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    let token = localStorage.getItem("token");
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${token}`);
    const res = await axios
      .post("http://localhost:3002/books/add", formData, { headers: headers })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/books"));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        border={3}
        borderColor={"dodgerblue"}
        borderRadius={5}
        boxShadow={"10px 10px 20px #ccc"}
        padding={3}
        margin={"auto"}
        marginTop={1.25}
        display={"flex"}
        flexDirection={"column"}
        width={"80%"}
      >
        <Typography
          textAlign={"center"}
          fontWeight={"bold"}
          padding={2}
          color={"dodgerblue"}
          variant={"h4"}
        >
          Add Your Book
        </Typography>
        <InputLabel sx={labelStyles}>Title</InputLabel>
        <TextField
          name="title"
          onChange={handleChange}
          value={inputs.title}
          margin="auto"
          variant="outlined"
        />
        <InputLabel sx={labelStyles}>Author</InputLabel>
        <TextField
          name="author"
          onChange={handleChange}
          value={inputs.author}
          margin="auto"
          variant="outlined"
        />
        <InputLabel sx={labelStyles}>Description</InputLabel>
        <TextField
          name="description"
          onChange={handleChange}
          value={inputs.description}
          margin="auto"
          variant="outlined"
        />
        <InputLabel sx={labelStyles}>Category</InputLabel>
        <TextField
          name="category"
          onChange={handleChange}
          value={inputs.category}
          margin="auto"
          variant="outlined"
        />
        <InputLabel sx={labelStyles}>Image</InputLabel>
        <input type="file" name="image" onChange={handleFileChange} />
        <Button
          sx={{ mt: 1.5, borderRadius: 4 }}
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </Box>
    </form>
  );
};

export default AddBook;
