import Button from '../Utils/Button';
import { useForm } from 'react-hook-form';
import { loginParams } from '../../apis/services/authService';
import toast from 'react-hot-toast';
import { useLogin } from '../../apis/hooks/authHooks';
import { useEffect, useRef, useState } from 'react';
import { auth } from '../../firebase';
import { RecaptchaVerifier } from 'firebase/auth';
import 'twin.macro';
import nookies from 'nookies';
import Router from 'next/router';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      recaptchaToken: '',
    },
    mode: 'onChange',
  });
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<any>();
  const recaptchaValidatorWrapperRef = useRef<HTMLDivElement>(null);

  const { mutate: login, isLoading: isLoggingIn } = useLogin();
  const recaptchaToken = watch('recaptchaToken');

  useEffect(
    () =>
      setRecaptchaVerifier(
        new RecaptchaVerifier(
          'recaptcha-validator',
          { size: 'invisible' },
          auth
        )
      ),
    []
  );
  useEffect(() => {
    if (!recaptchaToken)
      toast.loading('Please wait while we prepare captcha...', {
        duration: 3000,
      });
  }, [recaptchaToken]);
  useEffect(() => {
    // console.log(recaptchaVerifier?.verify);
    if (!recaptchaVerifier) return;
    recaptchaVerifier.verify().then((token: string) => {
      // console.log(token);
      setValue('recaptchaToken', token);
    });
  }, [recaptchaVerifier]);

  const onSubmit = async (data: loginParams) => {
    login(data, {
      onSuccess: (res: any) => {
        const resData = res?.data;
        if (res.status >= 200 && res.status < 300) {
          toast.success(resData.message);
          nookies.set(null, 'token', resData.data.access_token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });
          reset();
          Router.push('/');
        } else {
          toast.error(resData.message);
          reset();
        }
      },
      onError: (err: any) => {
        // console.log(err);
        recaptchaVerifier.clear();
        if (recaptchaValidatorWrapperRef.current) {
          recaptchaValidatorWrapperRef.current.innerHTML =
            '<div id="recaptcha-validator"></div>';
          setRecaptchaVerifier(
            new RecaptchaVerifier(
              'recaptcha-validator',
              { size: 'invisible' },
              auth
            )
          );
        }
        if (!err.response.data.message) {
          toast.error('Terjadi kesalahan');
          reset();
        } else {
          toast.error(err.response.data.message);
          reset();
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div tw={'flex flex-col mb-4'}>
        <label tw={'text-sm mb-2'} htmlFor="email">
          Email
        </label>
        <input
          tw={'border-solid border-[1px] rounded-lg border-black h-10 p-2'}
          {...register('email', {
            required: 'Email tidak boleh kosong',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Email tidak valid',
            },
          })}
          type="email"
          id="email"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p tw={'text-xs text-red-700'}>{errors.email.message}</p>
        )}
      </div>
      <div tw={'flex flex-col mb-6'}>
        <label tw={'text-sm mb-2'} htmlFor="password">
          Password
        </label>
        <input
          tw={'border-solid border-[1px] rounded-lg border-black h-10 p-2'}
          {...register('password', {
            required: 'Password tidak boleh kosong',
          })}
          type="password"
          id="password"
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <p tw={'text-xs text-red-700'}>{errors.password.message}</p>
        )}
      </div>
      <div ref={recaptchaValidatorWrapperRef}>
        <div id="recaptcha-validator" />
      </div>
      {isLoggingIn ? (
        <div tw="text-center">. . .</div>
      ) : (
        <Button buttonType="primary" type="submit">
          Login
        </Button>
      )}
    </form>
  );
};

export default LoginForm;
