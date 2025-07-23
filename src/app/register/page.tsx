"use client"

import React, { useState } from 'react';
import AuthLayout from "../components/auth/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";
import NameInput from '../components/auth/NameInput';
import EmailInput from "../components/auth/EmailInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthErrorMessage from '../components/auth/AuthErrorMessage';
import SubmitButton from '../components/auth/SubmitButton';
import GoogleButton from '../components/auth/GoogleButton';
import SwitchAuthLink from '../components/auth/SwitchAuthLink';
import AuthFooter from '../components/auth/AuthFooter';
import AuthDivider from '../components/auth/AuthDivider';
import TermsCheck from '../components/auth/TermsCheck';
import { useRouter } from "next/navigation";
import { API } from '@/constants/api';
import { PATHS } from '@/constants/paths';

export default function SignupScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return 'すべての項目を入力してください';
    }
    
    if (formData.password !== formData.confirmPassword) {
      return 'パスワードが一致しません';
    }
    
    if (formData.password.length < 6) {
      return 'パスワードは6文字以上で入力してください';
    }
    
    // if (!acceptTerms) {
    //   return '利用規約に同意してください';
    // }
    
    return null;
  };

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const res = await fetch(API.REGISTER, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await res.json();

            if (!res.ok) {
            throw new Error(data.message || '登録に失敗しました');
            }

            // 成功時の処理
            alert('登録が完了しました');

            router.push(PATHS.LOGIN);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Googleアカウントで登録が完了しました！');
    } catch (err) {
      setError('Googleアカウントでの登録に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-orange-100 p-8">
          <AuthHeader />
          <AuthErrorMessage error={error} />
          {/* ログインフォーム */}
          <div className="space-y-5">
            <NameInput value={formData.name} onChange={(v) => handleInputChange('name', v)} />
            <EmailInput value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />
            <PasswordInput value={formData.password} onChange={(v) => setFormData({ ...formData, password: v })} />
            {/* パスワード確認用 */}
            <PasswordInput
                label="パスワード（確認）"
                placeholder="もう一度入力"
                value={formData.confirmPassword}
                onChange={(v) => setFormData({ ...formData, confirmPassword: v })}
            />
            {/* TODO 利用規約の作成 */}
            {/* <TermsCheck acceptTerms={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} /> */}
            <SubmitButton handleSubmit={handleSubmit} isLoading={isLoading} />
          </div>
          <AuthDivider />
          <GoogleButton handleGoogleLogin={handleGoogleSignup} isLoading={isLoading} />
          <SwitchAuthLink />
        </div>
        <AuthFooter />
    </AuthLayout>
  );
}
