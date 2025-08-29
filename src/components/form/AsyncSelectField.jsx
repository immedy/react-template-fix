// src/components/form/select/AsyncSelectField.jsx

import React from "react";
import AsyncSelect from "react-select/async";

const AsyncSelectField = ({
  placeholder = "Select an option",
  onChange,
  className = "",
  name,
  isDisabled = false,
  loadOptions, // Prop khusus untuk AsyncSelect
  defaultOptions, // Prop khusus untuk AsyncSelect
  cacheOptions = true,
  ...props
}) => {
  // Objek styling kustom yang sama persis dari SelectField.jsx
  const customStyles = {
    // Styling untuk container utama (control) dari Select
    control: (baseStyles, state) => {
      let borderColor = 'var(--color-gray-300)';
      let boxShadow = 'none';
      let backgroundColor = 'transparent';

      // Dark mode defaults
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        borderColor = 'var(--color-gray-700)';
        backgroundColor = 'var(--color-gray-900)';
      }

      // Focus state
      if (state.isFocused) {
        borderColor = 'var(--color-brand-300)';
        boxShadow = '0 0 0 3px rgba(var(--color-brand-500-rgb), 0.2)';
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          borderColor = 'var(--color-brand-800)';
        }
      }

      // Disabled state
      if (state.isDisabled) {
        backgroundColor = 'var(--color-gray-100)';
        borderColor = 'var(--color-gray-300)';
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          backgroundColor = 'var(--color-gray-800)';
          borderColor = 'var(--color-gray-700)';
        }
      }

      return {
        ...baseStyles,
        minHeight: '44px',
        height: '44px',
        borderRadius: '0.5rem',
        borderWidth: '1px',
        borderColor: borderColor,
        boxShadow: boxShadow,
        backgroundColor: backgroundColor,
        transition: 'all 0.1s ease-in-out',
        cursor: state.isDisabled ? 'not-allowed' : 'default',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        
        '&:hover': {
          borderColor: state.isFocused ? borderColor : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'var(--color-gray-700)' : 'var(--color-gray-300)'),
        },
      };
    },
    // Styling untuk teks placeholder
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: 'var(--color-gray-400)',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      '@media (prefers-color-scheme: dark)': {
        color: 'var(--color-white-30)',
      },
    }),
    // Styling untuk teks yang sudah dipilih
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: 'var(--color-gray-800)',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      '@media (prefers-color-scheme: dark)': {
        color: 'var(--color-white-90)',
      },
    }),
    // Styling untuk input yang diketik (saat isSearchable)
    input: (baseStyles) => ({
      ...baseStyles,
      margin: '0px',
      padding: '0px',
      color: 'var(--color-gray-800)',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      '@media (prefers-color-scheme: dark)': {
        color: 'var(--color-white-90)',
      },
    }),
    // Styling untuk indikator (panah dropdown)
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: 'var(--color-gray-300)',
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: 'var(--color-gray-700)',
      },
    }),
    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      color: 'var(--color-gray-500)',
      '&:hover': {
        color: 'var(--color-gray-600)',
      },
      '@media (prefers-color-scheme: dark)': {
        color: 'var(--color-gray-400)',
        '&:hover': {
          color: 'var(--color-gray-300)',
        },
      },
    }),
    clearIndicator: (baseStyles, state) => ({
        ...baseStyles,
        color: 'var(--color-gray-500)',
        '&:hover': {
          color: 'var(--color-gray-600)',
        },
        '@media (prefers-color-scheme: dark)': {
          color: 'var(--color-gray-400)',
          '&:hover': {
            color: 'var(--color-gray-300)',
          },
        },
    }),
    // Styling untuk menu dropdown
    menu: (baseStyles) => ({
      ...baseStyles,
      zIndex: 9999,
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      marginTop: '0.25rem',
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: 'var(--color-gray-800)',
      },
    }),
    // Styling untuk setiap opsi di dropdown
    option: (baseStyles, { isFocused, isSelected }) => ({
      ...baseStyles,
      backgroundColor: isSelected ? 'var(--color-brand-500)' : isFocused ? 'var(--color-blue-50)' : 'transparent',
      color: isSelected ? 'var(--color-white)' : 'var(--color-gray-700)',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      '&:active': {
        backgroundColor: isSelected ? 'var(--color-brand-600)' : 'var(--color-blue-100)',
      },
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: isSelected ? 'var(--color-brand-600)' : isFocused ? 'var(--color-gray-700)' : 'transparent',
        color: isSelected ? 'var(--color-white)' : 'var(--color-gray-300)',
        '&:active': {
          backgroundColor: isSelected ? 'var(--color-brand-700)' : 'var(--color-gray-600)',
        },
      },
    }),
  };

  return (
    <AsyncSelect
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      name={name}
      className={className}
      styles={customStyles}
      isDisabled={isDisabled}
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      cacheOptions={cacheOptions}
      {...props}
    />
  );
};

export default AsyncSelectField;