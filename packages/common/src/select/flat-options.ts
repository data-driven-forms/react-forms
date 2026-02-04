import { ReactNode } from "react";
import { FlatSelectOption, OptionValue } from '../types/shared-types';

export interface Option {
    label: string | ReactNode;
    value: any;
    selectAll?: boolean;
    selectNone?: boolean;
}

export interface Options {
    label?: string | ReactNode;
    value?: any;
    divider?: boolean;
    selectAll?: boolean;
    selectNone?: boolean;
    options?: Option[];
}

const flatOptions = <T extends OptionValue = OptionValue>(options: Options[]): FlatSelectOption<T>[] =>
    options.flatMap((option) => (option.options ? [{ group: option.label } as FlatSelectOption<T>, ...option.options.map(opt => opt as FlatSelectOption<T>)] : [option as FlatSelectOption<T>]));

export default flatOptions;
export type ResultedOption = FlatSelectOption;
