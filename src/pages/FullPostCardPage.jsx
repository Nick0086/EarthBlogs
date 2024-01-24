import React, { useEffect, useState } from 'react'
import { DetailPostCard, PostCard, Spinner } from '../components'
import { useParams } from 'react-router-dom';
import postService from '../Appwrite/PostData';

function FullPostCardPage() {

    const { postid } = useParams();
    const [post, setPost] = useState('');
    const [relatedPost, setRelatedPost] = useState(null);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)

        if (postid) {
            postService.getPost(postid)
                .then((res) => {
                    setPost(res)

                    postService.getFiterPost({ Category: res.Category })
                        .then((res) => {
                            let relateds = res.documents.filter((item) => item.$id !== postid)
                            const shuffledPosts = relateds.sort(() => 0.5 - Math.random());
                            setRelatedPost(shuffledPosts)
                        })

                })
                .catch((error) => console.error("error in fetch post for view", error))
                .finally(() => setLoading(false))
        }

    }, [postid])


    return (
        <>
            {
                loading ? <Spinner /> :

                    <div className='container' >
                        <div className='grid grid-cols-12 pt-20'  >
                            <div className='col-span-8' >
                                <DetailPostCard post={post} />
                            </div>
                            <div className='col-span-4'>
                                <div className='grid grid-cols-12  md:gap-y-10 gap-y-6' >
                                    {
                                        relatedPost && relatedPost.map((post) => (
                                            <div key={post.$id} className=' col-span-12 ' >
                                                <PostCard post={post} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default FullPostCardPage;