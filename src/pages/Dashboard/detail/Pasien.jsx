import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table";
import { useDataPatient } from "../../../hooks/useDataPatient";
import ComponentCard from "../../../components/common/ComponentCard";
import { useModal } from "../../../hooks/useModal";
import { useState, useEffect } from "react";
import GetDataPasien from "./GetDataPasien";
import useAuth from "../../../hooks/useAuth";

export default function Pasien() {
    const { patient, getPatient, isLoading, currentPage, setState, search, selectedPatient, getPasienByID } = useDataPatient();
    const { user } = useAuth(); 
    const token = user?.token || window.localStorage.getItem("accessToken");

    const [localSearchTerm, setLocalSearchTerm] = useState(search || '');
    const { isOpen, openModal, closeModal } = useModal(); 
    
    // State untuk menyimpan ID pasien yang sedang dibuka modalnya.
    // Ini penting untuk memastikan useEffect bereaksi hanya pada data yang relevan.
    const [patientIdForModal, setPatientIdForModal] = useState(null);

    // Effect untuk memuat daftar pasien
    useEffect(() => {
        if (token) {
            getPatient(token, currentPage, search);
        }
    }, [token, currentPage, search, getPatient]);

    // EFFECT KRITIS: Membuka modal hanya setelah selectedPatient benar-benar update
    // dan sesuai dengan ID pasien yang diminta untuk ditampilkan di modal.
    useEffect(() => {
        if (patientIdForModal && selectedPatient && selectedPatient.id === patientIdForModal) {
            openModal();
            // Penting: Reset patientIdForModal setelah modal berhasil dibuka
            // Ini mencegah modal terbuka kembali secara tidak sengaja jika selectedPatient
            // berubah karena alasan lain dan id-nya sama.
            setPatientIdForModal(null); 
        }
    }, [selectedPatient, patientIdForModal, openModal]); // Tambahkan openModal sebagai dependensi

    // --- Logika Paginasi Terintegrasi ---
    const handlePageClick = async (url) => {
        const match = url?.match(/page=(\d+)/);
        if (match) {
            const page = parseInt(match[1]);
            setState(prevState => ({ ...prevState, currentPage: page }));
            await getPatient(token, page, search);
        }
    };
    // --- Akhir Logika Paginasi Terintegrasi ---

    // --- Logika Pencarian ---
    const handleSearchInputChange = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setState(prevState => ({ ...prevState, search: localSearchTerm, currentPage: 1 }));
        getPatient(token, 1, localSearchTerm);
    };
    // --- Akhir Logika Pencarian ---

    // Fungsi untuk menangani klik tombol "Lihat Detail"
    const handleViewDetail = async (patientId) => {
        if (token) {
            // 1. Simpan ID pasien yang akan ditampilkan di modal
            setPatientIdForModal(patientId);

            // 2. Panggil fungsi untuk mengambil detail pasien.
            //    Ini akan meng-update `selectedPatient` di DataContext.
            //    Kita TIDAK langsung memanggil openModal() di sini.
            const response = await getPasienByID(token, patientId); 
            
            if (!response || !response.success) {
                console.error("Gagal mengambil data pasien untuk modal:", response?.error || "Terjadi kesalahan.");
                // Jika gagal, reset ID agar modal tidak mencoba membuka dengan data salah
                setPatientIdForModal(null);
            }
            // openModal() akan dipanggil oleh useEffect yang baru di atas
            // setelah selectedPatient di context diperbarui dan cocok dengan patientIdForModal
        } else {
            console.warn("Token tidak tersedia. Tidak dapat mengambil data pasien.");
        }
    };

    // Fungsi untuk menangani aksi "Simpan" di dalam modal (jika ada)
    const handleSave = () => {
        console.log("Data pasien disimpan (placeholder).");
        closeModal(); // Tutup modal setelah disimpan
    };

    return (
        <>
            <div className="space-y-6">
                <ComponentCard title="Pasien" headerRight={
                    <form onSubmit={handleSearchSubmit}>
                        <div className="relative">
                            <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                                <svg
                                    className="fill-gray-500 dark:fill-gray-400"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                                        fill=""
                                    />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search or type command..."
                                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                                value={localSearchTerm}
                                onChange={handleSearchInputChange}
                            />

                            <button
                                type="submit"
                                className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400"
                            >
                                <span> Cari </span>
                            </button>
                        </div>
                    </form>
                }>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <TableHeader className="text-xs text-gray-700 border uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <TableRow>
                                    <TableCell isHeader className="px-6 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Nama Pasien</TableCell>
                                    <TableCell isHeader className="px-6 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">No Rekam Medis</TableCell>
                                    <TableCell isHeader className="px-6 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Tempat, Tanggal Lahir</TableCell>
                                    <TableCell isHeader className="px-6 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Jenis Kelamin</TableCell>
                                    <TableCell isHeader className="px-6 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Aksi</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan="5" className="text-center py-4">
                                            <div role="status" className="flex justify-center items-center">
                                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    patient?.Pasien?.data?.map(pasien => (
                                        <TableRow key={pasien.id} className="hover:bg-gray-50 border">
                                            <TableCell className="px-6 py-4 sm:px-6 text-start">
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                            {pasien.nama}
                                                        </span>
                                                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                            {pasien.alamat}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {pasien.no_rm}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <div className="flex -space-x-2">
                                                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                        {pasien.tempatlahir}, {pasien.tanggal_lahir}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {pasien.jenis_kelamin}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                                                <div className="relative group inline-block">
                                                    <button
                                                        onClick={() => handleViewDetail(pasien.id)}
                                                        className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                                                    >
                                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559.1331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z" clipRule="evenodd"/>
                                                        </svg>
                                                        <span className="absolute z-10 bottom-full mb-2 hidden w-max rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 group-hover:block transition">
                                                            Daftar
                                                        </span>
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        <div className="flex justify-end py-3 pr-3">
                            {patient?.Pasien?.links?.map((item, index) => (
                                <button
                                    type="button"
                                    key={index}
                                    disabled={!item?.url}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageClick(item?.url);
                                    }}
                                    className={`px-3 py-1 text-sm border rounded ${item?.active ? "bg-green-600 text-white" : "bg-white"
                                        } ${!item?.url ? "text-gray-400" : "hover:bg-gray-100"}`}
                                    dangerouslySetInnerHTML={{
                                        __html: item?.label
                                            .replace("pagination.previous", "&laquo;")
                                            .replace("pagination.next", "&raquo;"),
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Komponen modal diletakkan di sini */}
                    <GetDataPasien
                        isOpen={isOpen}
                        onClose={closeModal} // Memastikan onClose dipanggil dari useModal
                        handleSave={handleSave}
                        selectedPatient={selectedPatient}
                    />
                </ComponentCard>
            </div>
        </>
    );
}