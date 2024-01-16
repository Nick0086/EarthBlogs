import React, { useEffect, useState } from 'react'
import { DetailPostCard, Spinner } from '../components'
import { useParams } from 'react-router-dom';
import postService from '../Appwrite/PostData';

function FullPostCardPage() {

    const { postid } = useParams();
    const [post, setPost] = useState('');
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)
        if (postid) {
            postService.getPost(postid)
                .then((res) => setPost(res))
                .catch((error) => console.error("error in fetch post for view", error))
                .finally(() => setLoading(false))
        }
    }, [postid])




    return (
        <>
            {
                loading ? <Spinner /> : <div><DetailPostCard post={post} /></div>
            }
        </>
    )
}

export default FullPostCardPage;