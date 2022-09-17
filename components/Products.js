import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, getProducts} from "../public/src/features/productSlice";
import {getCategories} from "../public/src/features/categorySlice";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import Toast from "./Toast";
import {toast} from "react-hot-toast";
import ImportProduct from "./ImportProduct";



const Products = () => {



    //blok toggle modal
    const [openModal, setOpenModal] = useState(false);

    const toggleCloseModal = () => {
        setOpenModal(false)
    }

    //usestate
    const [productId, setProductId] = useState("");

    //blok goblok
    const products = useSelector(state=> state.products)

    const dispatch = useDispatch();


    //block fetch data
    const initFetch = useCallback(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, [dispatch])

    useEffect(() => {
        initFetch()
    }, [initFetch])




    const removeProduct = (e,id) =>{

        e.preventDefault();

        dispatch(deleteProduct({id:id}))
            .unwrap()
            .then(()=>{
                toggleCloseModal()
                toast.success("deleted successfully")
            }).catch(e=>{
                console.log(`hehe`+e)
        })
    }

    const editProduct = (e, id) => {
        e.preventDefault();
        setProductId(id);
        setOpenModal(true)
    };

    return (
           <div className={"bg-gray-200 flex-grow h-screen w-full pt-6 mr-6 overflow-y-auto mt-6 "}>
                <Toast />
                    <div className={"md:flex"}>
                        <AddProduct />
                        <ImportProduct />
                    </div>
                   <div className="ml-5 overflow-x-auto relative shadow-md rounded-lg">
                       <table id={"table"} className="w-full text-sm text-left text-gray-500 ">
                           <thead className="text-xs text-white uppercase dark:bg-gray-900 dark:border-gray-700">
                           <tr>
                               <th scope="col" className="py-3 px-6">
                                   Product name
                               </th>
                               <th scope="col" className="py-3 px-6">
                                   Category
                               </th>
                               <th scope="col" className="py-3 px-6">
                                   Price
                               </th>
                               <th scope="col" className="py-3 px-6">
                                   Action
                               </th>
                           </tr>
                           </thead>
                           <tbody>
                           {products.map((product)=>(
                               <tr className="bg-white border-b" key={product.id}>
                                   <th scope="row"
                                       className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                       {product.name}
                                   </th>
                                   <td className="py-4 px-6">
                                       {product.category}
                                   </td>
                                   <td className="py-4 px-6">
                                       {product.price}
                                   </td>
                                   <td className="py-4 px-6">
                                       <a href="#"  onClick={(e) => editProduct(e, product.id)}
                                          className="font-medium text-blue-600 px-1 hover:underline">Edit</a>
                                       <a href="#"  onClick={(e) => removeProduct(e, product.id)}
                                          className="font-medium text-blue-600 px-1 hover:underline">Delete</a>
                                   </td>
                               </tr>
                           ))}


                           </tbody>
                       </table>
                   </div>
               <EditProduct openModal={openModal} toggleCloseModal = {toggleCloseModal} productId={productId} />
           </div>


    );
};

export default Products;
