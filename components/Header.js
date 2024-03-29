import Link from "next/link";
import { Menu, Transition } from '@headlessui/react'
import {Fragment} from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";

import {logout} from "../public/src/features/UserSlice"

const Header = () => {

    const { userInfo } = useSelector((state) => state.users)
    const dispatch = useDispatch();

    const router = useRouter();
    const currentRoute = router.pathname;
    const navItems = [
        {
            name:"Home",
            href:"/"
        },
        {
            name:"Products",
            href:"/products"
        },
        {
            name:"Blog",
            href:"/blog"
        },
        {
            name:"Blog Server side paginated",
            href:"/blog/server-paginated/1"
        },
        {
            name:"AWS S3 Upload",
            href:"/awsupload"
        },
        {
            name:"About",
            href:"/about"
        },
        {
            name:"Gallery",
            href:"/image"
        },
        {
            name:"External Gallery",
            href:"/external"
        },
    ]

    return (
        <nav className="px-2 bg-white border-gray-200 bg-gray-900 border-gray-700 sticky top-0 z-50">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="#" className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-10"
                         alt="Flowbite Logo"/>
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Flowbite</span>
                </a>
                <button data-collapse-toggle="mobile-menu" type="button"
                        className="inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-400 hover:text-white focus:ring-gray-500"
                        aria-controls="mobile-menu-2" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clipRule="evenodd"></path>
                    </svg>
                </button>
                <div className={`hidden w-full md:block md:w-auto`}  id="mobile-menu">
                    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white bg-gray-800 md:bg-gray-900 border-gray-700">

                        {/*Nav list*/}
                        {navItems && navItems.map(item=>(
                            <li key={item.name}>
                                <div className={currentRoute === item.href? "text-white" : "" +"block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:text-gray-400 bg-blue-600 md:bg-transparent hover:text-white"}>
                                    <Link href={item.href}
                                          aria-current="page">{item.name}</Link>
                                </div>

                            </li>
                        ))}




                        <li>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="flex py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:text-gray-400 bg-blue-600 md:bg-transparent hover:text-white">
                                        More
                                        <ChevronDownIcon
                                            className="ml-2 -mr-1 h-5 w-5 text-gray-200 hover:text-gray-100"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                        <div className="px-1 py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${
                                                            active ? 'bg-gray-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >

                                                        Archive
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${
                                                            active ? 'bg-gray-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >

                                                        Move
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="px-1 py-1">
                                            <Menu.Item>

                                                {
                                                    userInfo?(
                                                        <button onClick={() => dispatch(logout())}  className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                                            logout
                                                        </button>
                                                    ): <Link href={"/auth/login"}>
                                                        <button  className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                                            login
                                                        </button>
                                                    </Link>
                                                }



                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </li>


                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
