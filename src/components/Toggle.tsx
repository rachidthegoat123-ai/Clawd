"use client";

interface ToggleProps {
  enabled: boolean;
  onToggle: (value: boolean) => void;
  label?: string;
  description?: string;
}

export default function Toggle({ enabled, onToggle, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between">
      {(label || description) && (
        <div className="flex-1 mr-4">
          {label && <p className="text-sm font-medium text-gray-200">{label}</p>}
          {description && (
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      )}
      <button
        onClick={() => onToggle(!enabled)}
        className={`toggle-track ${enabled ? "active" : ""}`}
        role="switch"
        aria-checked={enabled}
      >
        <div className="toggle-thumb" />
      </button>
    </div>
  );
}
