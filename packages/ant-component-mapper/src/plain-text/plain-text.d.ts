import { TypographyProps } from 'antd/es/typography/Typography';
import { ParagraphProps } from 'antd/es/typography/Paragraph';

export interface PlainTextProps extends ParagraphProps {
  label: string;
  name: string;
  TypographyProps?: TypographyProps;
}

declare const PlainText: React.ComponentType<PlainTextProps>;

export default PlainText;
