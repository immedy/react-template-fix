
import ComponentCard from "../../components/common/ComponentCard";
import Dashboard from "./detail/Dashboard";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <ComponentCard
            title="Dashboard"
            headerRight={
              <button
                onClick={() => window.location.href = "/dashboard/pasien"}
                className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >

                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5v14m8-7h-2m0 0h-2m2 0v2m0-2v-2M3 11h6m-6 4h6m11 4H4c-.55228 0-1-.4477-1-1V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z" />
                </svg>
                <span className="absolute z-10 bottom-full mb-2 hidden w-max rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 group-hover:block transition">
                  Tambah
                </span>
              </button>
            }>
            <Dashboard />
          </ComponentCard>

        </div>
      </div>
    </>
  );
}
