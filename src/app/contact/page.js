"use client"

import {motion} from "framer-motion";

export default function Contact() {
    return (
        <div className="mt-10 lg:mt-24 p-6 lg:px-8 mx-auto max-w-7xl">
            <motion.div
                className="mb-12"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <h2 className="text-white font-semibold text-3xl">
                    Contact
                </h2>
                <p className="mt-3 text-white text-lg">Get in touch with me</p>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-between">
                <p className="text-lg text-slate-300 hover:text-white leading-7">
                    I am actively seeking freelance or remote opportunities in <strong>software engineering</strong>, <strong>full-stack development</strong>, and <strong>DevOps engineering</strong>.
                    <span className="bg-green-500 text-white rounded-md p-0.5 mr-1">I am also open to roles offering visa sponsorship.</span>

                    If you have any questions or potential opportunities, please feel free to reach out.
                </p>
            </div>

            <div className="mx-auto max-w-3xl mt-8">
                <div className="flex flex-wrap justify-center space-x-4 mx-4">
                    <a href="https://github.com/minhajul" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray hover:border-white hover:bg-white transition-all duration-300 group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                             fill="none" className="w-8 h-8 fill-current text-slate-300 group-hover:text-black transition-colors duration-300">
                            <path d="M15.5 6C9.69875 6 5 10.5882 5 16.2529C5 20.7899 8.00562 24.6219 12.1794 25.9804C12.7044 26.0701 12.9012 25.7625 12.9012 25.4934C12.9012 25.2499 12.8881 24.4425 12.8881 23.5838C10.25 24.058 9.5675 22.9558 9.3575 22.3791C9.23938 22.0843 8.7275 21.1743 8.28125 20.9308C7.91375 20.7386 7.38875 20.2644 8.26813 20.2516C9.095 20.2388 9.68563 20.9949 9.8825 21.3025C10.8275 22.8533 12.3369 22.4175 12.9406 22.1484C13.0325 21.4819 13.3081 21.0334 13.61 20.777C11.2737 20.5207 8.8325 19.6364 8.8325 15.7147C8.8325 14.5997 9.23938 13.6769 9.90875 12.9592C9.80375 12.7029 9.43625 11.6519 10.0138 10.2422C10.0138 10.2422 10.8931 9.97301 12.9012 11.2931C13.7413 11.0624 14.6338 10.947 15.5263 10.947C16.4188 10.947 17.3113 11.0624 18.1513 11.2931C20.1594 9.9602 21.0387 10.2422 21.0387 10.2422C21.6163 11.6519 21.2488 12.7029 21.1438 12.9592C21.8131 13.6769 22.22 14.5868 22.22 15.7147C22.22 19.6492 19.7656 20.5207 17.4294 20.777C17.81 21.0975 18.1381 21.7126 18.1381 22.6738C18.1381 24.0452 18.125 25.1474 18.125 25.4934C18.125 25.7625 18.3219 26.0829 18.8469 25.9804C20.9314 25.2935 22.7428 23.9854 24.026 22.2403C25.3092 20.4953 25.9996 18.4012 26 16.2529C26 10.5882 21.3013 6 15.5 6Z"></path>
                        </svg>
                    </a>

                    <a href="mailto:kmsohelinfo@gmail.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray hover:border-white hover:bg-white transition-all duration-300 group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                             fill="none" className="w-8 h-8 fill-current text-slate-300 group-hover:text-black transition-colors duration-300">
                            <path d="M5.07187 9.20292C5.2168 8.57709 5.57307 8.01832 6.08232 7.6181C6.59158 7.21789 7.22365 6.99996 7.875 7H25.125C25.7764 6.99996 26.4084 7.21789 26.9177 7.6181C27.4269 8.01832 27.7832 8.57709 27.9281 9.20292L16.5 16.0865L5.07187 9.20292ZM5 10.8207V20.8847L13.3418 15.8442L5 10.8207ZM14.7189 16.6758L5.27456 22.3807C5.50791 22.8657 5.87619 23.2753 6.33656 23.5619C6.79693 23.8486 7.33044 24.0005 7.875 24H25.125C25.6695 24.0001 26.2028 23.8479 26.6629 23.561C27.123 23.274 27.491 22.8643 27.724 22.3793L18.2796 16.6744L16.5 17.7468L14.7189 16.6744V16.6758ZM19.6582 15.8457L28 20.8847V10.8207L19.6582 15.8442V15.8457Z"></path>
                        </svg>
                    </a>

                    <a href="https://www.linkedin.com/in/minhajul52/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray hover:border-white hover:bg-white transition-all duration-300 group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                             fill="none"
                             className="w-8 h-8 fill-current text-slate-300 group-hover:text-black transition-colors duration-300">
                            <path d="M4 5.719C4 4.7695 4.789 4 5.7625 4H26.2375C27.211 4 28 4.7695 28 5.719V26.281C28 27.2305 27.211 28 26.2375 28H5.7625C4.789 28 4 27.2305 4 26.281V5.719ZM11.4145 24.091V13.2535H7.813V24.091H11.4145ZM9.6145 11.773C10.87 11.773 11.6515 10.942 11.6515 9.901C11.629 8.8375 10.8715 8.029 9.6385 8.029C8.4055 8.029 7.6 8.839 7.6 9.901C7.6 10.942 8.3815 11.773 9.5905 11.773H9.6145ZM16.9765 24.091V18.0385C16.9765 17.7145 17.0005 17.3905 17.0965 17.1595C17.356 16.513 17.9485 15.8425 18.9445 15.8425C20.248 15.8425 20.7685 16.8355 20.7685 18.2935V24.091H24.37V17.875C24.37 14.545 22.594 12.997 20.224 12.997C18.313 12.997 17.4565 14.047 16.9765 14.7865V14.824H16.9525C16.9605 14.8115 16.9685 14.799 16.9765 14.7865V13.2535H13.3765C13.4215 14.2705 13.3765 24.091 13.3765 24.091H16.9765Z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}