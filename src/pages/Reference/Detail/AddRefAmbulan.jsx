import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { ambulanService } from "../../../services/reference/ambulan.service";
import { toast } from "react-toastify";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import SelectField from "../../../components/form/SelectField"
import Button from "../../../components/ui/button/Button";
import { Link } from "react-router";

export default function AddRefAmbulan() {
       
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12">
                <ComponentCard>
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                        <div className="space-y-6">
                            <form className="">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="">
                                        <Label
                                            htmlFor="firstName"
                                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            Jenis Ambulan
                                        </Label>
                                        <div className="relative">
                                            <div className="relative">
                                                <SelectField
                                                    options={options}
                                                    placeholder="Select Option"
                                                    className="dark:bg-dark-900"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <Label
                                            htmlFor="lastName"
                                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            Tujuan
                                        </Label>
                                        <div className="relative">
                                            <Input type="text" id="inputTwo" placeholder="info@gmail.com" />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="street"
                                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            BBM
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="city"
                                                className=" h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor="state"
                                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            Kapal Penyebrangan
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="state"
                                                className=" h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor="postCode"
                                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            Uang Makan
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="postCode"
                                                className=" h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor="email"
                                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            Total Pembayaran
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="postCode"
                                                className=" h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 flex gap-3 justify-end">
                                        <Link to="/referensi-ambulan"
                                         className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 ">
                                            Kembali
                                        </Link>
                                        <Button className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ">
                                            Simpan
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