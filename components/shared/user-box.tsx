'use client'

import { IUser } from '@/types'
import { FC, useState } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { signOut } from 'next-auth/react'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '../ui/alert-dialog'

interface Props {
	user: IUser
}
const UserBox: FC<Props> = ({ user }) => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className='cursor-pointer'>
						<AvatarImage src={user.avatar} alt={user.fullName} />
						<AvatarFallback className='capitalize bg-primary text-white'>{user.fullName.charAt(0)}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>지갑</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{user.role === 'admin' && (
						<DropdownMenuItem className='cursor-pointer' asChild>
							<Link href={'/admin'}>KBILL 관리</Link>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem className='cursor-pointer' asChild>
						<Link href={'/dashboard'}>KBILL 대시보드</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className='cursor-pointer' onClick={() => setOpen(true)}>
						<LogIn />
						<span>로그아웃</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>지갑 연결을 해제하시겠습니까?</AlertDialogTitle>
						<AlertDialogDescription>
						     이 작업은 되돌릴 수 없습니다. 이 작업은 지갑 연결을 해제하고 세션을 종료합니다.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>취소</AlertDialogCancel>
						<AlertDialogAction onClick={() => signOut({ callbackUrl: '/sign-in' })}>연결 해제 확인</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export default UserBox
