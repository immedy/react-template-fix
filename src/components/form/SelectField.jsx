// src/components/form/select/SelectField.jsx

import React from "react";
import Select from "react-select";
// Anda mungkin perlu membuat file CSS ini atau menambahkan variabel CSS ke global style Anda
// import "./select-styles.css";

const SelectField = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = null, // defaultValue di react-select adalah object { value: 'x', label: 'X' }
  name,
  isDisabled = false, // Menambahkan prop isDisabled
  isSearchable = true, // Default true untuk select yang bisa diinput
  isClearable = true,  // Opsi untuk tombol clear
  ...props
}) => {
  // Objek styling kustom untuk menyesuaikan dengan komponen InputField Anda
  const customStyles = {
    // Styling untuk container utama (control) dari Select
    control: (baseStyles, state) => {
      let borderColor = 'var(--color-gray-300)'; // Default border-gray-300
      let boxShadow = 'none';
      let backgroundColor = 'transparent';
      let textColor = 'var(--color-gray-800)';
      let placeholderColor = 'var(--color-gray-400)';

      // Dark mode defaults
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        borderColor = 'var(--color-gray-700)'; // dark:border-gray-700
        backgroundColor = 'var(--color-gray-900)'; // dark:bg-gray-900
        textColor = 'var(--color-white-90)'; // dark:text-white/90
        placeholderColor = 'var(--color-white-30)'; // dark:placeholder:text-white/30
      }

      // Focus state
      if (state.isFocused) {
        borderColor = 'var(--color-brand-300)'; // focus:border-brand-300
        boxShadow = '0 0 0 3px rgba(var(--color-brand-500-rgb), 0.2)'; // focus:ring-3 focus:ring-brand-500/20
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          borderColor = 'var(--color-brand-800)'; // dark:focus:border-brand-800
        }
      }

      // Disabled state
      if (state.isDisabled) {
        backgroundColor = 'var(--color-gray-100)'; // bg-gray-100
        borderColor = 'var(--color-gray-300)'; // border-gray-300
        textColor = 'var(--color-gray-500)'; // text-gray-500
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          backgroundColor = 'var(--color-gray-800)'; // dark:bg-gray-800
          borderColor = 'var(--color-gray-700)'; // dark:border-gray-700
          textColor = 'var(--color-gray-400)'; // dark:text-gray-400
        }
      }

      return {
        ...baseStyles,
        minHeight: '44px', // h-11
        height: '44px',    // h-11
        borderRadius: '0.5rem', // rounded-lg
        borderWidth: '1px',
        borderColor: borderColor,
        boxShadow: boxShadow,
        backgroundColor: backgroundColor,
        transition: 'all 0.1s ease-in-out', // Untuk transisi focus
        cursor: state.isDisabled ? 'not-allowed' : 'default',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',

        '&:hover': {
          borderColor: state.isFocused ? borderColor : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'var(--color-gray-700)' : 'var(--color-gray-300)'), // Hover border
        },
      };
    },
    // Styling untuk teks placeholder
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: 'var(--color-gray-400)', // placeholder:text-gray-400
      '@media (prefers-color-scheme: dark)': {
        color: 'var(--color-white-30)', // dark:placeholder:text-white/30
      },
    }),
    // Styling untuk teks yang sudah dipilih
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: 'var(--color-gray-800)', // text-gray-800
      '@media (prefers-color-scheme: dark)': {
        color: 'var(--color-white-90)', // dark:text-white/90
      },
    }),
    // Styling untuk input yang diketik (saat isSearchable)
    input: (baseStyles) => ({
      ...baseStyles,
      margin: '0px', // Hapus margin default
      padding: '0px', // Hapus padding default
      color: 'var(--color-gray-800)',
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
      color: 'var(--color-gray-500)', // Default icon color
      '&:hover': {
        color: 'var(--color-gray-600)', // Hover icon color
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
        color: 'var(--color-gray-500)', // Default icon color
        '&:hover': {
          color: 'var(--color-gray-600)', // Hover icon color
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
      zIndex: 9999, // Pastikan menu muncul di atas elemen lain
      borderRadius: '0.5rem', // rounded-lg
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // shadow-lg
      marginTop: '0.25rem', // sedikit jarak dari control
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: 'var(--color-gray-800)', // dark:bg-gray-800
      },
    }),
    // Styling untuk setiap opsi di dropdown
    option: (baseStyles, { isFocused, isSelected }) => ({
      ...baseStyles,
      backgroundColor: isSelected ? 'var(--color-brand-500)' : isFocused ? 'var(--color-blue-50)' : 'transparent',
      color: isSelected ? 'var(--color-white)' : 'var(--color-gray-700)',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      '&:active': { // Saat diklik
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
    <Select
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      name={name}
      className={className}
      styles={customStyles}
      isDisabled={isDisabled}
      isSearchable={isSearchable}
      isClearable={isClearable}
      {...props}
    />
  );
};

export default SelectField;