import {
  CaretDownOutlined,
  CloseOutlined,
  EyeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, message } from 'antd';
import * as React from 'react';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormValues } from './config.ts';

const TemplatePreview: React.FC = () => {
  const formMethods = useFormContext<FormValues>();

  const subject = formMethods.watch('subject');

  const bodyHtml = formMethods.watch('bodyHtml');

  const handleSendTestEmail = useCallback(() => {
    message.info({
      content: 'To be developed...',
    });
  }, []);

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      styles={{
        body: {
          flex: '1 0 1px',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      size="small"
      title="Template Preview"
      extra={<EyeOutlined />}
    >
      <div className="bg-gray-100 p-4 pb-10 rounded-lg flex-1 mb-4">
        <div className="mb-6 flex items-center gap-2.5">
          <p className="font-medium text-xl">{subject}</p>

          <div className="text-neutral-500 text-[28px]">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M15 19H3l4.5-7L3 5h12c.65 0 1.26.31 1.63.84L21 12l-4.37 6.16c-.37.52-.98.84-1.63.84zm-8.5-2H15l3.5-5L15 7H6.5l3.5 5-3.5 5z" />
            </svg>
          </div>

          <div className="hover:bg-neutral-300 bg-neutral-200 px-1 py-1 rounded text-gray-600 text-sm flex items-center gap-1 cursor-pointer">
            <span className="leading-none block">Inbox</span>
            <CloseOutlined className="text-[10px]" />
          </div>
        </div>

        <div className="flex items-center justify-between my-8">
          <div className="flex items-center gap-3">
            <Avatar
              style={{
                backgroundColor: 'lightgray',
              }}
              size={52}
              shape="circle"
              icon={<UserOutlined />}
            />

            <div className="block">
              <strong className="text-lg">UberEats</strong>
              <div className="text-neutral-500 flex items-center gap-1">
                <p>to me</p>

                <div className="text-xs leading-none p-0.5 hover:bg-neutral-300 cursor-pointer">
                  <CaretDownOutlined />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-neutral-500">
            <p className="font-medium">9:14 AM (8 hours ago)</p>

            <Button
              shape="circle"
              type="text"
              icon={
                <span className="text-neutral-500">
                  <svg
                    width="1em"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
                    />
                  </svg>
                </span>
              }
            />
            <Button
              shape="circle"
              type="text"
              icon={
                <span className="text-neutral-500">
                  <svg
                    width="1em"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M205 34.8c11.5 5.1 19 16.6 19 29.2l0 64 112 0c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96l-96 0 0 64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              }
            />
          </div>
        </div>

        <div
          className="text-base"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </div>

      <div className="block mb-1.5">
        <Button
          color="primary"
          variant="filled"
          type="primary"
          onClick={handleSendTestEmail}
        >
          Send Test Email To Me
        </Button>
      </div>

      <p className="text-neutral-500">
        Tests will deliver to your email: logged.in.email@gmail.com
      </p>
    </Card>
  );
};

export default TemplatePreview;
