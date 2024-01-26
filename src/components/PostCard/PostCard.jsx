import React, { useEffect, useState } from 'react'
import postService from '../../Appwrite/PostData';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import TimeAgo from '../TimeAgo/TimeAgo';

function PostCard({ post }) {

    const [img, setImg] = useState();

    useEffect(() => {
        postService.getFilePreview(post.Featureimage)
            .then((res) => setImg(res.href))
            .catch((error) => console.error("error in image previwe", error))
    },[post.Featureimage])

    return (
        <div className='shadow-lg p-3 bg-white rounded-xl h-full' >
            <img src={img}  className='aspect-video rounded-xl mb-6 md:h-[50%]' alt="" />
            <div className='md:flex md:flex-col md:flex-wrap md:justify-between md:h-[45%]'>
                <div className='mb-2' >
                    <h3 className='mb-2 text-2xl font-extrabold hover:text-lime-700 duration-500  ' ><Link to={`/post/${post.$id}`}>{(post.Title).substring(0, 50) + "..."}</Link></h3>
                    <div className='text-sm font-medium flex' >{Parser(post.Content.substring(0, 120)+"...")}</div>
                </div>
                <div className='flex justify-between items-center text-sm font-medium' >
                    <p>{post.View ? `${post.View} views` : "No View"}</p>
                    <p><TimeAgo date={post.$createdAt}/> ago</p>
                </div>
            </div>
        </div>
    )
}

export default PostCard;