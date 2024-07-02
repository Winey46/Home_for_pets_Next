export default function Input({label, name, error, textarea, ...props}) {

  return (
    <div className="input-wrapper">
      <label className="label" htmlFor={name}>{label}</label>
      {textarea ?
        <textarea
          className="textarea"
          name={name}
          {...props} /> :
        <input
          className="input"
          name={name}
          {...props}
        />}
      <div className="control-error">
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  )
}