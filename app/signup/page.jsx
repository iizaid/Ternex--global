import AuthForm from "@/components/auth/AuthForm";
import { redirectIfAuthenticated } from "@/lib/auth";

export const metadata = {
  title: "Sign Up | TERNEX",
  description: "Create your TERNEX customer account.",
};

export default async function SignupPage() {
  await redirectIfAuthenticated();

  return <AuthForm mode="signup" />;
}
