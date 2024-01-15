import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "./AdminPostShow.css"
import AdminPostCard from '../AdminPostCard/AdminPostCard';
import postService from '../../Appwrite/PostData';

function AdminPostShow() {

  const [userPosts, setPosts] = useState(null)
  const userData = useSelector((state) => state.auth.userData);

  const getpost = () => {
    try {
      postService.getUserPost(userData.$id)
        .then((res) => setPosts(res.documents))

    } catch (error) {
      console.error(error)
    }
  }


  // Fetch  user posts on page load
  useEffect(() => {
    getpost()
  }, [])


  return (
    <>
      {
        userPosts && userPosts.map((data) => (<AdminPostCard key={data.$id} data={data} getpost={getpost} />))
      }
    </>
  )
}

export default AdminPostShow;