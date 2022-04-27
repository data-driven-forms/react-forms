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

declare const flatOptions: (options: Options[]) => ResultedOption[];

export default flatOptions;
