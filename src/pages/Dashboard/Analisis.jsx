import {
    ArrowDownIcon,
    ArrowUpIcon,
    BoxIconLine,
    GroupIcon,
} from "../../icons"
import Badge from "../../components/ui/badge/Badge"
import ComponentCard from "../../components/common/ComponentCard";
import Dashboard from "./detail/Dashboard";
import { Link } from "react-router";

export default function Analisis() {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
                {/* Metrik */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                        <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                    </div>
                    <div className="flex items-end justify-between mt-5">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Customers
                            </span>
                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                                3,782
                            </h4>
                        </div>
                        <Badge color="success">
                            <ArrowUpIcon />
                            11.01%
                        </Badge>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                        <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
                    </div>
                    <div className="flex items-end justify-between mt-5">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Orders</span>
                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                                5,359
                            </h4>
                        </div>
                        <Badge color="success">
                            <ArrowUpIcon />
                            11.01%
                        </Badge>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                        Unique Visitors
                    </p>
                    <div className="flex items-end justify-between mt-3">
                        <div>
                            <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                                24.7K
                            </h4>
                        </div>
                        <div className="flex items-center gap-1">
                            <Badge color="success">
                                <ArrowUpIcon />
                                11.01%
                            </Badge>
                            <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                Vs last month
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                        Total Pageviews
                    </p>
                    <div className="flex items-end justify-between mt-3">
                        <div>
                            <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                                55.9K
                            </h4>
                        </div>
                        <div className="flex items-center gap-1">
                            <Badge color="success">
                                <ArrowUpIcon />
                                11.01%
                            </Badge>
                            <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                Vs last month
                            </span>
                        </div>
                    </div>
                </div>

                {/* Dashboard: Tambahkan col-span-full untuk mengambil seluruh lebar */}
                <div className="col-span-full">
                    <ComponentCard
                        title="Dashboard"
                        headerRight={
                            <Link to="/dashboard/pasien"
                                className="group relative shadow-theme-xs inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-blue-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-blue/[0.03] dark:hover:text-gray-200"
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
                                <span
                                    className="absolute z-10 bottom-full mb-2 w-max rounded bg-black px-2 py-1 text-xs text-white
                                   opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out"
                                >
                                    Tambah
                                </span>
                            </Link>
                        }>
                        <Dashboard />
                    </ComponentCard>
                </div>
            </div>
        </>
    );
}