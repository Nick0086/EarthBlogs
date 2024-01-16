import React from 'react'
import { useSelector } from 'react-redux'
import PostCard from '../PostCard/PostCard'
import { Container } from 'postcss'

function HomePostSection() {

    const postData = useSelector((state) => state.post.postData)
    console.log("postData", postData)


    return (
            <div className='my-10 container ' >
                <div className='grid grid-cols-12 gap-4' >
                    {
                        postData && postData.documents.map((post) => (
                            <div key={post.$id} className='col-span-4 p-2 bg-slate-400 rounded-xl' >
                                <PostCard post={post} />
                            </div>
                        ))
                    }
                </div>
            </div>
    )
}

export default HomePostSection