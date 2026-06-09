import AuthForm from "@/components/auth/AuthForm";
import { redirectIfAuthenticated } from "@/lib/auth";

export const metadata = {
  title: "Login | TERNEX",
  description: "Log in to your TERNEX account.",
};

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return <AuthForm mode="login" />;
}
