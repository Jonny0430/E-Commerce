import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader } from 'lucide-react'

const Loading = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>거래 내역</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead></TableHead>
						<TableHead>자산명</TableHead>
						<TableHead>펀딩 금액</TableHead>
						<TableHead>거래 상태</TableHead>
						<TableHead>거래 날짜</TableHead>
						<TableHead className='text-right'>작업</TableHead>
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
