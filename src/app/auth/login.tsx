import Logo from "@/assets/logo/health-prime.png";
import { Input } from "@/components/ui/input";
import LoginBanner from "@/assets/placeholder/login-bg.webp";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Loader, Mail } from "lucide-react";
import { LocalStorageUserStore } from "@/lib/const-value";
import { api_login } from "@/network/apis/auth_api";
import { setToken } from "@/network/axios.services";

// phone validation (Brazil)
// const phoneValidation = new RegExp(
//   /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
// );

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
// const passwordValidation = new RegExp(
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
// );

// password: z
// .string()
// .min(1, { message: 'Must have at least 1 character' })
// .regex(passwordValidation, {
//   message: 'Your password is not valid',
// }),
// phone: z
// .string()
// .min(1, { message: 'Must have at least 1 character' })
// .regex(phoneValidation, { message: 'invalid phone' }),

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be between 6 and 14 characters long." })
    .max(14, { message: "Password must be between 6 and 14 characters long." }),
});

function Login() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background to-muted/50">
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-[35%_65%] lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-4">
              <img src={Logo} className="w-32" alt="Health Prime Logo" />
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Welcome to Health Prime
                </h1>
                <p className="text-sm text-muted-foreground">
                  Sign in to access your healthcare management dashboard
                </p>
              </div>
            </div>
            <LoginForm />
          </div>
        </div>
        <div className="relative hidden h-full flex-col p-10 text-white lg:flex">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${LoginBanner})` }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "Health Prime has transformed how we manage healthcare services.
                The platform is intuitive and powerful."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const d = await api_login(data);
    if (d.s) {
      localStorage.setItem(LocalStorageUserStore, JSON.stringify(d.r));
      setToken();
      navigate("/user", { replace: true });
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-11" disabled={isLoading}>
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            "Sign in to your account"
          )}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Need help? Contact support at{" "}
          <a
            href="mailto:jordan@healthprime.com"
            className="text-primary hover:underline"
          >
            jordan@healthprime.com
          </a>
        </p>
      </form>
    </Form>
  );
}
