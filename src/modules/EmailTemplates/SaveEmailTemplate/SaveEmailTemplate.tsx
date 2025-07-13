import { MailOutlined } from '@ant-design/icons';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  message,
  notification,
} from 'antd';
import * as Joi from 'joi';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

import LexicalEditor from '../../../components/Form/atomics/Editor';
import FormControl from '../../../components/Form/controls/FormControl';
import { EmailTemplate } from '../../../types/emailTemplate.ts';
import { cardGridStyles, FormValues, TemplatePreview } from './atomics';

const validateSchema = Joi.object({
  name: Joi.string().required().label('Name'),
  subject: Joi.string().required().label('Subject'),
  body: Joi.string()
    .required()
    .custom((value, helpers) => {
      const isEmpty = (value: string) => {
        try {
          const root = JSON.parse(value).root;

          return (
            root.children[0].children.length === 0 && root.children.length === 1
          );
        } catch (_error: unknown) {
          return true;
        }
      };

      if (!value || isEmpty(value)) {
        return helpers.error('string.empty');
      }

      return value;
    })
    .label('Body'),
  bodyHtml: Joi.any(),
});

interface SaveEmailTemplateProps {
  emailTemplate?: EmailTemplate;
  onSave: (template: FormValues) => void;
}

const SaveEmailTemplate: React.FC<SaveEmailTemplateProps> = ({
  onSave,
  emailTemplate,
}) => {
  const navigate = useNavigate();

  const formMethods = useForm<FormValues>({
    defaultValues: {
      name: emailTemplate?.name || '',
      subject: emailTemplate?.subject || '',
      body: emailTemplate?.body || '',
      bodyHtml: '',
    },
    resolver: joiResolver(validateSchema, {
      abortEarly: false,
      errors: {
        wrap: {
          label: false,
        },
      },
    }),
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    return onSave(values);
  };

  const onError = (errors: unknown) => {
    console.debug(errors);

    notification.error({
      message: 'Please check the form',
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit, onError)}>
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          {/*<Breadcrumb*/}
          {/*  items={[*/}
          {/*    {*/}
          {/*      title: <Link to="/email-templates">Email Templates</Link>,*/}
          {/*    },*/}
          {/*    {*/}
          {/*      title: 'Edit Email Template',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*/>*/}

          <div className="ml-auto flex items-center gap-4">
            <Button
              onClick={() => {
                navigate('/email-templates');
              }}
            >
              Cancel
            </Button>

            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </div>

        <div className="grid max-lg:grid-cols-1 grid-cols-2 gap-4 p-4">
          <Card size="small" title="Email Template" extra={<MailOutlined />}>
            <Card.Grid style={cardGridStyles} hoverable={false}>
              <FormControl<FormValues, 'name'>
                name="name"
                label="Name"
                layout="vertical"
              >
                <Input placeholder="Name" />
              </FormControl>
            </Card.Grid>

            <Card.Grid style={cardGridStyles} hoverable={false}>
              <FormControl<FormValues, 'subject'>
                name="subject"
                label="Subject"
                layout="vertical"
              >
                <Input placeholder="Subject" />
              </FormControl>

              <Form.Item layout="vertical" label="Body">
                <LexicalEditor
                  name="body"
                  listVariablesQuery={{
                    data: [
                      {
                        label: 'Customer Name',
                        value: 'name',
                      },
                      {
                        label: 'Customer Email',
                        value: 'email',
                      },
                    ],
                    status: 'success',
                  }}
                />
              </Form.Item>
            </Card.Grid>
          </Card>

          <TemplatePreview />
        </div>
      </form>
    </FormProvider>
  );
};

export default SaveEmailTemplate;
