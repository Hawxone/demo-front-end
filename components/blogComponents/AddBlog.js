import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import Select from "react-select";
import {RiDeleteBin6Line} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {getTags} from "../../public/src/features/TagSlice";
import {saveBlog} from "../../public/src/features/blogSlice";



const AddBlog = () => {

    const initialBlogState = {
        id:null,
        title:"",
        subtitle:"",
        content:"",
        imageUrl:"",
        tags:[],
        posted:""
    }

    const tags = useSelector(state => state.tags)
    const dispatch = useDispatch();

    const initFetch = useCallback(()=>{
        dispatch(getTags())
    },[dispatch])

    useEffect(() => {
        initFetch()
    }, [initFetch])


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



    const [blogState, setBlogState] = useState(initialBlogState);

    //input handler
    const handleInputChange = event => {
        const { id, value } = event.target;
        setBlogState({ ...blogState, [id]: value });
    };

    //input handler
    const handleSelectInputChange = event => {
        setBlogState({...blogState,tags:event})
    };

/*    const addImageToPost = (e)=>{
        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                setBlogState({...blogState,file: e.target.result});
            }
        }
    }*/



    //blok toggle modal
    const [openModal, setOpenModal] = useState(false);
    const toggleOpenModal = () => {
        setOpenModal(true)
    }
    const toggleCloseModal = () => {
        setOpenModal(false)
        setBlogState(initialBlogState)
    }


    const saveBlogTrigger =(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("title",blogState.title)
        formData.append("subtitle",blogState.subtitle)
        formData.append("content",blogState.content)
        formData.append("image",blogState.imageUrl)
        formData.append("tags",JSON.stringify(blogState.tags))
        formData.append("posted",blogState.posted)

        dispatch(saveBlog({formData, blogState}))
            .unwrap()
            .then(data=>{
                console.log(data)
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
                                        Input Product
                                    </Dialog.Title>
                                    <form>
                                        <div className="mt-2 ">
                                            <div className="mb-6">
                                                <label htmlFor="default-input"
                                                       className="block mb-2 text-sm font-medium text-gray-900">Blog Title</label>
                                                <input type="text" id="title" value={blogState.title||""} onChange={handleInputChange}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>


                                            <div className="mb-6">
                                                <label htmlFor="default-input"
                                                       className="block mb-2 text-sm font-medium text-gray-900">Subtitle</label>
                                                <input type="text" id="subtitle" value={blogState.subtitle||""} onChange={handleInputChange}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>

                                            <div className="mb-6">
                                                <label htmlFor="default-input"
                                                       className="block mb-2 text-sm font-medium text-gray-900">Content</label>
                                                <textarea id="content" value={blogState.content||""} onChange={handleInputChange}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>
                                            <div className="mb-6">
                                                <label htmlFor="default-input"
                                                       className="block mb-2 text-sm font-medium text-gray-900">Header Image</label>
                                                <input id="imageUrl" type={"text"} onChange={handleInputChange}
                                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>
                                            {blogState.file && (
                                                <div className={"mb-6"}>
                                                    <div  className={"flex items-center py-2 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer"}>
                                                        <img src={blogState.file} className={"h-full w-full"}  alt={"pic"}/>
                                                        <RiDeleteBin6Line className={"absolute hover:text-red-500 bg-white rounded-lg px-1 py-1 text-3xl"} />
                                                    </div>
                                                </div>
                                            )}


                                            <label htmlFor="default-input"
                                                   className="block mb-2 text-sm font-medium text-gray-900">Tags</label>
                                            <Select className={"mb-6"}
                                                    styles={customStyles}
                                                    isMulti={true}
                                                onChange={handleSelectInputChange}
                                                options={tags}
                                            />

                                        </div>

                                        <div className="mt-4 border-t dark:border-gray-600">
                                            <button onClick={saveBlogTrigger}
                                                type="button"
                                                className="inline-flex mt-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <div className={"flex ml-5 mb-2"}>
                <button className={"w-full md:w-auto bg-gray-900 text-white font-medium py-2 px-3 rounded"} onClick={toggleOpenModal} >Create new</button>
            </div>
        </div>
    );
};

export default AddBlog;
