const PaginationTable = ({
  children,
  patient,
  getPatient,
  setState,
  token,
  search,
}) => {
  // Function to handle page click
  // This function is called when a pagination button is clicked
  const handlePageClick = async (url) => {
    const match = url?.match(/page=(\d+)/);
    if (match) {
      const page = parseInt(match[1]);
      setState({ currentPage: page });
      await getPatient(token, page, search);
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {children}
      </table>

      <div className="flex justify-end py-3 pr-3">
        {/* Pagination Controls Start */}
        {patient?.Pasien?.links?.map((item, index) => (
          <button
            type="submit"
            key={index}
            disabled={!item?.url}
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(item?.url);
            }}
            className={`px-3 py-1 text-sm border rounded ${
              item?.active ? "bg-green-600 text-white" : "bg-white"
            } ${!item?.url ? "text-gray-400" : "hover:bg-gray-100"}`}
            dangerouslySetInnerHTML={{
              __html: item?.label
                .replace("pagination.previous", "&laquo;")
                .replace("pagination.next", "&raquo;"),
            }}
          />
        ))}
        {/* Pagination Controls End */}
      </div>
    </div>
  );
};

export default PaginationTable;
