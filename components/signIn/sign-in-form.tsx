"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { emailSignIn } from "@/server/action/auth/email-signin";
import { LoginSchema } from "@/schema/auth/Login_schema";
import { toast } from "sonner";


const LoginForm: React.FC = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const { execute, status } = useAction(emailSignIn, {
    onSuccess(data) {

      if (data.data?.success) {
        window.location.href = '/'
      }
      if (data.data?.error) {
        toast(data.data?.error)
      }
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log('d')
    execute(values);
  };

  return (
    <div className="w-full md:text-[30px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            {/* {showTwoFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    We&apos;ve sent you a two factor code to your email.
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      disabled={status === "executing"}
                      {...field}
                      maxLength={6}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )} */}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="developedbyed@gmail.com"
                          type="email"
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormDescription />
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
                        <Input
                          {...field}
                          placeholder="*********"
                          type="password"
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <Button size={"sm"} className="px-0" variant={"link"} asChild>
              <Link href="/auth/reset">Forgot your password</Link>
            </Button>
          </div>
          <Button
            type="submit"
            className={cn(
              "w-full my-4",
              status === "executing" ? "animate-pulse" : ""
            )}
          >
            {showTwoFactor ? "Verify" : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
