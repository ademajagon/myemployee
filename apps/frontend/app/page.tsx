import { AuthForm } from '../components/auth-form';
import AuthLayout from '../components/auth-layout';

export default function Home() {
  return (
    <AuthLayout
      title="Log in to Your Account"
      linkHref="/register"
      linkText="Register"
    >
      <AuthForm formType="login" />
    </AuthLayout>
  );
}
