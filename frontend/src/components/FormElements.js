import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { space, fontSize, fontWeight, colors, transition } from '../utils/designTokens';

// Enhanced Input with validation feedback
export const ValidatedInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  validationState,
  errorMessage,
  icon,
  ...props
}) => {
  const isInvalid = validationState === 'invalid';
  const isValid = validationState === 'valid';

  return (
    <div style={{ marginBottom: space.lg }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            display: 'block',
            marginBottom: space.sm,
            color: colors.text.light,
            fontSize: fontSize.sm,
            fontWeight: fontWeight.medium,
          }}
        >
          {label} {required && <span style={{ color: colors.green.accent }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <div
            style={{
              position: 'absolute',
              left: space.md,
              top: '50%',
              transform: 'translateY(-50%)',
              color: isInvalid ? '#ff4d4d' : colors.text.medium,
              transition: transition.base,
            }}
          >
            {icon}
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${name}-error` : undefined}
          style={{
            width: '100%',
            padding: icon ? `${space.md} ${space.md} ${space.md} ${space['2xl']}` : space.md,
            background: 'rgba(255, 255, 255, 0.02)',
            border: `2px solid ${
              isInvalid ? '#ff4d4d' : isValid ? colors.green.accent : 'rgba(255, 255, 255, 0.1)'
            }`,
            borderRadius: '8px',
            color: colors.text.light,
            fontSize: fontSize.base,
            transition: transition.base,
            outline: 'none',
          }}
          {...props}
        />
        <AnimatePresence>
          {validationState && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                right: space.md,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              {isValid ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill={colors.green.accent} />
                  <path
                    d="M6 10L9 13L14 8"
                    stroke={colors.black.primary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : isInvalid ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#ff4d4d" />
                  <path
                    d="M7 7L13 13M13 7L7 13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isInvalid && errorMessage && (
          <motion.p
            id={`${name}-error`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            style={{
              marginTop: space.xs,
              color: '#ff4d4d',
              fontSize: fontSize.sm,
            }}
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Textarea with validation
export const ValidatedTextarea = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  validationState,
  errorMessage,
  rows = 4,
  maxLength,
  ...props
}) => {
  const isInvalid = validationState === 'invalid';
  const isValid = validationState === 'valid';

  return (
    <div style={{ marginBottom: space.lg }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            display: 'block',
            marginBottom: space.sm,
            color: colors.text.light,
            fontSize: fontSize.sm,
            fontWeight: fontWeight.medium,
          }}
        >
          {label} {required && <span style={{ color: colors.green.accent }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${name}-error` : undefined}
          style={{
            width: '100%',
            padding: space.md,
            background: 'rgba(255, 255, 255, 0.02)',
            border: `2px solid ${
              isInvalid ? '#ff4d4d' : isValid ? colors.green.accent : 'rgba(255, 255, 255, 0.1)'
            }`,
            borderRadius: '8px',
            color: colors.text.light,
            fontSize: fontSize.base,
            transition: transition.base,
            outline: 'none',
            resize: 'vertical',
            minHeight: '100px',
          }}
          {...props}
        />
        {maxLength && (
          <div
            style={{
              position: 'absolute',
              bottom: space.sm,
              right: space.sm,
              fontSize: fontSize.xs,
              color: value.length > maxLength * 0.9 ? '#ff4d4d' : colors.text.medium,
            }}
          >
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      <AnimatePresence>
        {isInvalid && errorMessage && (
          <motion.p
            id={`${name}-error`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            style={{
              marginTop: space.xs,
              color: '#ff4d4d',
              fontSize: fontSize.sm,
            }}
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// Select dropdown with validation
export const ValidatedSelect = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder = 'Select an option',
  required = false,
  validationState,
  errorMessage,
  ...props
}) => {
  const isInvalid = validationState === 'invalid';
  const isValid = validationState === 'valid';

  return (
    <div style={{ marginBottom: space.lg }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            display: 'block',
            marginBottom: space.sm,
            color: colors.text.light,
            fontSize: fontSize.sm,
            fontWeight: fontWeight.medium,
          }}
        >
          {label} {required && <span style={{ color: colors.green.accent }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${name}-error` : undefined}
          style={{
            width: '100%',
            padding: space.md,
            paddingRight: space['2xl'],
            background: 'rgba(255, 255, 255, 0.02)',
            border: `2px solid ${
              isInvalid ? '#ff4d4d' : isValid ? colors.green.accent : 'rgba(255, 255, 255, 0.1)'
            }`,
            borderRadius: '8px',
            color: value ? colors.text.light : colors.text.medium,
            fontSize: fontSize.base,
            transition: transition.base,
            outline: 'none',
            appearance: 'none',
            cursor: 'pointer',
          }}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              style={{
                background: colors.black.secondary,
                color: colors.text.light,
              }}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div
          style={{
            position: 'absolute',
            right: space.md,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: colors.text.medium,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 8L10 13L15 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <AnimatePresence>
        {isInvalid && errorMessage && (
          <motion.p
            id={`${name}-error`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            style={{
              marginTop: space.xs,
              color: '#ff4d4d',
              fontSize: fontSize.sm,
            }}
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// Form success/error messages
export const FormMessage = ({ type, message, onClose }) => {
  const isError = type === 'error';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{
        padding: space.lg,
        background: isError ? 'rgba(255, 77, 77, 0.1)' : 'rgba(0, 255, 127, 0.1)',
        border: `2px solid ${isError ? '#ff4d4d' : colors.green.accent}`,
        borderRadius: '8px',
        color: isError ? '#ff4d4d' : colors.green.accent,
        fontSize: fontSize.base,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: space.xl,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: space.md }}>
        {isError ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M8 12L11 15L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            padding: space.xs,
          }}
          aria-label="Close message"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </motion.div>
  );
};