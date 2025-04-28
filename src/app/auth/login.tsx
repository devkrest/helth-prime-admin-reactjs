import Logo from "@/assets/logo/health-prime.png";
import { Input } from "@/components/ui/input";
import LoginBanner from "@/assets/placeholder/login-bg.webp";
import { Separator } from "@/components/ui/separator";
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
  FormMessage
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
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-5 md:max-w-8xl mx-auto">
      <LoginCard />
      <SideBannerImage />
    </div>
  );
}

export default Login;

function SideBannerImage() {
  return (
    <div className="bg-muted/60 col-span-3 hidden md:block relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-background/0" />
      <img src={LoginBanner} className="h-screen w-full object-cover" alt="Login banner" />
    </div>
  );
}

// LOGIN UI COMPONENTS
function LoginCard() {
  return (
    <div className="h-screen col-span-2 flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center">
          <img src={Logo} className="w-40 dark:hidden hidden" alt="Health Prime Logo" />
          <img src={Logo} className="w-40 dark:inline-block inline-block" alt="Health Prime Logo" />
          <h1 className="mt-6 text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Sign in to your Health Prime account to access your dashboard and manage your health services.
          </p>
        </div>
        <Separator className="my-6 bg-muted/50" />
        <LoginForm />
      </div>
    </div>
  );
}

function LoginForm() {
  // const [isRemember, setIsRemember] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   email: "jordan@cozmohealth.com",
    //   password: "jordan@cozmo",
    // },
  });

  // defaultValues: {
  //   email: "nya@cozmohealth.com",
  //   password: "nya@cozmo",
  // },

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const d = await api_login(data);
    if (d.s) {
      // if (isRemember) {
      //   localStorage.setItem("user", JSON.stringify(d.r));
      // }
      //console.log(d.r);

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
                <PasswordInput
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <CheckboxWithText
          isRemember={isRemember}
          setIsRemember={setIsRemember}
        /> */}
        <Button
          type="submit"
          className="w-full h-11"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            "Sign in to your account"
          )}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Need help? Contact support at{" "}
          <a href="mailto:jordan@healthprime.com" className="text-primary hover:underline">
            jordan@healthprime.com
          </a>
        </p>
      </form>
    </Form>
  );
}