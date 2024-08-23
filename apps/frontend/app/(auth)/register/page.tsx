import { AuthForm } from '../../../components/auth-form';
import AuthLayout from '../../../components/auth-layout';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Register in to Your Account"
      linkHref="/"
      linkText="Login"
    >
      <AuthForm formType="register" />
    </AuthLayout>
  );
}
