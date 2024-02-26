import { useState, useEffect } from "react";
import styles from "./main.module.scss";
import { API_URL } from "../config";
import Post from "./components/post/Post";
import NewPostForm from "./components/newPostForm/NewPostForm";

import axios from "axios";

function App() {
  const [posts, setPosts] = useState(null);

  const fetchData = async () => {
    const { data } = await axios.get(`${API_URL}/post/all`);
    setPosts(data.reverse());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={styles.title}>Amazing Cars Blog</p>
            <NewPostForm />

          </header>
          <section className={styles.posts}>
            {posts?.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </section>
          
        </div>
      </div>
    </>
  );
}

export default App;
