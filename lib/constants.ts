import { Banknote, Barcode, Heart, Settings2, Shuffle, User } from 'lucide-react'

// export const categories = ['All', 'Shoes', 'T-Shirts', 'Clothes', 'Books', 'Accessories', 'Universal']

export const categories = ['All', 'DAO-참여', '	NFT-상품', '디지털-결제-상품', '프로젝트-문서', '커뮤니티-굿즈-Community-Goods', '글로벌-자산-Global-Asset']

export const dashboardSidebar = [
	{ name: '지갑/프로필 정보', route: '/dashboard', icon: User },
	{ name: '거래 내역', route: '/dashboard/orders', icon: Shuffle },
	{ name: '펀딩 내역', route: '/dashboard/payments', icon: Banknote },
	{ name: '관심 자산', route: '/dashboard/watch-list', icon: Heart },
	{ name: '계정 설정', route: '/dashboard/settings', icon: Settings2 },
]

// export const adminSidebar = [
// 	{ name: 'Customers', icon: User, route: '/admin' },
// 	{ name: 'Products', icon: Barcode, route: '/admin/products' },
// 	{ name: 'Orders', icon: Shuffle, route: '/admin/orders' },
// 	{ name: 'Payments', icon: Banknote, route: '/admin/payments' },
// ]


export const adminSidebar = [
	{ name: 'Participants (참여자 관리)', icon: User, route: '/admin' },
	{ name: 'Tokens (토큰 관리)', icon: Barcode, route: '/admin/products' },
	{ name: 'Transactions (거래 내역)', icon: Shuffle, route: '/admin/orders' },
	{ name: 'Tokens (결제 관리)', icon: Banknote, route: '/admin/payments' },
]


export const TransactionState = {
	Paid: 2,
	Pending: 1,
	PendingCanceled: -1,
	PaidCanceled: -2,
}
