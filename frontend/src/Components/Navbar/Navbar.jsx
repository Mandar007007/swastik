import { NavLink } from 'react-router-dom'

function Navbar() {

    return (
        <>
                <nav  data-scroll data-scroll-position="top" data-scroll-delay="0.06" data-scroll-speed="3"className=" bg-white border-gray-200 dark:bg-gray-900">
                    <div class="absolute -inset-1 rounded-lg"></div>
                    <div className="relative">
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto lg:px-16 px-8 py-4">
                            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                                {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
                                <span className="self-center text-2xl font-bold text-red-600 whitespace-nowrap dark:text-white">Swastik</span>
                            </a>
                            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                <button class="inline-flex items-center justify-center p-0.5 overflow-hidden md:text-sm text-[12px] font-medium text-gray-900 group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                    <span class="relative md:px-3 md:py-2.5 px-2 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
                                        Login/Register
                                    </span>
                                </button>
                                <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                    </svg>
                                </button>
                            </div>
                            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                    <li>
                                        <NavLink to="hello" className="block py-2 px-3 md:p-0 lg:text-red-400 text-white bg-red-400 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 " aria-current="page" >Home</NavLink>
                                        {/* <a href="#" class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500" aria-current="page">Home</a> */}
                                    </li>
                                    <li>
                                        <NavLink to="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
        </>
    )
}
export default Navbar