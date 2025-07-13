import { message } from 'antd';
import * as React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useAppContext } from '../../../AppContext.tsx';
import SaveEmailTemplate, { FormValues } from '../SaveEmailTemplate';

const NewEmailTemplate: React.FC = () => {
  const { addTemplate } = useAppContext();
  const navigate = useNavigate();

  const handleSave = useCallback(
    (data: FormValues) => {
      addTemplate(data);
      message.success({
        content: 'Email template created!',
      });
      navigate('/email-templates');
    },
    [addTemplate, navigate],
  );

  return (
    <div>
      <SaveEmailTemplate onSave={handleSave} />
    </div>
  );
};

export default NewEmailTemplate;
