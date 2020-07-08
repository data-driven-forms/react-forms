import React from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { Transfer } from 'antd';
import AntForm from '../common/form-wrapper';

const DualListSelect = (props) => {
  const {
    input: { onChange, value = [], ...input },
    meta,
    validateOnMount,
    helperText,
    description,
    FormItemProps,
    isRequired,
    options = [],
    label,
    ...rest
  } = useFieldApi(props);
  const dataSource = options.map((option) => ({
    key: option.value,
    ...option
  }));
  return (
    <AntForm
      label={label}
      meta={meta}
      validateOnMount={validateOnMount}
      helperText={helperText}
      description={description}
      FormItemProps={FormItemProps}
      isRequired={isRequired}
    >
      <Transfer
        {...input}
        targetKeys={value}
        onChange={(targetKeys) => onChange(targetKeys.filter((key) => options.find(({ value }) => value === key)))} // for some reason, there was always an empty string in the targetKeys argument
        render={({ label }) => label}
        dataSource={dataSource}
        {...rest}
      />
    </AntForm>
  );
};

export default DualListSelect;
