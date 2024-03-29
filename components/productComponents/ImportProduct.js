import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {useDispatch} from "react-redux";
import {uploadProduct} from "../../public/src/features/productSlice";
import {toast} from "react-hot-toast";

const ImportProduct = () => {



    //blok toggle modal
    const [openModal, setOpenModal] = useState(false);
    const [productState, setProduct] = useState(undefined);


    const toggleOpenModal = () => {
        setOpenModal(true)
    }
    const toggleCloseModal = () => {
        setOpenModal(false)
    }




    const handleInputChange = event => {
            setProduct(event.target.files[0])

    };


    const uploadFile = (e)=>{
        e.preventDefault()

        dispatch(uploadProduct(productState))
            .unwrap()
            .then(data=>{
                toggleCloseModal()
                toast.success("Added Successfully!")
            }).catch(e=>{
                console.log(e)
        })
    }

    const dispatch = useDispatch();

    return (
        <div>
            <div className={"flex ml-5 mb-2"}>
                <button onClick={toggleOpenModal} className={"w-full md:w-auto bg-gray-900 text-white font-medium py-2 px-3 rounded"} >Import Product</button>
            </div>

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
                                        Upload Product
                                    </Dialog.Title>
                                    <form>
                                        <div className="mt-2 ">
                                            <div className="mb-6">
                                                <label htmlFor="default-input"
                                                       className="block mb-2 text-sm font-medium text-gray-900">Import</label>
                                                <input type="file" id="uploadFile" onChange={handleInputChange}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>

                                        </div>

                                        <div className="mt-4 border-t dark:border-gray-600">
                                            <button
                                                type="button" onClick={uploadFile}
                                                className="inline-flex mt-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            >
                                                Upload
                                            </button>
                                        </div>
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ImportProduct;
