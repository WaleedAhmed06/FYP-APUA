import { useEffect, useRef, useState } from "react";
import { DrawerWithNavigation } from "../components/drawer";

const UploadResults = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [infoMessage, setInfoMessage] = useState(null);
    const [jobId, setJobId] = useState(null);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!jobId) return;
        const interval = setInterval(async () => {
            const res = await fetch(`http://localhost:3000/api/status/result/${jobId}`);
            if (!res.ok) return;
            const status = await res.json();
            if (status.status === "done" || status.status === "error") {
                clearInterval(interval);
                setInfoMessage(
                    `Job finished with status ${status.status}` +
                    (status.failed?.length ? `, ${status.failed.length} failures` : "")
                );
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [jobId]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
            setProgress(100);
        }
    };

    const resetFileInput = () => {
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const handleUploadClick = async () => {
        if (!uploadedFile) {
            alert("Please upload a CSV or XLSX file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", uploadedFile);

        setUploading(true);
        try {
            const response = await fetch("http://localhost:3000/api/email/upload/results", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            setUploading(false);
            setJobId(result.jobId);
            if (!response.ok) throw new Error(result.error || result.message);
            setInfoMessage(`✅ ${result.message}`);
            setUploadedFile(null);
            resetFileInput();
            setProgress(0);
        } catch (error) {
            setJobId(null);
            alert("❌ Upload failed: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <div><DrawerWithNavigation /></div>
            <div className="w-full bg-gray-100 rounded-lg shadow-md p-6 pt-20 overflow-y-auto h-[92vh]">
                <div className="max-w-6xl bg-white max-w-6x rounded-lg p-6 mx-auto">
                    <h1 className="text-xl font-semibold text-center mb-6">Upload Result CSV</h1>

                    {infoMessage && (
                        <div className="mb-4 p-3 bg-blue-50 text-blue-800 rounded">
                            {infoMessage}
                        </div>
                    )}


                    <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center mb-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv,.xlsx"
                            className="hidden"
                            id="file-upload"
                            onChange={handleFileUpload}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <div className="text-gray-600">
                                <span className="text-blue-500 underline">Browse</span>
                            </div>
                            <div className="text-sm text-gray-400 mt-2">
                                Supported formats: CSV, Excel
                            </div>
                        </label>
                    </div>

                    {uploading && (
                        <div className="mb-4">
                            <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-600 transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="text-sm text-gray-500 mt-2">
                                Uploading... {Math.round(progress)}%
                            </div>
                        </div>
                    )}

                    {uploadedFile && (
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold mb-2">Selected File</h3>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <span>{uploadedFile.name}</span>
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => {
                                        setUploadedFile(null);
                                        resetFileInput();
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}

                    <button
                        disabled={uploading}
                        className={`w-full py-2 rounded-lg text-white ${uploading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600"
                            }`}
                        onClick={handleUploadClick}
                    >
                        {uploading ? "Uploading..." : "Upload Result & Send Mails"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default UploadResults;
