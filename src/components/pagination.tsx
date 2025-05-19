'use client'
import { movieStore } from "@/store/movieStore";
import { useEffect, useState } from "react";

  export default function HandlePagination() {

        const { getMovies, nbrPages } = movieStore.getState()
      // TODO: You don't really use typescript right. Why use any when you can use number directly?

      //ANSWER because nextPage can be a number or either '...' and getMovies takes only number
        const [nextPage, setNextPage] = useState<any>(1)
    
        const pages = nbrPages;

        useEffect(()=>{
            // TODO: Not beautiful
            //   Easier to read

            //ANSWER not understand well

            nextPage !== 0 && getMovies(nextPage)
            console.log('changed...');
            
        }, [nextPage])
    
    
        useEffect(() => {
            getMovies(nextPage)
        }, [])

        const tab = new Array;
        for (let index = 0; index < pages; index++) {
            tab[index] = index;
        }

        const maxVisiblePages = 5; // Number of visible page numbers
        const isDotsNeeded = pages > maxVisiblePages;

        // Calculate the range of pages to display
        const getVisiblePages = () => {
            if (!isDotsNeeded) {
                return tab;
            }

            const visiblePages = [];
            const firstPage = 0;
            const lastPage = pages - 1;

            if (nextPage <= 2) {
                visiblePages.push(...tab.slice(0, 3), "...", lastPage);
            } else if (nextPage >= pages - 3) {
                visiblePages.push(firstPage, "...", ...tab.slice(pages - 3));
            } else {
                visiblePages.push(firstPage, "...", nextPage - 1, nextPage, nextPage + 1, "...", lastPage);
            }

            return visiblePages;
        };

        const handlePageChange = (page: string) => {
            if (page === "...") return; // Ignore clicks on dots
            setNextPage(page);
        };

        return (
            <div className="flex justify-center fixed bottom-2.5 py-6">
                {/* "<< Go to First" */}
                {/* TODO: Why a div and not a button? */}
                <button
                    onClick={() => setNextPage(1)}
                    className="border-2 w-9 h-9 p-1 text-gray-300 text-center m-1 rounded-lg hover:text-white hover:bg-secondary hover:font-semibold cursor-pointer"
                >
                    {"<<"}
                </button>

                {/* "< Go to Previous" */}
                <button
                    onClick={() => setNextPage((prev: number) => Math.max(0, prev - 1))}
                    className="border-2 w-9 h-9 p-1 text-gray-300 text-center m-1 rounded-lg hover:text-white hover:bg-secondary hover:font-semibold cursor-pointer"
                >
                    {"<"}
                </button>

                {/* Page Numbers */}
                {getVisiblePages().map((page: any, i: any) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(page)}
                        className={`${nextPage === page && page !== "..." ? "bg-tert text-white" : ""
                            } border-2 w-9 h-9 p-1 text-gray-200 text-center m-1 rounded-lg hover:text-white hover:bg-secondary hover:font-semibold cursor-pointer`}
                    >
                        {page === "..." ? "..." : page + 1}
                    </button>
                ))}

                {/* "> Go to Next" */}
                <button
                    onClick={() => setNextPage((prev: number) => Math.min(pages - 1, prev + 1))}
                    className="border-2 w-9 h-9 p-1 text-gray-300 text-center m-1 rounded-lg hover:text-white hover:bg-secondary hover:font-semibold cursor-pointer"
                >
                    {">"}
                </button>

                {/* ">> Go to Last" */}
                <button
                    onClick={() => setNextPage(pages - 1)}
                    className="border-2 w-9 h-9 p-1 text-gray-300 text-center m-1 rounded-lg hover:text-white hover:bg-secondary hover:font-semibold cursor-pointer"
                >
                    {">>"}
                </button>
            </div>
        );
    };

