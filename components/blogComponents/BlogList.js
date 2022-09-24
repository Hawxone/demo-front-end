import React, {useCallback, useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import AddBlog from "./AddBlog";
import {useDispatch, useSelector} from "react-redux";
import {deleteBlog, getBlogs} from "../../public/src/features/blogSlice";
import EditBlog from "./EditBlog";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";


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
                    { blog.tags.map((tag,index)=>(
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
                    <EditBlog id={blog.id} />
                    <a href="components/productComponents/Products#" onClick={(e) => removeBlog(e, blog.id)}
                       className="font-medium text-blue-600 px-1 hover:underline">Delete</a>
                </td>
            </tr>
        ))}


        </tbody>
    )
}

const BlogList = ({itemsPerPage}) => {
    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch();


    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [blog, setBlog] = useState(null);

    const initFetch = useCallback(()=>{
        dispatch(getBlogs());
        setBlog(blogs)

    },[dispatch])

    useEffect(() => {
        initFetch()
    }, [initFetch])



    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(blogs.slice(itemOffset,endOffset))
        setPageCount(Math.ceil(blogs.length/itemsPerPage))
    }, [itemOffset,itemsPerPage,blogs]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % blogs.length;
        setItemOffset(newOffset);
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
                            Action
                        </th>
                    </tr>
                    </thead>
                    <Items currentItems={currentItems} />
                </table>
            </div>

            <nav className={"ml-5 mt-3 isolate overflow-x-auto w-fit shadow-md rounded-lg"}>
                <ReactPaginate
                    containerClassName={"isolate inline-flex -space-x-px rounded-md shadow-sm"}
                    pageLinkClassName={"relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"}
                    previousLinkClassName={"relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"}
                    nextLinkClassName={"relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"}
                    activeLinkClassName={"relative z-10 inline-flex items-center border border-gray-900 bg-gray-900 text-sm font-medium text-white focus:z-20"}
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </nav>
        </div>
    );
};

export default BlogList;
