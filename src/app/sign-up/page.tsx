import Link from 'next/link'
import { CardCompact } from '@/components/card-compact'
import { SiupUpForm } from '@/features/auth/components/sign-up-form'
import { signInPath } from '@/paths'

function SignUpPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started"
        className="animate-fade-from-top w-full max-w-[420px]"
        content={<SiupUpForm />}
        footer={
          <Link className="text-muted-foreground text-sm" href={signInPath()}>
            Have an account? Sign In now.
          </Link>
        }
      ></CardCompact>
    </div>
  )
}

export default SignUpPage
