import React, { useEffect, useState } from "react";
import styles from "./Post.module.scss";
import { API_URL } from "../../../config";
import axios from "axios";

export default function Post({ post }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    setImageUrl(`${API_URL}/${post.image_url}`)
  }, []);

  const handleDelete = (event)=>{
    event.preventDefault()
    axios.delete(`${API_URL}/post/${post.id}`)
  }

  return <div className={styles.post}>
    <img src={imageUrl} alt="" className={styles.post_image}/>
    <div className={styles.post_info}>
        <p className={styles.post_title}>
            {post.title}
        </p>
        <p className={styles.post_creator}>
            {post.creator}
        </p>
        <p className={styles.post_content}>
            {post.content}
        </p>
        <div className={styles.buttons}>
            <button onClick={handleDelete} className={styles.delete}>Delete</button>
        </div>

    </div>

  </div>;
}
