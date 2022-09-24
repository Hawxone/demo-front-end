import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {RiDeleteBin6Line} from "react-icons/ri";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {getTags} from "../../public/src/features/TagSlice";
import BlogService from "../../services/BlogService";
import {updateBlog} from "../../public/src/features/blogSlice";

const EditBlog = (id) => {
    const [blogId, setBlogId] = useState("");
    const initialBlogState = {
        id:null,
        title:"",
        subtitle:"",
        content:"",
        image:undefined,
        file:undefined,
        tags:[],
        posted:""
    }

    const [currentBlog, setCurrentBlog] = useState(initialBlogState);
    const dispatch = useDispatch()

    const tags = useSelector(state => state.tags)

    //blok fetch data
    const initFetch = useCallback(() => {
        dispatch(getTags());
    }, [dispatch])

    useEffect(() => {
        initFetch()
    }, [initFetch])

    const getBlogs = id =>{
        setBlogId(id)

        BlogService.get(id).then(
            res =>{
                setCurrentBlog(res.data)
            }

            ).catch(e=>{
            console.log(e)
        })

    }
    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            width: `100%`,
            borderBottom: '1px dotted pink',
            color: 'black',
            zIndex:9999,
            position:'relative'
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor:`rgb(249,250,251)`,
            borderRadius:`0.5rem`,
            width: `100%`,
            paddingTop:`0.190rem`,
            paddingBottom:`0.190rem`
        }),
    }





    //blok toggle modal
    const [openModal, setOpenModal] = useState(false);


    const toggleCloseModal = () => {
        setOpenModal(false)
        setCurrentBlog(initialBlogState)
    }

    const editBlog = (e, id) => {
        e.preventDefault();
        getBlogs(id.id);
        setOpenModal(true)
    };

    //input handler
    const handleInputChange = event => {
        const { id, value } = event.target;
        setCurrentBlog({ ...currentBlog, [id]: value });
    };

    //input handler
    const handleSelectInputChange = event => {
        setCurrentBlog({...currentBlog,tags:event})
    };

    const triggerUpdate=(e)=> {
        e.preventDefault()
        const formData = new FormData();
        formData.append("title",currentBlog.title)
        formData.append("subtitle",currentBlog.subtitle)
        formData.append("content",currentBlog.content)
        formData.append("file",currentBlog.file)
        formData.append("tags",JSON.stringify(currentBlog.tags))
        formData.append("posted",currentBlog.posted)
        console.log(currentBlog)
        dispatch(updateBlog({id: currentBlog.id,formData:formData,currentBlog:currentBlog}))
            .unwrap()
            .then(data=>{
                toggleCloseModal()
            }).catch(e=>{
            console.log(e)
        })
    }

    return (
        <div>
            <Transition appear show={openModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={toggleCloseModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as={"div"} className="w-full  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 border-b border-gray-600"
                                    >
                                        Edit Product
                                    </Dialog.Title>
                                    <form>
                                        <div className="mt-2 ">
                                            <div className="mb-6">
                                                <label htmlFor="default-input"
                                                       className="block mb-2 text-sm font-medium text-gray-900">Blog Title</label>
                                                <input type="text" id="title" value={currentBlog.title||""} onChange={handleInputChange}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>


                                            <div className="mb-6">
                                                <label htmlFor="default-input"
                                                       className="block mb-2 text-sm font-medium text-gray-900">Subtitle</label>
                                                <input type="text" id="subtitle" value={currentBlog.subtitle||""} onChange={handleInputChange}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>

                                            <div className="mb-6">
                                                <label htmlFor="default-input"
                                                       className="block mb-2 text-sm font-medium text-gray-900">Content</label>
                                                <textarea id="content" value={currentBlog.content||""} onChange={handleInputChange}
                                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>
                                            <div className="mb-6">
                                                <label htmlFor="default-input"
                                                       className="block mb-2 text-sm font-medium text-gray-900">Header Image</label>
                                                <input id="file" type={"file"} disabled={true}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>
                                            {currentBlog.image && (
                                                <div className={"mb-6"}>
                                                    <div  className={"flex items-center py-2 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer"}>
                                                        <img src={currentBlog.image} className={"h-full w-full"}  alt={"pic"}/>
                                                        <RiDeleteBin6Line className={"absolute hover:text-red-500 bg-white rounded-lg px-1 py-1 text-3xl"} />
                                                    </div>
                                                </div>
                                            )}


                                            <label htmlFor="default-input"
                                                   className="block mb-2 text-sm font-medium text-gray-900">Tags</label>
                                            <Select className={"mb-6"}
                                                    styles={customStyles}
                                                    value={currentBlog.tags}
                                                    isMulti={true}
                                                    onChange={handleSelectInputChange}
                                                    options={tags}
                                            />

                                        </div>

                                        <div className="mt-4 border-t dark:border-gray-600">
                                            <button onClick={triggerUpdate}
                                                    type="button"
                                                    className="inline-flex mt-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <a href="components/productComponents/Products#" onClick={(e) => editBlog(e, id)}
               className="font-medium text-blue-600 px-1 hover:underline">Edit</a>
        </div>
    );
};

export default EditBlog;
