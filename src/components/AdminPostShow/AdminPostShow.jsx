import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "./AdminPostShow.css"
import AdminPostCard from '../AdminPostCard/AdminPostCard';
import postService from '../../Appwrite/PostData';
import Spinner from '../Spinner/Spinner';
import { useParams } from 'react-router-dom';

function AdminPostShow() {

  const [userPosts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const userData = useSelector((state) => state.auth.userData);

  const { category } = useParams();

  const filterpost = {
    userId: userData.$id,
    Category: category ? category : null,
  }

  const getpost = async () => {
    setLoading(false)
    try {
      await postService.getFiterPost({ ...filterpost })
        .then((res) => {
          const sortedPosts = res.documents.sort((a, b) => b.View - a.View);
          if (category === undefined) {
            const topPost = sortedPosts.slice(0, 6);
            setPosts(topPost)
            console.log("topPost", topPost)
          } else {
            console.log("sortedPosts", sortedPosts)
            setPosts(sortedPosts)
          }
        })
    } catch (error) {
      console.error(error)
    }
    setLoading(true);
  }

  useEffect(() => {
    getpost();
  }, [category])


  return (
    <>
      <div className='me-4 mb-4 rounded-2xl ' >
        <div className='bg-[#D4D8F0] rounded-2xl p-4' >
          {
            loading ? userPosts.map((data) => (<AdminPostCard key={data.$id} data={data} getpost={getpost} />)) :
              <Spinner />

          }
        </div>
      </div>
    </>
  )
}

export default AdminPostShow;