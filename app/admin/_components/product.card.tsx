'use client'

import { deleteProduct } from '@/actions/admin.action'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useAction from '@/hooks/use-action'
import { useProduct } from '@/hooks/use-product'
import { toast } from '@/hooks/use-toast'
import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
	product: IProduct
}
const ProductCard: FC<Props> = ({ product }) => {
	const { setOpen, setProduct } = useProduct()
	const { isLoading, onError, setIsLoading } = useAction()

	const onEdit = () => {
		setOpen(true)
		setProduct(product)
	}

	async function onDelete() {
		setIsLoading(true)
		const res = await deleteProduct({ id: product._id })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast({ description: 'Product deleted successfully' })
			setIsLoading(false)
		}
	}

	return (
		<div className={'border relative flex justify-between flex-col'}>
			<div className='bg-secondary relative'>
				<Image src={product.image!} width={200} height={200} className='mx-auto' alt={product.title!} />
				<Badge className='absolute top-0 left-0'>{product.category}</Badge>
			</div>

			<div className='p-2'>
				<div className='flex justify-between items-center text-sm'>
					<h1 className='font-bold'>{product.title}</h1>
					<p className='font-medium'>
  {typeof window !== 'undefined' ? formatPrice(product.price!) : null}
</p>

				</div>
				<p className='text-xs text-muted-foreground leading-1 line-clamp-5'>{product.description}</p>
				<Separator className='my-2' />
			</div>

			<div className='grid grid-cols-2 gap-2 px-2 pb-2'>
				<Button variant={'secondary'} onClick={onEdit}>
				자산 수정
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant={'outline'}>거래 삭제</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>이 거래를 삭제하시겠습니까?</AlertDialogTitle>
							<AlertDialogDescription>
							이 작업은 블록체인 상에서 되돌릴 수 없습니다. 이 작업은 플랫폼에서 거래 기록을 영구적으로 삭제합니다.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={isLoading}>취소</AlertDialogCancel>
							<AlertDialogAction onClick={onDelete} disabled={isLoading}>
							   삭제 확인
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	)
}

export default ProductCard
