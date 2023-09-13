import { ReactNode } from 'react';

export interface PlainTextProps {
  label: ReactNode;
}

declare const PlainText: React.ComponentType<PlainTextProps>;

export default PlainText;
