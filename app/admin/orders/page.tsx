import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import OrderActions from '../_components/order-actions'
import { SearchParams } from '@/types'
import { FC } from 'react'
import { getOrders } from '@/actions/admin.action'
import Pagination from '@/components/shared/pagination'
import { Badge } from '@/components/ui/badge'
import { formatPrice, sliceText } from '@/lib/utils'
import { format } from 'date-fns'

interface Props {
	searchParams: SearchParams
}
const Page: FC<Props> = async props => {
	const searchParams = props.searchParams
	const res = await getOrders({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		page: `${searchParams.page || '1'}`,
	})

	const orders = res?.data?.orders
	const isNext = res?.data?.isNext || false

	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>거래 내역</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table>
				{orders && orders.length > 0 && <TableCaption>최근 거래 목록.</TableCaption>}
				<TableHeader>
					<TableRow>
						<TableHead>자산명</TableHead>
						<TableHead>지갑 주소</TableHead>
						<TableHead>펀딩 금액</TableHead>
						<TableHead>거래 상태</TableHead>
						<TableHead>거래 시간</TableHead>
						<TableHead className='text-right'>작업</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders && orders.length === 0 && (
						<TableRow>
							<TableCell colSpan={6} className='text-center'>
							거래 내역 없음.
							</TableCell>
						</TableRow>
					)}
					{orders &&
						orders.map(order => (
							<TableRow key={order._id}>
								<TableCell>{order.product.title}</TableCell>
								<TableCell>{sliceText(order.user.email, 10)}</TableCell>
								<TableCell>
									<Badge variant={'secondary'}>{formatPrice(order.price)}</Badge>
								</TableCell>
								<TableCell>
									<Badge>{order.status}</Badge>
								</TableCell>
								<TableCell>{format(new Date(order.createdAt), 'dd/MM/yyyy')}</TableCell>
								<TableCell className='text-right'>
									<OrderActions order={order} />
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
