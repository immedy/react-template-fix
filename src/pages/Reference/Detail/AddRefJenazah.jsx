import { useState, useEffect } from "react"; // Import useEffect dan useState
import { useParams, Link } from "react-router-dom"; // ✅ Import useParams dan Link dari react-router-dom
import useAuth from "../../../hooks/useAuth";
import { ambulanService } from "../../../services/reference/ambulan.service";

import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import SelectField from "../../../components/form/SelectField"
import Button from "../../../components/ui/button/Button";
import DatePicker from "../../../components/form/date-picker";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";

export default function AddRefJenazah() {
    const { id } = useParams(); // ✅ Ambil ID dari URL
    const { user, isInitialized } = useAuth();
    const token = user?.token || localStorage.getItem("accessToken");

    // ✅ State untuk menyimpan data formulir
    const [formData, setFormData] = useState({
        tindakan: '',
        harga: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ✅ Efek untuk memuat data saat ada ID
    useEffect(() => {
        if (!id) {
            // Ini adalah mode "Tambah Data", tidak perlu fetch API
            return;
        }

        const fetchTindakanData = async () => {
            if (!isInitialized || !token) {
                return;
            }
            
            setLoading(true);
            setError(null);
            
            const result = await ambulanService.getTindakanJenazahById(token, id);

            if (result.success) {
                // ✅ Update state formulir dengan data yang diambil dari API
                setFormData({
                    tindakan: result.data.tindakan,
                    harga: result.data.harga,
                });
            } else {
                setError(result.error || 'Gagal memuat data tindakan.');
            }
            setLoading(false);
        };
        
        fetchTindakanData();
    }, [id, isInitialized, token]);

    // ✅ Handler untuk perubahan input
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    if (loading) {
        return <p>Memuat data...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12">
                <ComponentCard>
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                        <div className="space-y-6">
                            <form className="">                            
                                <div className="grid gap-6 sm:grid-cols-3">
                                    <div className="sm:col-span-2">
                                        <Label
                                            htmlFor="tindakan"
                                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                            Tindakan
                                        </Label>
                                        <div className="relative">
                                            <div className="relative">
                                                <Input 
                                                    type="text" 
                                                    id="tindakan" 
                                                    placeholder="Deskripsi tindakan" 
                                                    value={formData.tindakan} 
                                                    onChange={handleInputChange} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <Label
                                            htmlFor="harga"
                                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                            Harga
                                        </Label>
                                        <div className="relative">
                                          
                                            <Input 
                                                type="number" 
                                                id="harga" 
                                                placeholder="0" 
                                                value={formData.harga} 
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3 flex gap-3 justify-end">
                                        <Link to="/referensi-jenazah"
                                            className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 ">
                                            Kembali
                                        </Link>
                                        <Button className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ">
                                            {id ? "Simpan Perubahan" : "Simpan"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </ComponentCard>
            </div>
        </div>
    );
}