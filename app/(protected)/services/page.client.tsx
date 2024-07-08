'use client'

import { deleteService } from '@/actions/del-data'
import DeleteConfirmationDialog from '@/components/alert-dialog-confirm'
import FloatButton from '@/components/float-button'
import { DialogModalCategory } from '@/components/services/dialog-modal-category'
import { DialogModal } from '@/components/services/dialog-modal-service'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Category } from '@/types/category'
import { Service } from '@/types/services'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import type { InputRef, TableColumnType } from 'antd'
import { Space, Table } from 'antd'
import { Pencil, Search, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { Toaster, toast } from 'sonner'
import CategoryList from './_components/category-list'

interface ServicesPageProps {
	initialServices: Service[]
	initialCategories: Category[]
}

const ServicesPage: React.FC<ServicesPageProps> = ({
	initialServices,
	initialCategories,
}) => {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [openCategory, setOpenCategory] = useState(false)
	const [serviceData, setServiceData] = useState<Service | null>(null)
	const [categoryData, setCategoryData] = useState<Category | null>(null)
	const [mode, setMode] = useState<'edit' | 'add'>('add')
	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [deleteRowId, setDeleteRowId] = useState<string | null>(null)
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	const searchInput = useRef<InputRef>(null)

	const handleFloatButtonClick = () => {
		setOpen(true)
		setMode('add')
	}

	const handleCategoryButtonClick = () => {
		setOpenCategory(true)
		setMode('add')
	}

	const handleEdit = (id: string) => {
		const selectedService = initialServices.find(service => service.id === id)
		setOpen(true)
		setServiceData(selectedService || null)
		setMode('edit')
	}

	const handleEditCategory = (id: string) => {
		const selectedCategory = initialCategories.find(
			category => category.id === id
		)
		setOpenCategory(true)
		setCategoryData(selectedCategory || null)
		setMode('edit')
	}

	const handleDelete = (id: string) => {
		setDeleteRowId(id)
		setDeleteDialogOpen(true)
	}

	const handleDeleteConfirm = async () => {
		try {
			if (deleteRowId) {
				const response = await deleteService(deleteRowId)
				if (response.success) {
					toast.success(response.success)
					initialServices = initialServices.filter(
						service => service.id !== deleteRowId
					)
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
		dataIndex: keyof Service
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
		dataIndex: keyof Service
	): TableColumnType<Service> => ({
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
		render: (text: string) =>
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

	const columns: TableColumnType<Service>[] = [
		{
			title: 'Наименование',
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps('name'),
		},
		{
			title: 'Цена, BYN',
			dataIndex: 'price',
			key: 'price',
			sorter: (a, b) => a.price - b.price,
			responsive: ['md'],
		},
		{
			title: 'Категория',
			dataIndex: 'categoryName',
			key: 'categoryName',
			...getColumnSearchProps('categoryName'),
			responsive: ['md'],
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
		<div className='flex mr-5 ml-5 flex-col md:flex-row'>
			{!initialCategories.length ? (
				<Skeleton className='h-[340px] w-[220px]' />
			) : (
				<CategoryList
					categories={initialCategories}
					onEditCategory={handleEditCategory}
					onCategoryButtonClick={handleCategoryButtonClick}
				/>
			)}
			<div className='w-full mb-20'>
				<Table
					columns={columns}
					dataSource={initialServices}
					rowKey='id'
					size='small'
					scroll={{ x: 'max-content' }}
					className='lg:ml-5'
				/>
				<FloatButton onClick={handleFloatButtonClick} />
				<DialogModal
					open={open}
					onOpenChange={setOpen}
					mode={mode}
					serviceData={serviceData}
				/>
				<DialogModalCategory
					open={openCategory}
					onOpenChange={setOpenCategory}
					mode={mode}
					categoryData={categoryData}
				/>
				<DeleteConfirmationDialog
					open={isDeleteDialogOpen}
					onOpenChange={setDeleteDialogOpen}
					onConfirm={handleDeleteConfirm}
					onCancel={handleDeleteCancel}
				/>
			</div>
			<Toaster richColors />
		</div>
	)
}

export default ServicesPage
