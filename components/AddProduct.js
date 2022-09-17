import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {saveProduct} from "../public/src/features/productSlice";
import {useDispatch, useSelector} from "react-redux";
import Toast from "./Toast";
import {toast} from "react-hot-toast";

const AddProduct = () => {

    //blok toggle modal
    const [openModal, setOpenModal] = useState(false);
    const toggleOpenModal = () => {
        setOpenModal(true)
    }
    const toggleCloseModal = () => {
        setOpenModal(false)
    }

    const initialProductState = {
        id:null,
        name:"",
        categoryId:"",
        category:"",
        price:0,
        timestamp:""
    }

    //selectors
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch();

    //state
    const [productState, setProduct] = useState(initialProductState);
    const [submitted, setSubmitted] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(initialProductState);
    const [message, setMessage] = useState("");




    //input handler
    const handleInputChange = event => {
        const { id, value } = event.target;
        setProduct({ ...productState, [id]: value });
    };
    const handleSelectChange = event =>{
        const index = event.nativeEvent.target.selectedIndex
        const el = event.nativeEvent.target[index].text
        const { id, value } = event.target;
        setProduct({ ...productState, categoryId:value,category: el });
        console.log(productState)

    }

    //save product
    const saveProductConst = ()=>{
        const {name,categoryId,category,price,timestamp} = productState;
        dispatch(saveProduct({name,categoryId,category,price,timestamp}))
            .unwrap()
            .then(data=>{
                setProduct({
                    id:data.id,
                    name: data.name,
                    categoryId: data.categoryId,
                    category: data.category,
                    price: data.price,
                    timestamp: ""
                })
                toggleCloseModal()
                toast.success("Added Successfully!")
                setSubmitted(true);
            }).catch(e=>{
            console.log(e)
        })
    }




    return (
        <div>
            <Toast />
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
                                                       className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                                                <input type="text" id="name" value={productState.name||""} onChange={handleInputChange}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>
                                            <div className="mb-6">
                                                <label htmlFor="countries"
                                                       className="block mb-2 text-sm font-medium text-gray-900">Select
                                                    Category</label>
                                                <select id="category" value={productState.categoryId||""} onChange={handleSelectChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                    <option defaultValue={"-"}>Choose Option</option>
                                                    {categories.map((category)=>(
                                                        <option key={category.id} value={category.id}>{category.name}</option>
                                                    ))}
                                                </select>

                                            </div>

                                            <div className="mb-6">
                                                <label htmlFor="default-input"
                                                       className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                                <input type="number" id="price" value={productState.price||""} onChange={handleInputChange}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>
                                        </div>

                                        <div className="mt-4 border-t dark:border-gray-600">
                                            <button
                                                type="button"
                                                className="inline-flex mt-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={saveProductConst}
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

export default AddProduct;
