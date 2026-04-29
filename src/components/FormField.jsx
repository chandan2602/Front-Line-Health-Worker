import React from 'react';

function FormField({ label, required, children, hint }) {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required"> *</span>}
        </label>
      )}
      {children}
      {hint && <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{hint}</span>}
    </div>
  );
}

export default FormField;
