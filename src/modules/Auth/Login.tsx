import { Button, Input, message, notification } from 'antd';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import FormControl from '../../components/Form/controls/FormControl.tsx';

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const formMethods = useForm<FormValues>({
    defaultValues: {
      email: 'test@example.com',
      password: '123456',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const validateCredential = (data: FormValues) =>
      data.email && data.password;

    if (validateCredential(data)) {
      message.success('Login successfully');
      navigate('/');
    } else {
      notification.error({
        message: 'Bad credential',
      });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col min-h-screen items-center justify-center"
      >
        <h1 className="text-2xl mb-6">Welcome, please login to continue.</h1>

        <div className="shadow rounded-lg bg-white border border-gray-200 p-4 w-96">
          <FormControl name="email" label="Email" layout="vertical">
            <Input placeholder="Email" />
          </FormControl>

          <FormControl name="password" label="Password" layout="vertical">
            <Input.Password placeholder="Password" />
          </FormControl>

          <Button block type="primary" htmlType="submit">
            Login
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Login;
