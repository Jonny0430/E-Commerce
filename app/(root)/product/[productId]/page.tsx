import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import CreateOrderButton from '../_components/create-order.btn'
import { getProduct } from '@/actions/user.action'
import { Params } from '@/types'
import { FC } from 'react'
import { notFound } from 'next/navigation'

interface Props {
	params: Params
}
export async function generateMetadata({ params }: Props) {
	const { productId } = params
	const res = await getProduct({ id: productId })
	const product = res?.data?.product

	return {
		title: product?.title,
		description: product?.description,
		openGraph: { images: product?.image },
	}
}
const Page: FC<Props> = async ({ params }) => {
	const { productId } = await params

	const res = await getProduct({ id: productId })

	const product = res?.data?.product

	if (!product) return notFound()

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
			<div className='bg-secondary relative w-full h-[70vh] col-span-2'>
				<Image src={product.image} fill className='mx-auto' alt={product.title} />
			</div>
			<div className='flex flex-col space-y-1 self-center'>
				<h1 className='font-bold text-4xl'>{product.title}</h1>
				<Badge className='w-fit' variant={'secondary'}>
					# {product.category}
				</Badge>
				<p className='text-xs text-muted-foreground'>{product.description}</p>
				<p className='font-bold'>{formatPrice(+product.price)}</p>
				<CreateOrderButton />
				<div className='text-xs'>
				토큰 구매는 블록체인 상에서 안전하게 보호됩니다. 우리는 개인 정보나 지갑 정보를 저장하지 않습니다. 거래는 이더리움과 같은 블록체인 네트워크를 통해 안전하게 처리됩니다.
				</div>
			</div>
		</div>
	)
}

export default Page
