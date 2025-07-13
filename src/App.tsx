import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import slugify from 'slugify';

import AppContext from './AppContext';
import { mockEmailTemplates } from './data/mockEmailTemplates.ts';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Login from './modules/Auth/Login';
import EditEmailTemplate from './modules/EmailTemplates/EditEmailTemplate';
import ListEmailTemplates from './modules/EmailTemplates/ListEmailTemplates';
import NewEmailTemplate from './modules/EmailTemplates/NewEmailTemplate';
import { EmailTemplate } from './types/emailTemplate.ts';

const App: React.FC = () => {
  const [emailTemplates, setEmailTemplates] =
    React.useState(mockEmailTemplates);

  return (
    <AppContext.Provider
      value={{
        emailTemplates,
        updateTemplate: (slug: string, changes: Partial<EmailTemplate>) => {
          setEmailTemplates((templates) => {
            return templates.map((template) => {
              if (template.slug === slug) {
                return {
                  ...template,
                  ...changes,
                };
              }

              return template;
            });
          });
        },
        addTemplate: (template: Omit<EmailTemplate, 'slug'>) => {
          setEmailTemplates((templates) => [
            ...templates,
            {
              ...template,
              slug: slugify(template.name),
            },
          ]);
        },
      }}
    >
      <Routes>
        <Route index element={<Navigate to="/email-templates/dining-experience-follow-up" />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="email-templates">
            <Route index element={<ListEmailTemplates />} />
            <Route path="new" element={<NewEmailTemplate />} />
            <Route path=":slug" element={<EditEmailTemplate />} />
          </Route>
        </Route>

        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
