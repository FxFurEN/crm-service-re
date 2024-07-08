'use client'

import { deleteClient } from '@/actions/del-data'
import DeleteConfirmationDialog from '@/components/alert-dialog-confirm'
import FloatButton from '@/components/float-button'
import { DialogModal } from '@/components/orders/dialog-modal'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Order } from '@/types/order'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import type { InputRef, TableColumnType } from 'antd'
import { Space, Table, Tag } from 'antd'
import { format } from 'date-fns'
import { Loader, Pencil, Search, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { Toaster, toast } from 'sonner'

type DataIndex = keyof Order

const ClientOrdersPage = ({ orders }) => {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [ordersData, setOrdersData] = useState<Order | null>(null)
	const [mode, setMode] = useState<'edit' | 'add'>('add')
	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [deleteRowId, setDeleteRowId] = useState<string | null>(null)
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const searchInput = useRef<InputRef>(null)

	const statusFilters = Array.from(
		new Set(
			orders.map(order => {
				const lastStage =
					order.execution.length > 0
						? order.execution[order.execution.length - 1].stage
						: null
				return lastStage ? lastStage.name : 'Нет статуса'
			})
		)
	).map(status => ({ text: status, value: status }))

	const handleRowClick = (id: string) => {
		setIsLoading(true)
		router.push(`/orders/${id}`)
	}

	const handleFloatButtonClick = () => {
		setOpen(true)
		setMode('add')
	}

	const handleEdit = (id: string) => {
		const selectedOrder = orders.find(order => order.id === id)
		setOpen(true)
		setOrdersData(selectedOrder)
		setMode('edit')
	}

	const handleDelete = (id: string) => {
		setDeleteRowId(id)
		setDeleteDialogOpen(true)
	}

	const handleDeleteConfirm = async () => {
		try {
			if (deleteRowId) {
				const response = await deleteClient(deleteRowId)
				if (response.success) {
					toast.success(response.success)
					setOrdersData(orders.filter(order => order.id !== deleteRowId))
				}
			}
			setDeleteRowId(null)
			setDeleteDialogOpen(false)
		} catch (error) {
			toast.error('Что-то пошло не так')
		}
	}

	const handleDeleteCancel = () => {
		setDeleteRowId(null)
		setDeleteDialogOpen(false)
	}

	const handleSearch = (
		selectedKeys: string[],
		confirm: () => void,
		dataIndex: DataIndex
	) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const handleReset = (clearFilters: () => void) => {
		clearFilters()
		setSearchText('')
	}

	const getColumnSearchProps = (
		dataIndex: DataIndex
	): TableColumnType<Order> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Поиск`}
					value={selectedKeys[0]}
					onChange={e =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys as string[], confirm, dataIndex)
					}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						onClick={() =>
							handleSearch(selectedKeys as string[], confirm, dataIndex)
						}
					>
						<Search className='h-4 w-4 mr-2' /> Поиск
					</Button>
					<Button
						variant='link'
						onClick={() => {
							clearFilters && handleReset(clearFilters)
							confirm()
						}}
						style={{ width: 90 }}
					>
						Сбросить
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => <Search className='h-4 w-4' />,
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: visible => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100)
			}
		},
		render: text =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	})

	const columns: TableColumnType<Order>[] = [
		{
			title: 'Услуга',
			dataIndex: 'serviceName',
			key: 'serviceName',
			...getColumnSearchProps('serviceName'),
		},
		{
			title: 'Статус',
			dataIndex: 'executionStatus',
			key: 'executionStatus',
			filters: statusFilters,
			onFilter: (value, record) => {
				const lastStage =
					record.execution.length > 0
						? record.execution[record.execution.length - 1].stage
						: null
				const status = lastStage ? lastStage.name : 'Нет статуса'
				return status.includes(value)
			},
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
				close,
			}) => (
				<div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
					<Space direction='vertical' style={{ display: 'block' }}>
						{statusFilters.map(filter => (
							<Tag
								key={filter.value}
								color={selectedKeys.includes(filter.value) ? 'blue' : 'default'}
								onClick={() => {
									const newSelectedKeys = selectedKeys.includes(filter.value)
										? selectedKeys.filter(key => key !== filter.value)
										: [...selectedKeys, filter.value]
									setSelectedKeys(newSelectedKeys)
								}}
								style={{ cursor: 'pointer', marginBottom: 8 }}
							>
								{filter.text}
							</Tag>
						))}
						<Select
							value={selectedKeys[0] || ''}
							onChange={value => setSelectedKeys(value ? [value] : [])}
							options={statusFilters}
							style={{ width: '100%', marginBottom: 8 }}
							placeholder='Выберите статус'
						/>
					</Space>
					<Space>
						<Button onClick={() => confirm()}>Применить</Button>
						<Button
							variant='link'
							onClick={() => {
								clearFilters && clearFilters()
								confirm()
							}}
							style={{ width: 90 }}
						>
							Сбросить
						</Button>
					</Space>
				</div>
			),
			render: (_, { execution }) => {
				const lastStage =
					execution.length > 0 ? execution[execution.length - 1].stage : null
				const color = lastStage ? lastStage.color : '#000000'
				const status = lastStage ? lastStage.name : 'Нет статуса'
				return <Tag color={color}>{status}</Tag>
			},
			responsive: ['md'],
		},
		{
			title: 'Дата создания',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: createdAt => format(new Date(createdAt), 'dd.MM.yyyy'),
			responsive: ['md'],
		},
		{
			title: 'Дата выполнения',
			dataIndex: 'leadTime',
			key: 'leadTime',
			sorter: (a, b) =>
				new Date(a.leadTime).getTime() - new Date(b.leadTime).getTime(),
			render: leadTime => format(new Date(leadTime), 'dd.MM.yyyy'),
			responsive: ['md'],
		},
		{
			title: 'Сотрудник',
			dataIndex: 'userName',
			key: 'userName',
			...getColumnSearchProps('userName'),
			responsive: ['md'],
		},
		{
			title: 'Клиент',
			dataIndex: 'clientName',
			key: 'clientName',
			...getColumnSearchProps('clientName'),
		},
		{
			title: 'Действия',
			key: 'actions',
			render: (_, record) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='h-8 w-8 p-0'
							onClick={e => e.stopPropagation()}
						>
							<span className='sr-only'>Open menu</span>
							<DotsHorizontalIcon className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem
							onClick={e => {
								e.stopPropagation()
								handleEdit(record.id)
							}}
						>
							<Pencil size={20} className='mr-2' />
							Редактировать
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={e => {
								e.stopPropagation()
								handleDelete(record.id)
							}}
						>
							<Trash2 size={20} color='#ff0000' className='mr-2' />
							Удалить
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	]

	return (
		<>
			{isLoading && (
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(255, 255, 255, 0.8)',
						zIndex: 2,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Loader className='animate-spin' />
				</div>
			)}
			<Table
				columns={columns}
				dataSource={orders}
				rowKey='id'
				onRow={record => ({
					onClick: () => handleRowClick(record.id),
				})}
				size='small'
				scroll={{ x: 'max-content' }}
			/>
			<FloatButton onClick={handleFloatButtonClick} />
			<DialogModal
				open={open}
				onOpenChange={setOpen}
				mode={mode}
				orderData={ordersData}
			/>
			<DeleteConfirmationDialog
				open={isDeleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				onConfirm={handleDeleteConfirm}
				onCancel={handleDeleteCancel}
			/>
			<Toaster richColors />
		</>
	)
}

export default ClientOrdersPage
