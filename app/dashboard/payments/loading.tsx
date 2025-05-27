import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader } from 'lucide-react'

const Loading = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>펀딩 내역</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table className='text-sm'>
				<TableHeader>
					<TableRow>
						<TableHead></TableHead>
						<TableHead>토큰명</TableHead>
						<TableHead>블록체인 네트워크</TableHead>
						<TableHead>거래 상태</TableHead>
						<TableHead className='text-right'>펀딩 금액</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell colSpan={5} className='text-center'>
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
