function RowBeforeLoad({ colSpan, error, isLoading }: { colSpan: number, error: any, isLoading: boolean }) {

    if (isLoading) return <tr className="my-3"><td colSpan={colSpan} className="text-center">Loading...</td></tr>

    if (error) return <tr className="my-3"><td colSpan={colSpan} className="text-center">Error loading data</td></tr>

    return
}

export default RowBeforeLoad