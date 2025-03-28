import Link from 'next/link'
import { CardCompact } from '@/components/card-compact'
import { SignInForm } from '@/features/auth/components/sign-in-fotm'
import { passwordForgotPath, signUpPath } from '@/paths'

export default function SignInPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Sign In"
        description="Sign In to your account"
        className="animate-fade-from-top w-full max-w-[420px]"
        content={<SignInForm />}
        footer={
          <>
            <Link href={signUpPath()} className="text-muted-foreground text-sm">
              No account yet?
            </Link>

            <Link
              href={passwordForgotPath()}
              className="text-muted-foreground text-sm"
            >
              Forgot Password?
            </Link>
          </>
        }
      />
    </div>
  )
}
