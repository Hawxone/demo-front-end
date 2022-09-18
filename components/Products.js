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
import ReactPaginate from "react-paginate";

function Items ({currentItems,editProduct,removeProduct}){

    return(
        <tbody>
        {currentItems && currentItems.map((product)=>(
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
    )
}



const Products = ({itemsPerPage}) => {

    //blok toggle modal
    const [openModal, setOpenModal] = useState(false);
    const [product, setProduct] = useState(null);

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
        setProduct(products)
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

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(products.slice(itemOffset,endOffset))
        setPageCount(Math.ceil(products.length/itemsPerPage))
    }, [itemOffset,itemsPerPage,products]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
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
                            <Items currentItems={currentItems} editProduct={editProduct} removeProduct={removeProduct} />
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
               <EditProduct openModal={openModal} toggleCloseModal = {toggleCloseModal} productId={productId} />
           </div>


    );
};

export default Products;
