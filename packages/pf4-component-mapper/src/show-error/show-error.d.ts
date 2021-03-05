import { Meta } from "@data-driven-forms/react-form-renderer";

declare function showError(meta: Meta<any>, validateOnMount?: boolean): { validated: 'error' | 'warning' | 'default' }

export default showError;
