import React, { useEffect, useState } from "react";
import Select from 'react-select'; // Pastikan ini adalah komponen Select yang benar
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import DatePicker from "../../../components/form/date-picker";


// Komponen untuk Form Ambulan (baru)
const AmbulanForm = ({ formData, handleInputChange, options, handleSelectChange }) => (
    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
        <div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                {/* Nama Pasien dan No Rekam Medis tetap di sini untuk semua form, tapi di-readOnly */}
                <div>
                    <Label>Nama Pasien</Label>
                    <Input type="text" value={formData.namaPasien} readOnly />
                </div>
                <div>
                    <Label>No Rekam Medis</Label>
                    <Input type="text" value={formData.noRekamMedis} readOnly />
                </div>

                <div>
                    <Label>Jenis Ambuan</Label>
                    <Select
                        options={options} // Gunakan options yang diteruskan dari parent
                        placeholder="Select an option"
                        onChange={handleSelectChange} // Gunakan handleSelectChange yang diteruskan
                        className="dark:bg-dark-900"
                        value={options.find(option => option.value === formData.jaminan)}

                    />
                </div>
                <div>
                    <Label>Jaminan</Label>
                    <Select
                        options={options} // Ganti dengan options DPJP yang relevan
                        placeholder="Select an option"
                        onChange={handleSelectChange}
                        className="dark:bg-dark-900"
                        value={options.find(option => option.value === formData.dpjp)}

                    />
                </div>
                <div className="col-span-2">
                    <Label>Pilih Tujuan</Label>
                    <Select
                        options={options} // Ganti dengan options Jenis Pelayanan yang relevan
                        placeholder="Select an option"
                        onChange={handleSelectChange}
                        className="dark:bg-dark-900"
                        value={options.find(option => option.value === formData.jenisPelayanan)}

                    />
                </div>
            </div>
        </div>
        <div className="mt-7">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-1">
                    <Label>Pembayaran Pasien</Label>
                    <Input
                        type="text"
                        id="keterangan" // Pastikan ID sesuai dengan key di formData
                        value={formData.keterangan}
                        onChange={handleInputChange}

                    />
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <Label>Total Terima Kasir</Label>
                    <Input
                        type="text"
                        id="keterangan" // Pastikan ID sesuai dengan key di formData
                        value={formData.keterangan}
                        onChange={handleInputChange}

                    />
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <div className="col-span-2 lg:col-span-1">
                        <Label>Pengemudi</Label>
                        <Select
                            options={options} // Ganti dengan options Status Pasien yang relevan
                            placeholder="Select an option"
                            onChange={handleSelectChange}
                            className="dark:bg-dark-900"
                            value={options.find(option => option.value === formData.statusPasien)}

                        />
                    </div>
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <Label>Pendamping (Perawat)</Label>
                    <Select
                        options={options} // Ganti dengan options Status Pasien yang relevan
                        placeholder="Select an option"
                        onChange={handleSelectChange}
                        className="dark:bg-dark-900"
                        value={options.find(option => option.value === formData.statusPasien)}

                    />
                </div>
                <div className="col-span-2">
                    <Label>Penanggung Jawab</Label>
                    <Input
                        type="text"
                        id="keterangan" // Pastikan ID sesuai dengan key di formData
                        value={formData.keterangan}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
            </div>
        </div>
    </div>
);

// Komponen untuk Form Jenazah (baru)
const JenazahForm = ({ formData, handleInputChange, options, handleSelectChange }) => (
    <div className="custom-scrollbar h-[350px] overflow-y-auto px-2 pb-3">
        <h5 className="mb-4 text-xl font-semibold text-gray-700 dark:text-white/80">Data Jenazah</h5>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
                <Label>Nama Pasien</Label>
                <Input type="text" value={formData.namaPasien} readOnly />
            </div>
            <div>
                <Label>No Rekam Medis</Label>
                <Input type="text" value={formData.noRekamMedis} readOnly />
            </div>
        </div>
        <div className="mt-7">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2">
                        <Label>Jenis Tindakan</Label>
                        <Select
                            options={options} // Ganti dengan options Status Pasien yang relevan
                            placeholder="Select an option" isMulti
                            onChange={handleSelectChange}
                            className="dark:bg-dark-900 basic-multi-select"
                            value={options.find(option => option.value === formData.statusPasien)}
                        />
                </div>
    
                <div className="col-span-2">
                    <Label>Penanggung Jawab</Label>
                    <Input
                        type="text"
                        id="keterangan" // Pastikan ID sesuai dengan key di formData
                        value={formData.keterangan}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
            </div>
        </div>
    </div>
);

// --- Komponen Utama Modal GetDataPasien ---

export default function GetDataPasien({ isOpen, onClose, handleSave, selectedPatient, modalType }) {
    // Definisi options untuk Select (ini bisa diambil dari Context API LookupData jika sudah diimplementasikan)
    const defaultOptions = [
        { value: "option1", label: "Opsi 1" },
        { value: "option2", label: "Opsi 2" },
        { value: "option3", label: "Opsi 3" },
    ];
    // Anda bisa mengganti 'options' ini dengan data dari LookupDataContext jika sudah ada
    // const { jaminanOptions, dpjpOptions, jenisPelayananOptions, statusPasienOptions, asalTujuanRuanganOptions, pasienKeluarMatiOptions } = useContext(LookupDataContext);


    const [formData, setFormData] = useState({
        namaPasien: "",
        noRekamMedis: "",
        jaminan: "",
        dpjp: "",
        jenisPelayanan: "",
        tanggalMasuk: "",
        tanggalKeluar: "",
        statusPasien: "",
        asalTujuanRuangan: "",
        pasienKeluarMati: "",
        keterangan: "",
        // Tambahkan field khusus untuk Ambulan dan Jenazah
        tujuanAmbulan: "",
        supirAmbulan: "",
        tanggalMeninggal: "",
        sebabMeninggal: "",
    });

    // Gunakan useEffect untuk mengisi form ketika selectedPatient atau modalType berubah
    useEffect(() => {
        if (selectedPatient) {
            // Saat selectedPatient berubah, isi formData dengan data pasien yang relevan
            // dan reset field khusus modalType lain jika tidak relevan.
            setFormData(prev => ({
                ...prev, // Pertahankan nilai sebelumnya jika ada (misal, user sudah ketik di field khusus)
                namaPasien: selectedPatient.full_name || "",
                noRekamMedis: selectedPatient.mr_no || "",
                jaminan: selectedPatient.jaminan || "", // Sesuaikan dengan properti API Anda
                dpjp: selectedPatient.dpjp || "",
                jenisPelayanan: selectedPatient.jenis_pelayanan || "",
                tanggalMasuk: selectedPatient.tanggal_masuk || "",
                tanggalKeluar: selectedPatient.tanggal_keluar || "",
                statusPasien: selectedPatient.status_pasien || "",
                asalTujuanRuangan: selectedPatient.asal_tujuan_ruangan || "",
                pasienKeluarMati: selectedPatient.pasien_keluar_mati || "",
                keterangan: selectedPatient.keterangan || "",
                // Reset field khusus modalType lain saat data pasien baru dimuat
                tujuanAmbulan: "", // Reset
                supirAmbulan: "", // Reset
                tanggalMeninggal: "", // Reset
                sebabMeninggal: "", // Reset
                // Jika Anda ingin mengisi field khusus ini dari data pasien, pastikan
                // properti tersebut ada di `selectedPatient` dari API Anda.
                // Contoh: tujuanAmbulan: selectedPatient.dataAmbulan?.tujuan || "",
            }));
        } else {
            // Reset form ketika modal ditutup atau selectedPatient kosong
            setFormData({
                namaPasien: "",
                noRekamMedis: "",
                jaminan: "",
                dpjp: "",
                jenisPelayanan: "",
                tanggalMasuk: "",
                tanggalKeluar: "",
                statusPasien: "",
                asalTujuanRuangan: "",
                pasienKeluarMati: "",
                keterangan: "",
                tujuanAmbulan: "",
                supirAmbulan: "",
                tanggalMeninggal: "",
                sebabMeninggal: "",
            });
        }
    }, [selectedPatient]); // Hanya bergantung pada selectedPatient

    // Handler generik untuk input field
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // Handler generik untuk Select components (react-select)
    const handleSelectChange = (selectedOption, { name }) => {

        setFormData(prev => ({ ...prev, [name]: selectedOption ? selectedOption.value : '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData, "for modal type:", modalType);
        // Lakukan pengiriman data ke API berdasarkan modalType
        if (modalType === 'ambulan') {
            alert(`Simpan data Ambulan untuk ${formData.namaPasien}. Tujuan: ${formData.tujuanAmbulan}`);
            // Panggil API untuk Ambulan
        } else if (modalType === 'jenazah') {
            alert(`Simpan data Jenazah untuk ${formData.namaPasien}. Sebab: ${formData.sebabMeninggal}`);
            // Panggil API untuk Jenazah
        }
        handleSave(); // Panggil handleSave dari parent (Pasien.jsx) untuk menutup modal
    };

    // Fungsi untuk merender komponen form berdasarkan modalType
    const renderFormContent = () => {
        if (!selectedPatient) {
            return <p>Memuat data pasien...</p>;
        }

        switch (modalType) {
            case 'ambulan':
                return <AmbulanForm formData={formData} handleInputChange={handleInputChange} options={defaultOptions} handleSelectChange={handleSelectChange} />;
            case 'jenazah':
                return <JenazahForm formData={formData} handleInputChange={handleInputChange} options={defaultOptions} handleSelectChange={handleSelectChange} />;
        }
    };

    // Fungsi untuk mendapatkan judul modal yang dinamis
    const getModalTitle = () => {
        const patientInfo = selectedPatient?.full_name ? `- ${selectedPatient.full_name}` : "";
        const rmInfo = selectedPatient?.mr_no ? ` No RM ${selectedPatient.mr_no}` : "";

        switch (modalType) {
            case 'ambulan':
                return `Formulir Ambulan ${patientInfo}`;
            case 'jenazah':
                return `Formulir Jenazah ${patientInfo}`;
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1000px] m-4">
            <div className="relative w-full max-w-[1000px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {getModalTitle()}
                    </h4>
                </div>

                <form className="flex flex-col" onSubmit={handleSubmit}>
                    {renderFormContent()} {/* Render form yang sesuai */}
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={onClose} type="button">
                            Close
                        </Button>
                        {/* Tampilkan tombol Simpan hanya jika modalType bukan 'detail' atau jika Anda ingin detail bisa diedit */}
                        {modalType && (
                            <Button size="sm" type="submit">
                                Simpan
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </Modal>
    );
}