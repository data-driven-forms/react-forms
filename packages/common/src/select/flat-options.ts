import { ReactNode } from "react";

interface Option {
    label: string | ReactNode;
    value: any;
    selectAll?: boolean;
    selectNone?: boolean;
}

interface ResultedOption {
    label?: string | ReactNode;
    value?: any;
    selectAll?: boolean;
    selectNone?: boolean;
    group?: string | ReactNode;
    divider?: boolean;
}

interface Options {
    label?: string | ReactNode;
    value?: any;
    divider?: boolean;
    selectAll?: boolean;
    selectNone?: boolean;
    options?: Option[];
}

const flatOptions = (options: Options[]): ResultedOption[] =>
    options.flatMap((option) => (option.options ? [{ group: option.label }, ...option.options.map(opt => opt as ResultedOption)] : [option as ResultedOption]));

export default flatOptions;
export type { Option, ResultedOption, Options };
