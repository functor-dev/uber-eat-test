import * as React from 'react';

import { EmailTemplate } from './types/emailTemplate.ts';

interface AppContextProps {
  emailTemplates: EmailTemplate[];
  updateTemplate: (slug: string, changes: Partial<EmailTemplate>) => void;
  addTemplate: (template: Omit<EmailTemplate, 'slug'>) => void;
}

const AppContext = React.createContext<AppContextProps>({
  emailTemplates: [],
  updateTemplate: () => {},
  addTemplate: () => {},
});

export const useAppContext = () => React.useContext(AppContext);

export default AppContext;
