import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { ambulanService } from "../../../services/reference/ambulan.service";
import { toast } from 'react-toastify'; 
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";

export default function AddRefJenazah() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isInitialized } = useAuth();
    const token = user?.token || localStorage.getItem("accessToken");

    const [formData, setFormData] = useState({
        tindakan: '',
        harga: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
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
                setFormData({
                    tindakan: result.data.tindakan,
                    harga: result.data.harga,
                });
            } else {
                setError(result.error || 'Gagal memuat data tindakan.');
                toast.error(result.error || 'Gagal memuat data tindakan.'); 
            }
            setLoading(false);
        };
        
        fetchTindakanData();
    }, [id, isInitialized, token]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const payload = {
            ...formData
        };

        if (id) {
            payload.id = id;
        }

        const result = await ambulanService.upsertTindakanJenazah(token, payload);
        
        if (result.success) {
            toast.success(result.data.message); 
            navigate("/referensi-jenazah");
        } else {
            setError(result.error);
            toast.error(result.error);
        }
        
        setLoading(false);
    };

    // ✅ Fungsi baru untuk memeriksa validitas formulir
    const isFormValid = () => {
        return formData.tindakan.trim() !== '' && formData.harga.toString().trim() !== '';
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
                            <form className="" onSubmit={handleSubmit}>
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
                                        <Button 
                                            type="submit" 
                                            className="inline-flex items-center justify-center gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
                                            // ✅ Mengatur status disabled berdasarkan validitas formulir
                                            disabled={loading || !isFormValid()}>
                                            {loading ? "Menyimpan..." : (id ? "Update" : "Simpan")}
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
