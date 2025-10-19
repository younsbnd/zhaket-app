import Link from "next/link";

/**
 * PaginationView - Presentation Component
 * Renders the pagination UI
 */
export default function PaginationView({
    pages,
    currentPage,
    totalPages,
    baseUrl,
    onPageClick,
}) {
    const hasPrevious = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return (
        <nav className="flex justify-center my-8">
            <ul className="flex items-center gap-2 p-1 bg-[#F9FAFC] rounded-md">
                {/* Previous Button */}
                <PaginationButton
                    href={hasPrevious && `${baseUrl}${currentPage - 1}`}
                    onClick={hasPrevious && onPageClick(currentPage - 1)}
                    disabled={!hasPrevious}
                    className="px-5 ml-2.5"
                >
                    قبلی
                </PaginationButton>

                {/* Page Numbers */}
                {pages.map((page, index) =>
                    page === "..." ? (
                        <li
                            key={`ellipsis-${index}`}
                            className="w-9 h-9 flex items-center justify-center text-gray-600"
                        >
                            ...
                        </li>
                    ) : (
                        <li key={page}>
                            <PaginationButton
                                href={`${baseUrl}${page}`}
                                onClick={onPageClick(page)}
                                active={page === currentPage}
                                className="w-9 h-9 text-sm"
                            >
                                {page}
                            </PaginationButton>
                        </li>
                    )
                )}

                {/* Next Button */}
                <PaginationButton
                    href={hasNext && `${baseUrl}${currentPage + 1}`}
                    onClick={hasNext && onPageClick(currentPage + 1)}
                    disabled={!hasNext}
                    className="px-5 mr-2.5"
                >
                    بعدی
                </PaginationButton>
            </ul>
        </nav>
    );
}

/**
 * PaginationButton - Button/Link Component
 * Renders styled button or link based on state
 */
function PaginationButton({
    href,
    onClick,
    disabled = false,
    active = false,
    children,
    className = "",
}) {
    const baseStyles = "flex items-center justify-center h-10 rounded-lg transition-all";
    const stateStyles = active
        ? "bg-gradient-to-r from-[#FFC107] to-[#FF9737] text-white font-bold"
        : disabled
            ? "bg-white opacity-50 cursor-not-allowed"
            : "bg-white shadow-sm text-gray-600 hover:shadow-md hover:bg-gradient-to-r hover:from-[#FFC107] hover:to-[#FF9737] hover:text-white";

    const combinedStyles = `${baseStyles} ${stateStyles} ${className}`;

    if (disabled || active || !href) {
        return <span className={combinedStyles}>{children}</span>;
    }

    return (
        <Link href={href} onClick={onClick} className={combinedStyles}>
            {children}
        </Link>
    );
}
