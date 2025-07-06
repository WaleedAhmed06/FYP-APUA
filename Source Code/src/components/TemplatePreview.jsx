import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function TemplatePreview({ html, onView, onEdit }) {
    const hiddenRef = useRef();
    const [img, setImg] = useState(null);

    // Wait until element is rendered (height stabilizes), then render
    useEffect(() => {
        setImg(null); // Reset image on content change

        let frame;
        const waitForRender = () => {
            const el = hiddenRef.current;
            if (!el) return;

            // If element has non-zero height, assume it's rendered
            if (el.offsetHeight > 0 && el.offsetWidth > 0) {
                html2canvas(el, {
                    backgroundColor: "#fff",
                    scale: 0.5,
                    useCORS: true,
                    logging: false,
                }).then((canvas) => {
                    setImg(canvas.toDataURL("image/png"));
                });
                return;
            }

            // Otherwise wait for next frame
            frame = requestAnimationFrame(waitForRender);
        };

        waitForRender();
        return () => cancelAnimationFrame(frame);
    }, [html]);

    return (
        <div className="relative group">
            {/* Hidden content to render */}
            <div
                ref={hiddenRef}
                dangerouslySetInnerHTML={{ __html: html }}
                className="absolute left-[-9999px] top-[-9999px] w-[400px] p-4 bg-white text-sm leading-snug"
            />

            {/* Preview image */}
            {img ? (
                <img
                    src={img}
                    alt="template preview"
                    className="w-full h-40 object-cover border-b"
                />
            ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                    Generating preview...
                </div>
            )}

            {/* Hover overlay with icons */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onView?.();
                    }}
                    className="text-white hover:text-blue-300 text-lg"
                    title="View Full"
                >
                    <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.();
                    }}
                    className="text-white hover:text-green-300 text-lg"
                    title="Edit Template"
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </div>
        </div>
    );
}

TemplatePreview.propTypes = {
    html: PropTypes.string.isRequired,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
};
