interface FieldProps {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}
const Field: React.FC<FieldProps> = ({ label, name, type, autoComplete, onChange }) => {
  return (
    <>
      <div>
        <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <input
            id={name}
            name={name}
            type={type}
            required
            autoComplete={autoComplete}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
    </>
  );
}

export default Field; 