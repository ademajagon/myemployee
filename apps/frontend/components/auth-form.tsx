'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { cn } from './utils';
import { Icons } from './ui/icons';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';
import { useAuth } from '../hooks/useAuth';
import { login, register } from '../services/authService';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../stores/userStore';
import { decodeToken } from '../utils/jwt';

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formType: 'login' | 'register';
}

interface DecodedToken {
  username: string;
  role: string;
}

export function AuthForm({ formType, className, ...props }: AuthFormProps) {
  const isLogin = formType === 'login';
  const { toast } = useToast();
  const router = useRouter();
  const { setToken, setUser } = useUserStore();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  async function onSubmit(
    values: typeof initialValues,
    { setSubmitting }: any
  ) {
    try {
      const response = isLogin
        ? await login(values.username, values.password)
        : await register(values.username, values.password);
      const { access_token } = response;

      setToken(access_token);

      const decodedToken = decodeToken<DecodedToken>(access_token);
      setUser({ username: decodedToken.username, role: decodedToken.role });

      localStorage.setItem('access_token', access_token);

      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-2">
            <div className="grid gap-2">
              <Field name="username">
                {({ field }: any) => (
                  <Input
                    {...field}
                    placeholder="Username"
                    disabled={isSubmitting}
                  />
                )}
              </Field>
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />

              <Field name="password">
                {({ field }: any) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    disabled={isSubmitting}
                  />
                )}
              </Field>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLogin ? 'Log In' : 'Register'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
