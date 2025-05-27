import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader } from 'lucide-react'

const Loading = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Customers</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>№</TableHead>
						<TableHead>Email (지갑 주소)</TableHead>
						<TableHead>Full Name (참여자 이름)</TableHead>
						<TableHead>Transactions (거래 수)</TableHead>
						<TableHead>Status (활동 상태)</TableHead>
						<TableHead className='text-right'>Payments (총 펀딩 금액)</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell colSpan={6} className='text-center'>
							<div className='flex justify-center'>
								<Loader size={16} className='animate-spin' />
							</div>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	)
}

export default Loading
