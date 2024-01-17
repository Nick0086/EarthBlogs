import React, { useEffect, useState } from 'react'
import postService from '../../Appwrite/PostData';
import { Link } from 'react-router-dom';

function PostCard({ post }) {

    const [img, setImg] = useState();

    useEffect(() => {
        postService.getFilePreview(post.Featureimage)
            .then((res) => setImg(res.href))
            .catch((error) => console.error("error in image previwe", error))
    })

    return (
        <div>
            <img src={img} className='aspect-video rounded-xl' alt="" />
            <h3><Link to={`/post/${post.$id}`} >{(post.Title).substring(0, 40) + "..."}</Link></h3>
            <p>{post.View ? post.View : 0  }</p>
        </div>
    )
}

export default PostCard