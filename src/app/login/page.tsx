"use client"

import React, { useState } from 'react';
import AuthLayout from "../../components/auth/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";
import EmailInput from "../../components/auth/EmailInput";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthErrorMessage from '../../components/auth/AuthErrorMessage';
import RememberAndForgot from '../../components/auth/RememberAndForgot';
import SubmitButton from '../../components/auth/SubmitButton';
import GoogleButton from '../../components/auth/GoogleButton';
import SwitchAuthLink from '../../components/auth/SwitchAuthLink';
import AuthFooter from '../../components/auth/AuthFooter';
import AuthDivider from '../../components/auth/AuthDivider';
import { signIn } from "next-auth/react";
import { PATHS } from '@/constants/paths';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!email || !password) {
            setError("メールアドレスとパスワードを入力してください");
            return;
        }

        setIsLoading(true);
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("メールアドレスまたはパスワードが間違っています");
        } else {
            window.location.href = PATHS.HOME;
        }

        setIsLoading(false);
    };

  const handleGoogleLogin = async () => {
    await signIn("google", { callback: PATHS.LOGIN });
  };

  return (
    <AuthLayout>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-orange-100 p-8">
          <AuthHeader />
          <AuthErrorMessage error={error} />
          {/* ログインフォーム */}
          <div className="space-y-6">
            <EmailInput value={email} onChange={setEmail} />
            <PasswordInput value={password} onChange={setPassword} />
            <RememberAndForgot />
            <SubmitButton handleSubmit={handleSubmit} isLoading={isLoading} />
          </div>
          <AuthDivider />
          <GoogleButton handleGoogleLogin={handleGoogleLogin} isLoading={isLoading} />
          <SwitchAuthLink />
        </div>
        <AuthFooter />
    </AuthLayout>
  );
}
