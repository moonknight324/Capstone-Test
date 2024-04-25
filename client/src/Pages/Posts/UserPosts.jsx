import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../../Styles/UserPost.css";
import UserContext from "../../components/UserContext";

function UserPosts() {
  const [data, setData] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [filteredUser, setFilteredUser] = useState("All");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUserDetails(JSON.parse(loggedInUser));
    }
  }, []);



  const getUserData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/posts/getdata", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setData(res.data);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Error fetching user data");
    }
  };

  console.log(data);

  useEffect(() => {
    getUserData();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/posts/delete/${postId}`);
      getUserData();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post");
    }
  };

  const renderImages = (post) => {
    return (
      <div key={post._id} className="image-container">
        {post.imgpath.map((img, index) => (
          <img key={index} src={img} alt={post.name}></img>
        ))}
      </div>
    );
  };

  const handleChange = (e) => {
    setFilteredUser(e.target.value);
  };

  const filteredPosts = data.filter((post) => {
    if (filteredUser === "All") {
      return true;
    } else {
      return post.email === userDetails.email;
    }
  });

//   const filteredPosts = data.filter((post) => {
//     if (filteredUser === "All") {
//         return true;
//     } else {
//         return post.userId === userDetails._id; // Assuming userDetails contains the user's ID (_id)
//     }
// });


  console.log(userDetails.email);

  return (
    <div>
      <select onChange={handleChange} className="filter-btn">
        <option value="All">All</option>
        <option value="user">User</option>
      </select>
      {filteredPosts.map((post) => (
        <div key={post._id}>
          {renderImages(post)}
          <h2>{post.name}</h2>
          <p>{post.caption}</p>
          <p>{post.description}</p>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default UserPosts;
