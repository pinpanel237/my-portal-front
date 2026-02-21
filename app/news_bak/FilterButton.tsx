export default function FilterButton({category, label, isActive, onClick}: {
    category: string,
    label: string,
    isActive: boolean,
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 border rounded-full text-sm transition-all ${
                isActive
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-gray-300 hover:bg-gray-100'
            }`}
        >
            {label}
        </button>
    );
};