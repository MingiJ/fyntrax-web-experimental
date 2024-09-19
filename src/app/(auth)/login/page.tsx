"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Input from "@components/global/Input";
import ButtonWithLoader from "@components/global/ButtonWithLoader";
import ErrorMsg from "@components/global/ErrorMsg";
import SocialAuth from "@components/signup/SocialAuth";

import validate from "@utils/validate";

import { loginSchema } from "@validations/AuthValidation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    const { isValid, result } = validate(loginSchema, { email, password });
    console.log(result, "result")

    if (!isValid) {
      setErrors((prev: any) => ({ ...prev, ...result }));
      setIsSubmitted(false);
      return;
    }

    const res = await signIn("credentials", {
      ...result,
      redirect: false,
    });
    console.log(res)

    if (!res?.ok) {
      setIsSubmitted(false);
      setErrorMsg(res?.error as string);
      return;
    }

    push("/");
  };

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      {/* ******** HEADER ******** */}
      <div className="space-y-3">
        <h1 className="text-2xl lg:text-3xl font-bold">Login</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Log into your account to continue using Fyntrax.
        </p>
      </div>

      {errorMsg && <ErrorMsg msg={errorMsg} />}

      {/* ******** OPTIONS ******** */}
      <div className="grid grid-cols-1 gap-5">
        <Input
          name="email"
          label="email *"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors?.email)
              setErrors((prev: any) => ({ ...prev, email: null }));
            if (errorMsg) setErrorMsg(null);
          }}
          err={errors?.email}
          info="Enter your email address."
          placeholder="name@example.com"
        />

        <Input
          name="password"
          label="password *"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors?.password)
              setErrors((prev: any) => ({ ...prev, password: null }));
            if (errorMsg) setErrorMsg(null);
          }}
          err={errors?.password}
          info="Enter your password."
          placeholder="******"
        />
      </div>

      {/* ******** CONTROLS ******** */}
      <div className="flex flex-col gap-5 text-center">
        <div className="space-y-3">
          <ButtonWithLoader
            className="btn w-full"
            type="submit"
            isLoading={isSubmitted}
          >
            Login
          </ButtonWithLoader>

          <p className="text-xs text-neutral-700 dark:text-neutral-300">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary-alt">
              Sign up
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <hr className="flex-1 border-neutral-200 dark:border-neutral-800" />
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            OR
          </span>
          <hr className="flex-1 border-neutral-200 dark:border-neutral-800" />
        </div>

        <SocialAuth />
      </div>
    </form>
  );
};

export default Login;
