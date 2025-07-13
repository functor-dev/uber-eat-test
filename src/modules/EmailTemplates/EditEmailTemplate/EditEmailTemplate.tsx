import { message, Result } from 'antd';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useAppContext } from '../../../AppContext.tsx';
import SaveEmailTemplate, { FormValues } from '../SaveEmailTemplate';

const EditEmailTemplate: React.FC = () => {
  const { slug } = useParams<{
    slug: string;
  }>();
  const navigate = useNavigate();
  const { emailTemplates, updateTemplate } = useAppContext();

  const emailTemplate = useMemo(() => {
    return emailTemplates.find((template) => template.slug === slug);
  }, [emailTemplates, slug]);

  const handleSave = useCallback(
    (data: FormValues) => {
      updateTemplate(slug as string, data);
      message.success({
        content: 'Email template updated!',
      });
      navigate('/email-templates');
    },
    [navigate, slug, updateTemplate],
  );

  if (!emailTemplate) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the email template does not exist."
      />
    );
  }

  return (
    <div>
      <SaveEmailTemplate onSave={handleSave} emailTemplate={emailTemplate} />
    </div>
  );
};

export default EditEmailTemplate;
