import { useState, useEffect } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { ambulanService } from "../../services/reference/ambulan.service";
import useAuth from "../../hooks/useAuth";

export default function RefAmbulan() {
  const { user, isInitialized } = useAuth();
  const [dataTujuan, setDataTujuan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil token dari user atau sebagai cadangan dari localStorage
  const token = user?.token || localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchTujuanAmbulan = async () => {
      // Tunggu hingga AuthProvider selesai inisialisasi DAN token tersedia
      if (!isInitialized) {
        return;
      }
      
      // Jika inisialisasi selesai tapi token tidak ada, atur error
      if (!token) {
        setLoading(false);
        setError("Token tidak tersedia. Silakan login kembali.");
        return;
      }

      setError(null);
      setLoading(true);

      const result = await ambulanService.getTujuanAmbulan(token);

      if (result.success) {
        setDataTujuan(result.data);
      } else {
        setError(result.error || "Gagal mengambil data tujuan ambulans.");
      }
      setLoading(false);
    };

    fetchTujuanAmbulan();
  }, [token, isInitialized]);

  // Tampilkan loading saat inisialisasi atau pengambilan data
  if (!isInitialized || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading data...</p>
      </div>
    );
  }

  // Tampilkan error jika ada masalah
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error fetching data: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <ComponentCard
            title="Tujuan Ambulan"
            headerRight={
              <div className="hidden h-11 items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 lg:inline-flex dark:bg-gray-900">
                <button className="text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800">Ambulan Jenazah Dalam Provinsi</button>
                <button className="text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400">Ambulan Jenazah Luar Provinsi</button>
                <button className="text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400">Ambulan Antar Pasien Dalam Provinsi</button>
                <button className="text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400">Ambulan Antar Pasien luar Provinsi</button>
                <div>
                  <Link to="/referensi-ambulan/addreferensiambulan"
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
                          Tujuan
                        </TableCell>
                        <TableCell className="px-6 py-3 text-left text-sm font-normal text-gray-500 dark:text-gray-400">
                          BBM
                        </TableCell>
                        <TableCell className="px-6 py-3 text-left text-sm font-normal text-gray-500 dark:text-gray-400">
                          Penyebrangan
                        </TableCell>
                        <TableCell className="px-6 py-3 text-left text-sm font-normal text-gray-500 dark:text-gray-400">
                          Uang Makan
                        </TableCell>
                        <TableCell className="px-6 py-3 text-left text-sm font-normal text-gray-500 dark:text-gray-400">
                          Total Biaya
                        </TableCell>
                        <TableCell className="px-6 py-3 text-right text-sm font-normal text-gray-500 dark:text-gray-400">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {dataTujuan.length > 0 ? (
                        dataTujuan.map((item, index) => (
                          <TableRow key={item.id}>
                            <TableCell className="px-6 py-3 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-gray-400">
                              {index + 1}
                            </TableCell>
                            <TableCell className="px-6 py-3 text-left whitespace-nowrap first:pl-0">
                              <div className="truncate">
                                <p className="mb-0.5 truncate text-theme-sm font-medium text-gray-700 dark:text-gray-400">
                                  {item.tujuan}
                                </p>
                                <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                  {item.ambulan}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="px-6 py-3 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-gray-400">
                                {item.bbm ? `Rp ${item.bbm.toLocaleString('id-ID')}` : '-'}
                            </TableCell>
                            <TableCell className="px-6 py-3 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-gray-400">
                                {item.penyebrangan ? `Rp ${item.penyebrangan.toLocaleString('id-ID')}` : '-'}
                            </TableCell>
                            <TableCell className="px-6 py-3 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-gray-400">
                                {item.uangmakan ? `Rp ${item.uangmakan.toLocaleString('id-ID')}` : '-'}
                            </TableCell>
                            <TableCell className="px-6 py-3 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-gray-400">
                                {item.harga ? `Rp ${item.harga.toLocaleString('id-ID')}` : '-'}
                            </TableCell>
                            <TableCell className="px-6 py-3">
                              <div className="flex justify-end gap-2">
                                <button className="shadow-theme-xs inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.636a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                  </svg>
                                </button>
                                <button className="shadow-theme-xs inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                  </svg>
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                            Tidak ada data tujuan ambulan.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="rounded-b-xl border-t border-gray-200 px-6 py-4 dark:border-gray-800">
                  <div className="flex justify-center">
                    <div className="block pb-4 text-sm text-gray-700 sm:hidden dark:text-gray-400">
                      Showing <span>1</span> to <span>5</span> of <span>12</span> invoices
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-8 bg-gray-50 dark:bg-white/[0.03] p-4 rounded-lg sm:p-0 dark:sm:bg-transparent sm:bg-transparent">
                    <button
                      disabled=""
                      className="shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 sm:px-3.5 sm:py-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 opacity-50 cursor-not-allowed"
                    >
                      <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.58203 9.99868C2.58174 10.1909 2.6549 10.3833 2.80152 10.53L7.79818 15.5301C8.09097 15.8231 8.56584 15.8233 8.85883 15.5305C9.15183 15.2377 9.152 14.7629 8.85921 14.4699L5.13911 10.7472L16.6665 10.7472C17.0807 10.7472 17.4165 10.4114 17.4165 9.99715C17.4165 9.58294 17.0807 9.24715 16.6665 9.24715L5.14456 9.24715L8.85919 5.53016C9.15199 5.23717 9.15184 4.7623 8.85885 4.4695C8.56587 4.1767 8.09099 4.17685 7.79819 4.46984L2.84069 9.43049C2.68224 9.568 2.58203 9.77087 2.58203 9.99715C2.58203 9.99766 2.58203 9.99817 2.58203 9.99868Z"></path>
                      </svg>
                      <span className="hidden sm:inline">Previous</span>
                    </button>
                    <span className="block text-sm font-medium text-gray-700 sm:hidden dark:text-gray-400">
                      Page 1 of 3
                    </span>
                    <ul className="hidden items-center gap-0.5 sm:flex">
                      <li>
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium bg-brand-500 text-white hover:bg-brand-500 hover:text-white">
                          1
                        </button>
                      </li>
                      <li>
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:bg-brand-500 hover:text-white dark:text-gray-400 dark:hover:text-white">
                          2
                        </button>
                      </li>
                      <li>
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:bg-brand-500 hover:text-white dark:text-gray-400 dark:hover:text-white">
                          3
                        </button>
                      </li>
                    </ul>
                    <button
                      disabled=""
                      className="shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 sm:px-3.5 sm:py-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-50 hover:text-gray-800 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.4165 9.9986C17.4168 10.1909 17.3437 10.3832 17.197 10.53L12.2004 15.5301C11.9076 15.8231 11.4327 15.8233 11.1397 15.5305C10.8467 15.2377 10.8465 14.7629 11.1393 14.4699L14.8594 10.7472L3.33203 10.7472C2.91782 10.7472 2.58203 10.4114 2.58203 9.99715C2.58203 9.58294 2.91782 9.24715 3.33203 9.24715L14.854 9.24715L11.1393 5.53016C10.8465 5.23717 10.8467 4.7623 11.1397 4.4695C11.4327 4.1767 11.9075 4.17685 12.2003 4.46984L17.1578 9.43049C17.3163 9.568 17.4165 9.77087 17.4165 9.99715C17.4165 9.99763 17.4165 9.99812 17.4165 9.9986Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}