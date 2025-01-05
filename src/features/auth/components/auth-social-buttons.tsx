'use client';

import { Button } from '@/components/ui/button';
import { handleGithubSignIn, handleGoogleSignIn } from '@/actions/auth-actions';

export const AuthSocialButtons = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Button variant='outline' className='w-full' onClick={async () => await handleGoogleSignIn()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={200}
          height={200}
          fill='currentColor'
          stroke='currentColor'
          strokeWidth={0}
          viewBox='0 0 48 48'
        >
          <path
            fill='#FFC107'
            stroke='none'
            d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z'
          />
          <path
            fill='#FF3D00'
            stroke='none'
            d='m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z'
          />
          <path
            fill='#4CAF50'
            stroke='none'
            d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z'
          />
          <path
            fill='#1976D2'
            stroke='none'
            d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z'
          />
        </svg>
        Continue with Google
      </Button>
      <Button variant='outline' className='w-full' onClick={async () => await handleGithubSignIn()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={200}
          height={200}
          fill='currentColor'
          stroke='currentColor'
          strokeWidth={0}
          viewBox='0 0 24 24'
        >
          <path
            fillRule='evenodd'
            stroke='none'
            d='M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437.55.102.75-.238.75-.53 0-.26-.009-.952-.014-1.87-3.06.664-3.706-1.475-3.706-1.475-.5-1.27-1.221-1.61-1.221-1.61-.999-.681.075-.668.075-.668 1.105.078 1.685 1.134 1.685 1.134.981 1.68 2.575 1.195 3.202.914.1-.71.384-1.195.698-1.47-2.442-.278-5.01-1.222-5.01-5.437 0-1.2.428-2.183 1.132-2.952-.114-.278-.491-1.397.108-2.91 0 0 .923-.297 3.025 1.127A10.536 10.536 0 0 1 12 6.32c.935.004 1.876.125 2.754.37 2.1-1.424 3.022-1.128 3.022-1.128.6 1.514.223 2.633.11 2.911.705.769 1.13 1.751 1.13 2.952 0 4.226-2.572 5.156-5.022 5.428.395.34.747 1.01.747 2.037 0 1.47-.014 2.657-.014 3.017 0 .295.199.637.756.53C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11'
          />
        </svg>
        Continue with Github
      </Button>
    </div>
  );
};
