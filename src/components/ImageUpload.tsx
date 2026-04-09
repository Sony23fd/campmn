"use client";

import { useState } from "react";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    className?: string;
    label?: string;
}

export default function ImageUpload({ value, onChange, className = "", label = "Зураг оруулах" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Upload failed");
            }

            const data = await res.json();
            if (data.url) {
                onChange(data.url);
            }
        } catch (err) {
            console.error("Upload error:", err);
            setError("Зураг хуулахад алдаа гарлаа.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {value && (
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-slate-200 shadow-sm mb-3">
                    <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                        title="Зургийг устгах"
                    >
                        &times;
                    </button>
                </div>
            )}

            {!value && (
                <div>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {uploading ? (
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mb-2"></div>
                            ) : (
                                <svg className="w-8 h-8 mb-4 text-slate-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                            )}
                            <p className="mb-2 text-sm text-slate-500 font-semibold">{uploading ? "Хуулж байна..." : label}</p>
                            <p className="text-xs text-slate-400 font-medium">PNG, JPG, WEBP эсвэл GIF</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                    </label>
                </div>
            )}

            {error && <p className="text-sm text-red-500 font-medium mt-1">{error}</p>}
        </div>
    );
}
