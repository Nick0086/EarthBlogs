import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import PostCard from '../PostCard/PostCard';
import postService from '../../Appwrite/PostData';
import Selector from '../Selector';


function AllPosts() {

    const [userPosts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [filterValue, setFilterValue] = useState("None")
    const { category } = useParams();

    const filterpost = {
        Category: category ? category : null,
        offset: parseInt(offset),
    }
    const handleFilterChange = (value) => {
        setFilterValue(value.target.value);
    };

    const getpost = async () => {
        setLoading(false)
        try {
            await postService.getFiterPost({ ...filterpost })
                .then((res) => {

                    let sortedPosts;
                    switch (filterValue) {
                        case "Most view":
                            sortedPosts = res.documents.sort((a, b) => b.View - a.View);
                            break;
                        case "Less View":
                            sortedPosts = res.documents.sort((a, b) => a.View - b.View);
                            break;
                        case "New Post":
                            sortedPosts = res.documents.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
                            break;
                        case "Old Posts":
                            sortedPosts = res.documents.sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt));
                            break;
                        default:
                            sortedPosts = res.documents.sort(() => 0.5 - Math.random());
                    }
                    setPosts(sortedPosts);
                })
        } catch (error) {
            console.error(error)
        }
        setLoading(true);
    }
    useEffect(() => {
        getpost();
    }, [category, filterValue, offset])

    return (

        <div className=' md:py-12 py-10' >
            <div className='lg:w-[95%] mx-auto flex justify-between items-center mb-6' >
                <h2 className='md:text-3xl text-center text-2xl font-bold ' >{category ? category : "All Posts"}</h2>
                <Selector
                    mainDivClass="filter-width flex items-center "
                    options={["None", "Most view", "Less View", "New Post", "Old Posts"]}
                    onChange={handleFilterChange}
                />
            </div>
            {
                loading ?
                    <div className='grid grid-cols-12 md:gap-8 md:gap-y-10 gap-y-6' >
                        {userPosts.length !== 0 ? userPosts.map((data) => (
                            <div className='lg:col-span-4 md:col-span-6 col-span-12' key={data.$id}>
                                <PostCard post={data} />
                            </div>
                        )) :
                            <h2 className='text-4xl font-bold flex justify-center items-center h-[70vh] ' >No post available</h2>
                        }
                    </div>
                    : <div className='col-span-full' >
                        <Spinner />
                    </div>
            }
        </div>
    )
}
export default AllPosts