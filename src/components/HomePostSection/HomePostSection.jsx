import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'
import postService from '../../Appwrite/PostData';
import Spinner from "../Spinner/Spinner"
import Button from "../Button"
import { useNavigate } from 'react-router-dom';

function HomePostSection() {

    const [postData, setPostData] = useState();
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate();
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
            })
            .finally(() => setLoading(true))
    }, [])

    return (
        <>
            {
                Loading ?
                    <div className='bg-gray-50' >
                        <div className='md:py-14 py-8 container '>
                            <h2 className='md:text-5xl text-4xl font-bold text-center capitalize md:mb-10 mb-6' >feature post</h2>
                            <div className='grid grid-cols-12 md:gap-8 md:gap-y-10 gap-y-6' >
                                {
                                    postData && postData.map((post) => (
                                        <div key={post.$id} className='lg:col-span-4 md:col-span-6 col-span-12 ' >
                                            <PostCard post={post} />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='text-center mt-6' >
                                <Button onClick={() => navigate('/AllPosts')} >View More</Button>
                            </div>
                        </div>
                    </div> :
                    <Spinner />
            }
        </>
    )
}

export default HomePostSection