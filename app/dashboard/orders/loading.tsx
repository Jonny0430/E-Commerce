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

			<Table className='text-sm'>
				<TableHeader>
					<TableRow>
						<TableHead>자산명</TableHead>
						<TableHead>거래 상태</TableHead>
						<TableHead>거래 금액</TableHead>
						<TableHead>거래 시간</TableHead>
						<TableHead className='text-right'>업데이트 시간</TableHead>
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
