import { getCustomers } from '@/actions/admin.action'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/lib/utils'
import { SearchParams } from '@/types'
import { FC } from 'react'

interface Props {
	searchParams: SearchParams
}
const Page: FC<Props> = async props => {
	const searchParams = props.searchParams
	const res = await getCustomers({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		page: `${searchParams.page || '1'}`,
	})

	const customers = res?.data?.customers
	const isNext = res?.data?.isNext || false

	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>토큰 보유자</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table>
				{customers && customers.length > 0 && <TableCaption>최근 참여자 목록.</TableCaption>}
				<TableHeader>
				<TableRow>
						<TableHead>№</TableHead>
						<TableHead>이메일</TableHead>
						<TableHead>참여자.이름</TableHead>
						<TableHead>거래.수</TableHead>
						<TableHead>활동.상태</TableHead>
						<TableHead className='text-right'>총.펀딩.금액</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{customers && customers.length === 0 && (
						<TableRow>
							<TableCell colSpan={6} className='text-center'>
							   참여자가 없습니다
							</TableCell>
						</TableRow>
					)}
					{customers &&
						customers.map((customer, index) => (
							<TableRow key={customer._id}>
								<TableCell>№{index + 1}</TableCell>
								<TableCell>{customer.email}</TableCell>
								<TableCell>{customer.fullName}</TableCell>
								<TableCell>
									<Badge>{customer.orderCount}</Badge>
								</TableCell>
								<TableCell>
									<Badge variant={customer.isDeleted ? 'destructive' : 'secondary'}>
										{customer.isDeleted ? 'Deleted' : 'Active'}
									</Badge>
								</TableCell>
								<TableCell className='text-right'>
									<Badge variant={'outline'}>{formatPrice(customer.totalPrice)}</Badge>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>

			<Pagination isNext={isNext} pageNumber={searchParams?.page ? +searchParams.page : 1} />
		</>
	)
}

export default Page
