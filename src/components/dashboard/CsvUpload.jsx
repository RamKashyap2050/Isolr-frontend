import React from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, ArrowRight } from 'lucide-react';

const CsvUpload = ({ file, handleFileChange, handleUpload, isUploading, uploadStatus }) => {
    return (
        <div className="xl:col-span-3 glass-card p-8 md:p-12 border-primary/10 shadow-2xl shadow-primary/5">
            <div className="mb-10">
                <h3 className="text-2xl font-black mb-2 flex items-center gap-3 tracking-tight">
                    <Upload className="text-primary" size={24} />
                    Multi-Tenant Ingest
                </h3>
                <p className="text-text-dim leading-relaxed">Asynchronously provision user data directly into your isolated MongoDB schema.</p>
            </div>

            <form onSubmit={handleUpload}>
                <div 
                    className={`
                        border-2 border-dashed rounded-2xl p-12 text-center mb-8 transition-all duration-300
                        ${file ? 'bg-primary/5 border-primary/40 ring-4 ring-primary/5' : 'bg-black/20 border-white/10 hover:border-white/20'}
                    `}
                    onClick={() => document.getElementById('fileInput').click()}
                >
                    <input 
                        id="fileInput"
                        type="file" 
                        accept=".csv"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    {file ? (
                        <div className="flex flex-col items-center gap-4 py-4 animate-in fade-in zoom-in duration-300">
                            <div className="bg-primary/20 p-4 rounded-2xl">
                                <FileText size={48} className="text-primary" />
                            </div>
                            <div>
                                <p className="font-bold text-lg">{file.name}</p>
                                <p className="text-xs text-text-dim mt-1 uppercase tracking-widest font-black">{(file.size / 1024).toFixed(2)} KB DATA PACK</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 py-4 opacity-60 group cursor-pointer">
                            <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-white/10 transition-colors">
                                <Upload size={48} className="text-text-dim" />
                            </div>
                            <div>
                                <p className="font-bold text-lg">Drop Tenant CSV</p>
                                <p className="text-xs text-text-dim mt-1 uppercase tracking-widest">Supports .csv up to 50MB</p>
                            </div>
                        </div>
                    )}
                </div>

                {uploadStatus && (
                    <div className={`
                        p-5 rounded-xl mb-8 flex items-center gap-4 animate-in slide-in-from-top-4 duration-300
                        ${uploadStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}
                    `}>
                        {uploadStatus.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                        <span className="font-bold text-sm tracking-tight">{uploadStatus.message}</span>
                    </div>
                )}

                <button 
                    className="btn-primary w-full py-5 text-lg font-black tracking-tight flex items-center justify-center gap-2 group disabled:grayscale-[0.5] disabled:opacity-50" 
                    disabled={!file || isUploading}
                >
                    {isUploading ? (
                        <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Ingesting Payload...
                        </>
                    ) : (
                        <>
                        Initialize Batch Import
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default CsvUpload;
