import Link from "next/link";

function Pagination({ pageCount, currentPage, url, queryParams }: { pageCount: number, currentPage: number, url: string, queryParams: string }) {
    return (
        <div>
            <ul className="inline-flex -space-x-px">
                <PaginationItem pageCount={pageCount} currentPage={currentPage} url={url} queryParams={queryParams} />
            </ul>
        </div>
    )
}

const PaginationItem = ({ pageCount, currentPage, url, queryParams }: { pageCount: number, currentPage: number, url: string, queryParams: string }) => {

    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < pageCount ? currentPage + 1 : null;

    return (
        <>
            <li>
                <Link href={prevPage ? `${url}?${queryParams}&page=${prevPage}` : "#"}
                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</Link>
            </li>

            {Array.from({ length: pageCount }, (_, index) => (
                <li key={index}>
                    <Link href={`${url}?${queryParams}&page=${index + 1}`}
                        className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{index + 1}</Link>
                </li>
            ))}

            <li>
                <Link href={nextPage ? `${url}?${queryParams}&page=${nextPage}` : "#"}
                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
            </li>
        </>
    );
};

export default Pagination