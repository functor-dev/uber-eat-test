import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import { Breadcrumb, Button, message, Popconfirm, Table } from 'antd';
import * as React from 'react';
import { Link } from 'react-router';

import { useAppContext } from '../../../AppContext';
import { EmailTemplate } from '../../../types/emailTemplate.ts';

const ListEmailTemplates: React.FC = () => {
  const { emailTemplates } = useAppContext();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: 'List Email Templates',
            },
          ]}
        />

        <Link to="/email-templates/new">
          <Button type="primary" icon={<PlusOutlined />}>New Email Template</Button>
        </Link>
      </div>

      <div className="mt-4">
        <Table<EmailTemplate>
          pagination={false}
          rowKey="slug"
          scroll={{
            x: 900
          }}
          dataSource={emailTemplates}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },

            {
              title: 'Slug',
              dataIndex: 'slug',
              key: 'slug',
            },

            {
              title: 'Subject',
              dataIndex: 'subject',
              key: 'subject',
            },

            {
              title: 'Actions',
              key: 'actions',
              render: (_text, record) => (
                <div className="flex items-center gap-2">
                  {record.slug ? (
                    <>
                      <Link to={`/email-templates/${record.slug}`}>
                        <Button icon={<EditOutlined />}>Edit</Button>
                      </Link>

                      <Popconfirm
                        title="Are you sure you want to delete this?"
                        onConfirm={() => {
                          message.info({
                            content: 'To be developed...',
                          });
                        }}
                      >
                        <Button icon={<DeleteOutlined />} danger>
                          Delete
                        </Button>
                      </Popconfirm>
                    </>
                  ) : (
                    <>
                      <Button disabled icon={<EditOutlined />}>
                        Edit
                      </Button>

                      <Button disabled icon={<DeleteOutlined />} danger>
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ListEmailTemplates;
