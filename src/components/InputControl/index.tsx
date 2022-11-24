import React, { forwardRef } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { Controller } from 'react-hook-form';

import Select from 'react-select';

const InputDatalist = (
  { name, label, type, error = null, children, options, control, ...rest },
  ref
) => {
  const style = {
    control: base => ({
      ...base,
      border: !!error ? '1px solid #dc3545' : '1px solid #dddddd',
      boxShadow: 'none',

      '&:hover': {
        borderColor: !!error ? '1px solid #9a9a9a' : '',
        boxShadow: !!error ? '0 0 0 0.2rem rgb(220 53 69 / 25%)' : '',
      },
    }),
  };

  return (
    <>
      {!!label && (
        <label className="form-control-label" htmlFor={label}>
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              placeholder={'<Selecione>'}
              options={options}
              getOptionLabel={option =>
                option.name || option.institutional_name
              }
              getOptionValue={option => option.id}
              value={(options && options.find(c => c.id === value)) || ''}
              onChange={e => {
                if (e.value === '') {
                  return onChange(null);
                } else {
                  return onChange(e?.id);
                }
              }}
              styles={style}
              ref={ref}
            />
          );
        }}
      />
      <div className="w-100">
        {!!error && (
          <small className="text-warning alert-message mt-1 d-flex align-items-center">
            <FiAlertCircle size={14} className="mr-1" />
            {error.message}
          </small>
        )}
      </div>
    </>
  );
};

export const InputControlDataList = forwardRef(InputDatalist);