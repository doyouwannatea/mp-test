type Props = {
  label: string;
  placeholder: string;
  value: string | number | undefined;
  options: React.ReactNode;
  onChange: (value: string | number) => void;
};

const AppSelect = ({ label, options, placeholder, value, onChange }: Props) => (
  <label>
    {label}
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value={0} disabled>
        {placeholder}
      </option>
      {options}
    </select>
  </label>
);

export default AppSelect;
