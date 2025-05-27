import { getTransactions } from '@/actions/admin.action'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TransactionState } from '@/lib/constants'
import { cn, formatPrice, getStatusText, getStatusVariant } from '@/lib/utils'
import { SearchParams } from '@/types'
import { FC } from 'react'

interface Props {
	searchParams: SearchParams
}
const Page: FC<Props> = async props => {
	const searchParams = props.searchParams
	const res = await getTransactions({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		page: `${searchParams.page || '1'}`,
	})

	const transactions = res?.data?.transactions
	const isNext = res?.data?.isNext || false

	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>펀딩 내역</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table>
				{transactions && transactions.length > 0 && <TableCaption>최근 펀딩 목록.</TableCaption>}
				<TableHeader>
				<TableRow>
						<TableHead>자산명</TableHead>
						<TableHead>지갑 주소</TableHead>
						<TableHead>거래 상태</TableHead>
						<TableHead>블록체인 네트워크</TableHead>
						<TableHead className='text-right'>펀딩 금액</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{transactions && transactions.length === 0 && (
						<TableRow>
							<TableCell colSpan={5} className='text-center'>
							펀딩 내역 없음.
							</TableCell>
						</TableRow>
					)}
					{transactions &&
						transactions.map(transaction => (
							<TableRow key={transaction._id}>
								<TableCell>{transaction.product.title}</TableCell>
								<TableCell>{transaction.user.email}</TableCell>
								<TableCell>
									<Badge variant={getStatusVariant(transaction.state)}>{getStatusText(transaction.state)}</Badge>
								</TableCell>
								<TableCell>{transaction.provider}</TableCell>
								<TableCell className='text-right'>
									<Badge
										variant={'secondary'}
										className={cn(transaction.state === TransactionState.PaidCanceled && 'text-red-500 font-bold')}
									>
										{formatPrice(transaction.amount)}
									</Badge>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
				{transactions && transactions.length > 0 && (
					<TableFooter>
						<TableRow>
							<TableCell colSpan={4} className='font-bold'>
								Total
							</TableCell>
							<TableCell className='text-right'>
								<Badge>
									{formatPrice(
										transactions.filter(c => c.state === TransactionState.Paid).reduce((acc, curr) => acc + curr.amount, 0)
									)}
								</Badge>
							</TableCell>
						</TableRow>
					</TableFooter>
				)}
			</Table>

			<Pagination isNext={isNext} pageNumber={searchParams?.page ? +searchParams.page : 1} />
		</>
	)
}

export default Page
