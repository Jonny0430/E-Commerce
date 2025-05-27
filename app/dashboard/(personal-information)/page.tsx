import { Separator } from '@/components/ui/separator'
import { Banknote, Heart, Shuffle } from 'lucide-react'
import EditInformation from '../_components/edit-information'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { getStatistics } from '@/actions/user.action'

const Page = async () => {
	const session = await getServerSession(authOptions)
	const res = await getStatistics()

	const statistics = res?.data?.statistics

	return (
		<>
			<h1 className='text-xl font-semibold'>지갑/프로필 정보</h1>
			<Separator className='my-3' />
			<EditInformation user={JSON.parse(JSON.stringify(session?.currentUser))} />
			<div className='grid grid-cols-3 gap-4'>
				<div className='border-2 p-2 flex justify-center flex-col space-y-2 items-center shadow-md hover:animate-pulse transition-all cursor-pointer'>
					<Shuffle size={50} />
					<div className='text-center'>
						<h1 className='text-4xl font-bold'>{statistics?.totalOrders}</h1>
						<p>거래 내역</p>
					</div>
				</div>

				<div className='border-2 p-2 flex justify-center flex-col space-y-2 items-center shadow-md hover:animate-pulse transition-all cursor-pointer'>
					<Banknote size={50} />
					<div className='text-center'>
						<h1 className='text-4xl font-bold'>{statistics?.totalTransactions}</h1>
						<p>펀딩 내역</p>
					</div>
				</div>

				<div className='border-2 p-2 flex justify-center flex-col space-y-2 items-center shadow-md hover:animate-pulse transition-all cursor-pointer'>
					<Heart size={50} />
					<div className='text-center'>
						<h1 className='text-4xl font-bold'>{statistics?.totalFavourites}</h1>
						<p>관심 자산</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Page
