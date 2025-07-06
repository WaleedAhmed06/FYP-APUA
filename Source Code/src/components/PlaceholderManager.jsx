// src/components/PlaceholderManager.jsx
import PropTypes from "prop-types";
import { useState } from "react";

export default function PlaceholderManager({
  placeholders,
  onAddPlaceholder,
  onRemovePlaceholder,
}) {
  const [newKey, setNewKey] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const key = newKey.trim().toLowerCase();
    if (key && !placeholders.includes(key)) {
      onAddPlaceholder(key);
    }
    setNewKey("");
  };

  const isDisabled = !newKey.trim();

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Dynamic Fields
      </label>
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="fieldName"
          className="flex-1 border rounded px-2 py-1 focus:ring focus:outline-none"
        />
        <button
          type="submit"
          disabled={isDisabled}
          className={`px-3 py-1 rounded transition-colors focus:outline-none ${
            isDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Add
        </button>
      </form>

      {placeholders.length > 0 && (
        <div className="mt-4 space-y-1">
          <p className="text-sm text-gray-600">Current fields:</p>
          <ul className="list-disc ml-5">
            {placeholders.map((key) => (
              <li key={key} className="flex items-center justify-between">
                <span className="capitalize">{key}</span>
                <button
                  onClick={() => onRemovePlaceholder(key)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

PlaceholderManager.propTypes = {
  placeholders: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddPlaceholder: PropTypes.func.isRequired,
  onRemovePlaceholder: PropTypes.func.isRequired,
};
