import ComponentCard from "../../components/common/ComponentCard";
import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";

export default function RefAmbulan() {
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
                      <TableRow>
                        <TableCell className="px-6 py-3 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-gray-400">
                          1
                    </TableCell>
                        <TableCell className="px-6 py-3 text-left whitespace-nowrap first:pl-0">
                          <div className="flex items-center w-full gap-5">
                            <div className="truncate">
                              <p className="mb-0.5 truncate text-theme-sm font-medium text-gray-700 dark:text-gray-400">
                                Make Better Ideas...
                              </p>
                              <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                Ads campaign
                              </span>
                            </div>
                          </div>

                    </TableCell>
                        <TableCell className="px-6 py-3 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-gray-400">
                          May 01, 2024
                    </TableCell>
                        <TableCell className="px-6 py-3 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-gray-400">
                          $120.00
                    </TableCell>
                        <TableCell className="px-6 py-3 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-gray-400">
                          Starter Plan
                    </TableCell>
                        <TableCell className="px-6 py-3">
                          <span className="inline-flex items-center justify-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500">
                            Paid
                          </span>
                    </TableCell>
                        <TableCell className="px-6 py-3">
                          <div className="flex justify-end gap-2">
                            <button className="shadow-theme-xs inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-archive"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                              </svg>

                            </button>
                            <button className="shadow-theme-xs inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                              >
                                <path
                                  d="M2.96487 10.7925C2.73306 10.2899 2.73306 9.71023 2.96487 9.20764C4.28084 6.35442 7.15966 4.375 10.4993 4.375C13.8389 4.375 16.7178 6.35442 18.0337 9.20765C18.2655 9.71024 18.2655 10.2899 18.0337 10.7925C16.7178 13.6458 13.8389 15.6252 10.4993 15.6252C7.15966 15.6252 4.28084 13.6458 2.96487 10.7925Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M13.5202 10C13.5202 11.6684 12.1677 13.0208 10.4993 13.0208C8.83099 13.0208 7.47852 11.6684 7.47852 10C7.47852 8.33164 8.83099 6.97917 10.4993 6.97917C12.1677 6.97917 13.5202 8.33164 13.5202 10Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </button>
                          </div>
                    </TableCell>
                      </TableRow>

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
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.58203 9.99868C2.58174 10.1909 2.6549 10.3833 2.80152 10.53L7.79818 15.5301C8.09097 15.8231 8.56584 15.8233 8.85883 15.5305C9.15183 15.2377 9.152 14.7629 8.85921 14.4699L5.13911 10.7472L16.6665 10.7472C17.0807 10.7472 17.4165 10.4114 17.4165 9.99715C17.4165 9.58294 17.0807 9.24715 16.6665 9.24715L5.14456 9.24715L8.85919 5.53016C9.15199 5.23717 9.15184 4.7623 8.85885 4.4695C8.56587 4.1767 8.09099 4.17685 7.79819 4.46984L2.84069 9.43049C2.68224 9.568 2.58203 9.77087 2.58203 9.99715C2.58203 9.99766 2.58203 9.99817 2.58203 9.99868Z"
                        ></path>
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
                    <button className="shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 sm:px-3.5 sm:py-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-50 hover:text-gray-800 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                      <span className="hidden sm:inline">Next</span>
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.4165 9.9986C17.4168 10.1909 17.3437 10.3832 17.197 10.53L12.2004 15.5301C11.9076 15.8231 11.4327 15.8233 11.1397 15.5305C10.8467 15.2377 10.8465 14.7629 11.1393 14.4699L14.8594 10.7472L3.33203 10.7472C2.91782 10.7472 2.58203 10.4114 2.58203 9.99715C2.58203 9.58294 2.91782 9.24715 3.33203 9.24715L14.854 9.24715L11.1393 5.53016C10.8465 5.23717 10.8467 4.7623 11.1397 4.4695C11.4327 4.1767 11.9075 4.17685 12.2003 4.46984L17.1578 9.43049C17.3163 9.568 17.4165 9.77087 17.4165 9.99715C17.4165 9.99763 17.4165 9.99812 17.4165 9.9986Z"
                        ></path>
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