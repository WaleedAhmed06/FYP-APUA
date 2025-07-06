// src/pages/OfferLetterDashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import EnhancedRichTextEditor from "../components/EnhancedRichTextEditor";
import PlaceholderManager from "../components/PlaceholderManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { DrawerWithNavigation } from "../components/drawer";

export default function OfferLetterDashboard() {
    const [templates, setTemplates] = useState([]);
    const [selected, setSelected] = useState(null);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [placeholders, setPlaceholders] = useState([]);
    const [error, setError] = useState("");
    const [modal, setModal] = useState(null);
    const [confirmPending, setConfirmPending] = useState(null);
    const [previewing, setPreviewing] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // load list
    useEffect(() => {
        axios
            .get("/api/offer-letters")
            .then(({ data }) => setTemplates(data))
            .catch(console.error);
    }, []);

    const showModal = (type, message) => setModal({ type, message });
    const closeModal = () => setModal(null);

    // load template or clear
    const doLoad = (tpl) => {
        if (!tpl) {
            setSelected(null);
            setName("");
            setContent("");
            setPlaceholders([]);
        } else {
            setSelected(tpl);
            setName(tpl.name);
            setContent(tpl.content);
            setPlaceholders(tpl.placeholders.map((p) => p.toLowerCase()));
        }

        setConfirmPending(null);
    };

    const loadTemplate = (tpl) => {
        if ((!content.trim() || !name.trim() || !placeholders?.length)) {
            doLoad(tpl);
            return;
        }
        setConfirmPending(tpl);
        showModal('confirm', 'Discard unsaved changes?');
        return;
    };

    // confirmation handlers
    const handleConfirm = (ok) => {
        closeModal();
        if (ok && confirmPending !== null) {
            doLoad(confirmPending);
        }
    };

    // detect placeholders in content
    const extractPlaceholders = (html) => {
        return Array.from(
            new Set(
                [...html.matchAll(/{{\s*(\w+)\s*}}/g)].map((m) => m[1].toLowerCase())
            )
        );
    };

    // content change
    const handleContentChange = (newHtml) => {
        setContent(newHtml);
        setPlaceholders(extractPlaceholders(newHtml));
    };

    // add or wrap placeholder
    const handleAddPlaceholder = (key) => {
        const lower = key.toLowerCase();
        const wordRegex = new RegExp(`\\b${lower}\\b`, "gi");
        let updated = content;
        if (wordRegex.test(content)) {
            updated = content.replace(wordRegex, `{{${lower}}}`);
        } else {
            updated = content + `{{${lower}}}`;
        }
        setContent(updated);
        setPlaceholders((prev) => Array.from(new Set([...prev, lower])));

    };

    // remove placeholder
    const handleRemovePlaceholder = (key) => {
        const lower = key.toLowerCase();
        const wrapRegex = new RegExp(`{{\\s*${lower}\\s*}}`, "gi");
        const updated = content.replace(wrapRegex, lower);
        setContent(updated);
        setPlaceholders((prev) => prev.filter((p) => p !== lower));

    };

    // save action
    const handleSave = async () => {
        if (!name.trim() || !content.trim()) {
            showModal('info', 'Name and content cannot be empty.');
            return;
        }
        setError("");
        try {
            const payload = { name, content, placeholders };
            const res = selected
                ? await axios.put(`/api/offer-letters/${selected._id}`, payload)
                : await axios.post('/api/offer-letters', payload);
            const updated = res.data;
            // update list
            setTemplates((prev) => {
                const others = prev.filter((t) => t._id !== updated._id);
                return [updated, ...others];
            });
            setSelected(updated);

            showModal('info', 'Template saved.');
        } catch (error) {
            const errorMsg = `Save failed. ${error.response?.data?.message || error.message}`;
            showModal('info', errorMsg);
            setError(errorMsg);
        }
    };

    return (
        <>
            <div><DrawerWithNavigation /></div>
            <div className="h-screen flex flex-col bg-gray-100">
                {/* Top Bar */}
                <div className="sticky top-0 z-30 bg-white shadow px-4 py-3 flex items-center justify-between md:hidden">
                    <button
                        className="text-gray-700 text-2xl"
                        onClick={() => setDrawerOpen(true)}
                        aria-label="Open sidebar"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <h1 className="text-lg font-semibold">Offer Letter Dashboard</h1>
                </div>

                {/* Drawer - Mobile */}
                {drawerOpen && (
                    <div className="fixed inset-0 z-50 flex">
                        <div className="bg-white h-full shadow-lg p-4 overflow-y-auto">
                            <div className="flex justify-end mb-2">
                                <button
                                    onClick={() => setDrawerOpen(false)}
                                    className="text-gray-500 hover:text-black text-xl"
                                    aria-label="Close drawer"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                            <Sidebar
                                templates={templates}
                                selectedId={selected?._id}
                                onSelect={(tpl) => {
                                    setDrawerOpen(false);
                                    loadTemplate(tpl);
                                }}
                                onView={(tpl) => {
                                    setDrawerOpen(false);
                                    setPreviewing(tpl);
                                }}
                            />
                        </div>
                        <div
                            className="flex-1 bg-black bg-opacity-50"
                            onClick={() => setDrawerOpen(false)}
                        />
                    </div>
                )}

                {/* Main Layout */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden md:block bg-white border-r h-full overflow-y-auto">
                        <Sidebar
                            templates={templates}
                            selectedId={selected?._id}
                            onSelect={loadTemplate}
                            onView={setPreviewing}
                        />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6">
                        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow space-y-6">
                            {/* Template Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <input
                                    className="text-lg sm:text-xl font-semibold border-b pb-1 flex-1"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Template Name"
                                />
                                <button
                                    onClick={handleSave}
                                    disabled={!name.trim() || !content.trim() || !placeholders.length}
                                    className={`px-4 py-2 rounded focus:outline-none transition ${!name.trim() || !content.trim() || !placeholders.length
                                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                        }`}
                                >
                                    Save
                                </button>
                            </div>

                            {error && <p className="text-red-500">{error}</p>}

                            <EnhancedRichTextEditor
                                value={content}
                                onChange={handleContentChange}
                                onInit={() => { }}
                                placeholders={placeholders}
                            />

                            <PlaceholderManager
                                placeholders={placeholders}
                                onAddPlaceholder={handleAddPlaceholder}
                                onRemovePlaceholder={handleRemovePlaceholder}
                            />
                        </div>
                    </main>
                </div>

                {/* Preview Modal */}
                {previewing && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl h-full max-h-[90vh] overflow-hidden">
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
                                onClick={() => setPreviewing(null)}
                                title="Close Preview"
                            >
                                ✖
                            </button>
                            <div className="h-full overflow-auto p-6 bg-gray-100">
                                <div className="bg-white mx-auto shadow-md rounded-md px-6 sm:px-12 py-8 sm:py-10 w-full sm:w-[794px] min-h-[1123px] font-serif text-[15px] leading-relaxed text-gray-800 space-y-6">
                                    <div
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: previewing.content }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Popup */}
                {modal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-4">
                            <p className="text-gray-800">{modal.message}</p>
                            {modal.type === "confirm" ? (
                                <div className="flex justify-end space-x-3">
                                    <button
                                        className="px-4 py-2 bg-white border rounded hover:bg-gray-100"
                                        onClick={() => handleConfirm(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                        onClick={() => handleConfirm(true)}
                                    >
                                        Discard
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-end">
                                    <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        onClick={closeModal}
                                    >
                                        OK
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );

}
