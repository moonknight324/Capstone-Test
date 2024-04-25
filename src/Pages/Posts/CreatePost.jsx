import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  UserContext  from "../../components/UserContext";

const CreatePost = () => {
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  // const [Email, setEmail] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const {userEmail} = useContext(UserContext)


  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const addUserData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("caption", caption);
    formData.append("description", description);
    formData.append("email", userEmail);
    selectedFiles.forEach((file) => {
      formData.append("photos", file);
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/posts/register",
        formData,
        config
      );

      if (res.status === 200) {
        navigate("/main");
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error adding user data:", error);
      alert("Error adding user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUserDetails(JSON.parse(loggedInUser));
    }
  }, []);
  console.log(userDetails.email);

  return (
    <div className="container mt-3">
      <h1>Upload Your Image here</h1>
      <Form onSubmit={addUserData}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCaption">
          <Form.Label>Caption</Form.Label>
          <Form.Control
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </Form.Group>
        <input
          type="hidden"
          name="email"
          id=""
          value={userEmail}
        />

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFile">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
        </Form.Group>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </Form>
    </div>
  );
};

export default CreatePost;
