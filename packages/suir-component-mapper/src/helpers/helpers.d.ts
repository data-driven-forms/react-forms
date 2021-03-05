import React from 'react';
import { Meta } from '@data-driven-forms/react-form-renderer';

type ValidationFunction = (meta: Meta<any>, validateOnMount?: boolean) => React.ReactNode | boolean | undefined;

export declare function validationError(meta: Meta<any>, validateOnMount?: boolean): React.ReactNode | boolean | undefined;
export declare function validationWarning(meta: Meta<any>, validateOnMount?: boolean): React.ReactNode | boolean | undefined;

interface functions {
    validationError: ValidationFunction,
    validationWarning: ValidationFunction
}

export default functions;
