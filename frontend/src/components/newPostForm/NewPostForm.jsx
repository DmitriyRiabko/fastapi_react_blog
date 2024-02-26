import React, { useState } from "react";
import styles from "./NewPostForm.module.scss";
import axios from "axios";
import { API_URL } from "../../../config";

export default function NewPostForm() {
  const [image, setImage] = useState(null);
  const [creator, setCreator] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    axios
      .post(`${API_URL}/post/image`, formData)
      .then((response) => {
        console.log(response);
        createPost(response.data.filename);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>{
        setImage(null)
      })
  };

  const createPost = (imageUrl) => {
    const json_string= {
        'image_url': imageUrl,
        'title': title,
        'content':text,
        'creator':creator

    }
    axios.post(`${API_URL}/post/`,json_string)
  };



  return (
    <div className={styles.container}>
      <div className={styles.left_block}>
        <input
          type="text"
          className={styles.field}
          placeholder="Creator"
          onChange={(e) => setCreator(e.target.value)}
          value={creator}
        />
        <input
          type="text"
          className={styles.field}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input type="file" onChange={handleImageUpload} />

        <button type="text" onClick={handleCreate}>
          Create
        </button>
      </div>
      <div className={styles.right_block}>
        <textarea
          cols="50"
          rows="10"
          placeholder="Write content here..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>
      </div>
    </div>
  );
}
