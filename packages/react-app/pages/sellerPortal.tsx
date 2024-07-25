import React, {useState } from 'react'
import  { useRouter } from "next/router"
import Link from "next/link"


const SellerPortal: React.FC = () =>{



    return (
        <div className="flexbox p-4 mt-6 w-400 py-10"> 
        <div className="w-full text-center bg-white border border-black-200 rounded-lg shadow sm:p-8 dark:bg-transparent dark:border-orange-600 p-5">
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-orange-600">Manage Sneakers</h5>
            <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-zinc-950">Welcome to your sneaker management hub! Here, you can effortlessly list new sneakers, update details, adjust prices, or remove items from your inventory.</p>
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                <div className="flex flex-wrap">
                

                <Link href="/sellerProducts" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-orange-600 text-orange-600 rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-zinc-300 dark:hover:bg-zinc-200 dark:hover:border-orange-600 dark:focus:ring-orange-600 m-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 mr-2"
                >
                    <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
                </svg>                  
                <div className="text-left rtl:text-right">
                        <div className="-mt-1 font-sans text-sm font-semibold">List Sneaker</div>
                    </div>
                </Link>
                <Link href="#" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-orange-600 rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-zinc-300 dark:hover:bg-zinc-200 dark:focus:ring-orange-600 m-2">
                <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6 mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>                    
  <div className="text-left rtl:text-right">
                        <div className="-mt-1 font-sans text-sm font-semibold">Update Sneaker</div>
                    </div>
                </Link>
                <Link href="#" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-orange-600 rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-zinc-300 dark:hover:bg-zinc-200 dark:focus:ring-orange-600 m-2">
                <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6 mr-2"
  >
    <path
      fillRule="evenodd"
      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
      clipRule="evenodd"
    />
  </svg>                   
  <div className="text-left rtl:text-right">
                        <div className="-mt-1 font-sans text-sm font-semibold">Unlist Sneaker</div>
                    </div>
                </Link>
                </div>
                <Link href="#" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-orange-600 rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-zinc-300 dark:hover:bg-zinc-200 dark:focus:ring-orange-600">
                <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6 mr-2"
  >
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path
      fillRule="evenodd"
      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
      clipRule="evenodd"
    />
  </svg>                   
  <div className="text-left rtl:text-right">
                        <div className="-mt-1 font-sans text-sm font-semibold">View All My Sneakers</div>
                    </div>
                </Link>
            </div>
            
        </div>

        <div className="w-full text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-transparent dark:border-orange-600 p-5 mt-5">
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-forest">Manage Orders</h5>
            <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-zinc-950">Stay on top of your sales with the order management tool. Track order statuses, update shipping details, and view all your orders.</p>
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                <div className="flex">
                <Link href="#" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-orange-600 rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-zinc-300 dark:hover:bg-zinc-200 dark:focus:ring-orange-600 m-2">
                <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6 mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
    />
  </svg>                    <div className="text-left rtl:text-right">
                        <div className="-mt-1 font-sans text-sm font-semibold">Unfulfilled Orders</div>
                    </div>
                </Link>
                <Link href="#" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-orange-600 rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-zinc-300 dark:hover:bg-zinc-200 dark:focus:ring-orange-600 m-2">
                <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6 mr-2"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      clipRule="evenodd"
    />
  </svg>                    <div className="text-left rtl:text-right">
                        <div className="-mt-1 font-sans text-sm font-semibold">Completed Orders</div>
                    </div>
                </Link>
                </div>
            </div>
            <Link href="#" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-orange-600 rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-zinc-300 dark:hover:bg-zinc-200 dark:focus:ring-orange-600 m-2">
            <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6 mr-2"
  >
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path
      fillRule="evenodd"
      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
      clipRule="evenodd"
    />
  </svg>                      <div className="text-left rtl:text-right">
                        <div className="-mt-1 font-sans text-sm font-semibold">View All My Orders</div>
                    </div>
                </Link>
        </div>
        </div>


    )    
}
export default SellerPortal;