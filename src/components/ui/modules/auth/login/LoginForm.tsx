/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Logo from "@/app/assets/svgs/logo";
import { toast } from "sonner";
import { loginUser, recaptchaTokenVerification } from "@/services/AuthService";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";







export default function LoginForm() {
  const form = useForm();
  const [reCapchaStatus, setReCapchaStatus] = useState(false)

  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirectPath")
  const router = useRouter()



  console.log(reCapchaStatus)
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
    try {
      const response = await loginUser(data);
      console.log(response)
      if (response.success) {
        toast.success("User login successfully!");
        if (redirect) {
          router.push(redirect)
        } else {
          router.push("/profile")
        }
      } else {
        toast.error(response.message || "Login failed.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error("Error in Login:", error);
    }
  };

  const handleRecaptcha = async (value: string | null) => {
    try {
      const res = await recaptchaTokenVerification(value!)
      if (res?.success) {
        setReCapchaStatus(true)
      }
    } catch (err: any) {
      console.error(err)
    }
  }

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
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
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center mt-4">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPCHA_CLIENT_KEY as string}
              onChange={handleRecaptcha}

            />
          </div>
          <Button
            disabled={reCapchaStatus ? false : true}
            type="submit"
            className="mt-5 w-full"
          >
            {isSubmitting ? "logging....." : "login"}
          </Button>
        </form>
      </FormProvider>
      <p className="text-sm text-gray-600 text-center my-3">
        Dont you have an account ?
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
}