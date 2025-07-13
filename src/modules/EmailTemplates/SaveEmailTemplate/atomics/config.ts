import * as React from 'react';

export interface FormValues {
  name: string;
  subject: string;
  body: string;
  bodyHtml: string;
}

export const cardGridStyles: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
};
