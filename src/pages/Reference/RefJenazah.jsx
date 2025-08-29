import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import ComponentCard from "../../components/common/ComponentCard";
import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { ambulanService } from "../../services/reference/ambulan.service";
export default function RefJenazah() {
  const { user, isInitialized } = useAuth();
  const [dataTindakan, SetDataTindakan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(null);

  const token = user?.token || localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchTindakanJenazah = async () => {
      if (!isInitialized){
        return;
      }
      if (!token){
        setLoading(false);
        setError('token Tidak tersedia');
      }
      setError(null);
      setLoading(true);
      const result = await ambulanService.getTindakanJenazah(token);
      if (result.success){
        SetDataTindakan(result.data);
      }else {
        setError(result.error || "gagal Mengambil Data");
      }
      setLoading(false)
    };
    fetchTindakanJenazah();
  }, [token, isInitialized])
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <ComponentCard
            title="Tindakan Jenazah"
            headerRight={
              <div>
                <Link to="/referensi-jenazah/addreferensijenazah"
                  className="shadow-theme-xs flex w-full justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-folder-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z" />
                    <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </Link>
              </div>
            }>
            <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="px-6">
                <div className="flex flex-col justify-between gap-5 py-4 sm:flex-row sm:items-center">
                </div>
              </div>
              <div>
                <div className="custom-scrollbar overflow-x-auto px-6">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow className="border-y border-gray-200 dark:border-gray-800">
                        <TableCell className="px-6 py-3 text-left text-sm font-normal text-gray-500 dark:text-gray-400">
                          No
                        </TableCell>
                        <TableCell className="px-6 py-3 text-left text-sm font-normal text-gray-500 first:pl-0 dark:text-gray-400">
                          Tindakan
                        </TableCell>
                        <TableCell className="px-6 py-3 text-left text-sm font-normal text-gray-500 dark:text-gray-400">
                          Harga
                        </TableCell>
                        
                        <TableCell className="px-6 py-3 text-right text-sm font-normal text-gray-500 dark:text-gray-400">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {dataTindakan.map((item, index)=> (
                         <TableRow key={item.id}>
                        <TableCell className="px-6 py-3 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-gray-400">
                          {index + 1 }
                        </TableCell>
                        <TableCell className="px-6 py-3 text-left whitespace-nowrap first:pl-0">
                          <div className="flex items-center w-full gap-5">
                            <div className="truncate">
                              <p className="mb-0.5 truncate text-theme-sm font-medium text-gray-700 dark:text-gray-400">
                                {item.tindakan}
                              </p>
                            </div>
                          </div>

                        </TableCell>
                        <TableCell className="px-6 py-3 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-gray-400">
                          {item.harga ? `Rp ${item.harga.toLocaleString('id-ID')}` : '-'}
                        </TableCell>
                        <TableCell className="px-6 py-3">
                          <div className="flex justify-end gap-2">
                            <Link to={`/referensi-jenazah/addreferensijenazah/${item.encrypted_id}`} 
                             className="shadow-theme-xs inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.636a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                  </svg>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

          </ComponentCard>
        </div>
      </div>
    </>
  );
}