import { AuthForm } from '../components/auth-form';
import AuthLayout from '../components/auth-layout';
// import { UserLoginForm } from '../components/user-login-form';

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
