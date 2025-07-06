import PropTypes from "prop-types";
import TemplatePreview from "./TemplatePreview";

export default function Sidebar({ templates, selectedId, onSelect, onView }) {
    return (
        <aside className="bg-white border-r overflow-auto">
            <h2 className="p-4 font-semibold border-b">Templates</h2>
            <ul className="space-y-2 p-2">
                {templates.map((tpl) => (
                    <li
                        key={tpl._id}
                        className={`rounded border hover:shadow-md transition overflow-hidden ${
                            tpl._id === selectedId
                                ? "border-blue-500 ring-2 ring-blue-300"
                                : "border-gray-200"
                        }`}
                    >
                        <TemplatePreview
                            html={tpl.content}
                            onView={() => onView?.(tpl)}
                            onEdit={() => onSelect?.(tpl)}
                        />
                        <div className="p-2 text-sm font-medium text-gray-800 truncate">
                            {tpl.name}
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

Sidebar.propTypes = {
    templates: PropTypes.array.isRequired,
    selectedId: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onView: PropTypes.func,
};
