import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import postService from '../../Appwrite/PostData';


function AdminPostShow() {

  const[userPosts,setPosts] = useState(null)
  const userData = useSelector((state) => state.auth.userData);
  
  // Fetch  user posts on page load
  useEffect(() => {
    try {
        postService.getUserPost(userData.$id)
        .then((res) => setPosts(res.documents))
      
    } catch (error) {
      console.error(error)
    }
  },[])


  return (
    <>
      {
        userPosts && userPosts.map((data) => <h1 key={data.PostId} >{data.Title}</h1> ) 
      }
    </>
  )
}

export default AdminPostShow;