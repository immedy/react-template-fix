import React, { useEffect, useState } from "react";
import Select from 'react-select'
import { Modal } from "../../../components/ui/modal"; // Asumsi ini adalah komponen Modal Anda
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import DatePicker from "../../../components/form/date-picker";

const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
];

const handleSelectChange = (value) => {
    console.log("Selected value:", value);
};

export default function GetDataPasien({ isOpen, onClose, handleSave, selectedPatient }) {
    const [formData, setFormData] = useState({
        namaPasien: "",
        noRekamMedis: "",
        jaminan: "", // Tambahkan state untuk Jaminan
        dpjp: "", // Tambahkan state untuk DPJP
        jenisPelayanan: "", // Tambahkan state untuk Jenis Pelayanan
        tanggalMasuk: "", // Tambahkan state untuk Tanggal Masuk
        tanggalKeluar: "", // Tambahkan state untuk Tanggal Keluar
        statusPasien: "", // Tambahkan state untuk Status Pasien
        asalTujuanRuangan: "", // Tambahkan state untuk Asal/Tujuan Ruangan
        pasienKeluarMati: "", // Tambahkan state untuk Pasien Keluar Mati
        keterangan: "", // Tambahkan state untuk Keterangan
    });

    // Gunakan useEffect untuk mengisi form ketika selectedPatient berubah
    useEffect(() => {
        if (selectedPatient) {
            setFormData({
                namaPasien: selectedPatient.full_name || "", // Pastikan nama property sesuai API
                noRekamMedis: selectedPatient.mr_no || "", // Pastikan nama property sesuai API
                // Tambahkan mapping untuk field lain dari selectedPatient
                jaminan: selectedPatient.jaminan || "", // Sesuaikan dengan properti di API Anda
                dpjp: selectedPatient.dpjp || "",
                jenisPelayanan: selectedPatient.jenis_pelayanan || "",
                tanggalMasuk: selectedPatient.tanggal_masuk || "",
                tanggalKeluar: selectedPatient.tanggal_keluar || "",
                statusPasien: selectedPatient.status_pasien || "",
                asalTujuanRuangan: selectedPatient.asal_tujuan_ruangan || "",
                pasienKeluarMati: selectedPatient.pasien_keluar_mati || "",
                keterangan: selectedPatient.keterangan || "",
            });
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
            });
        }
    }, [selectedPatient]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1000px] m-4">
            <div className=" relative w-full max-w-[1000px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Data Pasien {selectedPatient?.full_name ? `- ${selectedPatient.full_name}` : ""} No RM {selectedPatient?.mr_no ? `- ${selectedPatient.mr_no}` : ""} 
                        {/* Gunakan selectedPatient.full_name untuk judul */}
                    </h4>
                    {!selectedPatient && <p>Memuat data pasien...</p>}
                </div>
                {selectedPatient && (
                    <form className="flex flex-col">
                        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                            <div>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
    
                                    <div>
                                        <Label>Jaminan</Label>
                                        <Select options={options} placeholder="Select an option" className="dark:bg-dark-900"/>
                                    </div>
                                    <div>
                                        <Label>DPJP</Label>
                                        <Select options={options} placeholder="Select an option" className="dark:bg-dark-900"/>
                                    </div>
                                    <div className="col-span-2">
                                        <Label>Jenis Pelayanan</Label>
                                        <Select options={options} placeholder="Select an option" className="dark:bg-dark-900"/>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-7">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Tanggal Masuk</Label>
                                        <DatePicker
                                            id="date-picker-masuk"
                                            placeholder="Select a date"
                                            value={formData.tanggalMasuk}
                                            onChange={(dates, currentDateString) => {
                                                console.log({ dates, currentDateString });
                                            }}
                                            options={{ enableTime: false, dateFormat: "Y-m-d" }}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Tanggal Keluar</Label>
                                        <DatePicker
                                            id="date-picker-keluar"
                                            placeholder="Select a date"
                                            value={formData.tanggalKeluar}
                                            onChange={(dates, currentDateString) => {
                                                console.log({ dates, currentDateString });
                                            }}
                                            options={{ enableTime: false, dateFormat: "Y-m-d" }}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Status Pasien</Label>
                                        <Select options={options} placeholder="Select an option" className="dark:bg-dark-900"/>
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Asal/Tujuan Ruangan</Label>
                                        <Select options={options} placeholder="Select an option" className="dark:bg-dark-900"/>
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Pasien Keluar Mati</Label>
                                        <Select options={options} placeholder="Select an option" className="dark:bg-dark-900"/>
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Keterangan</Label>
                                        <Input
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            {/* Pastikan onClick memanggil prop onClose */}
                            <Button size="sm" variant="outline" onClick={onClose} type="button">
                                Close
                            </Button>
                            {/* Tombol Save Changes di-komentar karena modal hanya untuk tampilan */}
                            {/* <Button size="sm" onClick={handleSave} type="button">
                                Save Changes
                            </Button> */}
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}