import React, {useCallback, useEffect, useState} from 'react';
import AddBlog from "./AddBlog";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteBlog, getPaginatedBlogs,
} from "../../public/src/features/blogSlice";
import EditBlog from "./EditBlog";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import {useRouter} from "next/router";
import blogService from "../../services/BlogService";
import {Pagination} from "@mui/material";
import Image from "next/image";



function Items ({currentItems}){
    const dispatch = useDispatch();


    const removeBlog = (e,id)=>{
        e.preventDefault()

        dispatch(deleteBlog({id:id}))
            .unwrap()
            .then(()=>{

            }).catch(e=>{
            console.log(`hehe`+e)
        })

    }

    return(
        <tbody>
        {currentItems && currentItems.map((blog)=>(
            <tr className="bg-white border-b" key={blog.id}>
                <th scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    {blog.title}
                </th>
                <td className="py-4 px-6 flex">
                    { blog.tags.map((tag)=>(
                        <div key={tag.id} className={"flex py-1 px-2 mx-0.5 bg-blue-600 text-white rounded"}>
                           {tag.label}
                        </div>
                    ))}
                </td>
                <td className="py-4 px-6">
                    {blog.subtitle}
                </td>
                <td className="py-4 px-6">
                    {blog.posted}
                </td>
                <td className="py-4 px-6">
                    <img loading={"lazy"} src={blog.imageUrl} width={100} height={100}/>
                </td>
                <td className="py-4 px-6">
                    <EditBlog id={blog.id} />
                    <a href="components/productComponents/Products#" onClick={(e) => removeBlog(e, blog.id)}
                       className="font-medium text-blue-600 px-1 hover:underline">Delete</a>
                </td>
            </tr>
        ))}


        </tbody>
    )
}

const BlogListPaginated = () => {
    const router = useRouter()
    const {pid} = router.query
    const [blog, setBlog] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);


    const dispatch = useDispatch();
    const bloge = useSelector(state => state.blogs)
    console.log(bloge)

    const getRequestParams = (page, pageSize) => {
        let params = {};

        if (page) {
            params["page"] = page-1;

        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };



    const retrieveBlogs = ()=>{
        const params = getRequestParams(page,pageSize);
            dispatch(getPaginatedBlogs({params})).unwrap().then(()=>{
                setBlog(bloge.blogs)
                setCount(bloge.totalPages)
            })


      /*          blogService.getAllPaginated(params)
                    .then((response)=>{
                        const {blogs,totalPages} = response.data;

                        setBlog(blogs);
                        setCount(totalPages)

                    }).catch((e)=>{
                    console.log(e)
                })*/
    }

    useEffect(retrieveBlogs,[dispatch,page,pageSize])


    useEffect(() => {
     if(router.isReady){
         setPage(+pid)

     }

    }, [router.isReady]);


    const handlePageChange = (event, value) => {
        router.push("/blog/server-paginated/"+value,undefined,{shallow:true})
        setPage(value);
    };




    return (
        <div className={"bg-gray-200 flex-grow h-screen w-full pt-6 mr-6 overflow-y-auto mt-6 "}>
            <div className={"md:flex"}>
                <AddBlog />
            </div>
            <div className="ml-5 overflow-x-auto relative shadow-md rounded-lg">
                <table id={"table"} className={"w-full text-sm text-left text-gray-500"}>
                    <thead className="text-xs text-white uppercase dark:bg-gray-900 dark:border-gray-700">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Blog Title
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Tags
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Subtitle
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Posted Date
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Image
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                    </thead>

                    <Items  currentItems={bloge.blogs} />
                </table>

                <Pagination
                    className="my-3"
                    count={bloge.totalPages}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                />

            </div>



        </div>
    );
};

export default BlogListPaginated;
