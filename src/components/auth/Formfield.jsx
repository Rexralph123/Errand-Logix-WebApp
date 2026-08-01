export default function FormField({
  id,
  label,
  type = "text",
  icon: Icon,
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="auth-input-icon">
        {Icon && <Icon size={18} />}
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
        />
      </div>
    </div>
  );
}