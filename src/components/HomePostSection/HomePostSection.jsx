import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'
import postService from '../../Appwrite/PostData';
import Spinner from "../Spinner/Spinner"

function HomePostSection() {

    const [postData, setPostData] = useState();
    const [Loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(false)
        postService.getAllPost()
            .then((res) => {
                console.log(res)
                // Shuffle the array of posts
                const shuffledPosts = res.documents.sort(() => 0.5 - Math.random());
                // Get the first 12 posts
                const randomPosts = shuffledPosts.slice(0, 12);
                // Set the state with the random posts
                setPostData(randomPosts);
                console.log(randomPosts)
            })
            .then((res) => console.log(res))
            .finally(() => setLoading(true))
    }, [])

    return (
        <>
            {
                Loading ?
                    <div className='bg-gray-50' >
                        <div className='py-14 container '>
                            <h2 className='text-5xl font-bold text-center capitalize mb-10' >feature post</h2>
                            <div className='grid grid-cols-12 gap-8 gap-y-10' >
                                {
                                    postData && postData.map((post) => (
                                        <div key={post.$id} className='col-span-4 ' >
                                            <PostCard post={post} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>:
                    <Spinner/>
            }
        </>
    )
}

export default HomePostSection