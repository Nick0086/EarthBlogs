import React, { useEffect, useState } from 'react'
import postService from '../../Appwrite/PostData';
import Parser from 'html-react-parser';

function DetailPostCard({post}) {

    const [img, setImg] = useState();

    useEffect(() => {
        postService.getFilePreview(post.Featureimage)
            .then((res) => setImg(res.href))
            .catch((error) => console.error("error in image previwe", error))
    })

    return (
        <div className='container' >
            <div className='w-3/4 pt-16 mx-auto' >
                <img src={img} className=' w-2/3 aspect-video rounded-xl' alt="" />
                <h3>{(post.Title)}</h3>
                <h3>{Parser(post.Content)}</h3>
            </div>
        </div>
    )
}

export default DetailPostCard