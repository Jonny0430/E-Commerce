'use client'

import { login } from '@/actions/auth.action'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/hooks/use-toast'
import { loginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SignInPage = () => {
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	})

	function onError(message: string) {
		setIsLoading(false)
		toast({ description: message, variant: 'destructive' })
	}

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		setIsLoading(true)
		const res = await login(values)
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.user) {
			toast({ description: '지갑이 성공적으로 연결되었습니다' })
			signIn('credentials', { userId: res.data.user._id, callbackUrl: '/' })
		}
	}

	return (
		<Card className='w-1/2 p-4'>
			<h1 className='text-xl font-bold'>회원가입</h1>
			<p className='text-sm text-muted-foreground'>KBILL 플랫폼에 다시 오신 것을 환영합니다! 계속하려면 지갑을 연결하고 모든 필수 항목을 입력해 주세요.</p>
			<Separator className='my-3' />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>이메일</Label>
								<FormControl>
									<Input placeholder='example@gmial.com' disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>비밀번호</Label>
								<FormControl>
									<Input placeholder='****' type='password' disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={isLoading}>
						확인 {isLoading && <Loader className='animate-spin' />}
					</Button>
				</form>
			</Form>

			<div className='mt-4'>
				<div className='text-sm text-muted-foreground'>
				   지갑을 연결하지 않으셨나요?{' '}
					<Button asChild variant={'link'} className='p-0'>
						<Link href='/sign-up'>회원 가입</Link>
					</Button>
				</div>
			</div>
		</Card>
	)
}

export default SignInPage
