"use client";

import { useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import FloatButton from "@/components/float-button";
import { DialogModal } from "@/components/clients/dialog-modal";
import { Client } from "@/types/client";
import DeleteConfirmationDialog from "@/components/alert-dialog-confirm";
import { deleteClient } from "@/actions/del-data";
import Highlighter from 'react-highlight-words';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import type { InputRef, TableColumnType } from 'antd';
import { Space, Table } from 'antd';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, Search, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Checkbox } from '@/components/ui/checkbox';

type DataIndex = keyof Client;

const clientTypeFilters = [
  { text: "Физ лицо", value: "physical" },
  { text: "Юр лицо", value: "legal" },
];


const ClientsPage = ({ clients }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [clientData, setClientData] = useState<Client | null>(null);
  const [mode, setMode] = useState<"edit" | "add">("add");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleRowClick = (id: string) => {
    router.push(`/clients/${id}`);
  };

  const handleFloatButtonClick = () => {
    setOpen(true);
    setMode("add");
  };

  const handleEdit = (id: string) => {
    const selectedClient = clients.find((client) => client.id === id);
    setOpen(true);
    setClientData(selectedClient);
    setMode("edit");
  };

  const handleDelete = (id: string) => {
    setDeleteRowId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteRowId) {
        const response = await deleteClient(deleteRowId);
        if (response.success) {
          toast.success(response.success);
        }
      }
      setDeleteRowId(null);
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Что-то пошло не так");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteRowId(null);
    setDeleteDialogOpen(false);
  };
  
  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Client> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Поиск`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          >
            <Search className="h-4 w-4 mr-2" /> Поиск
          </Button>
          <Button
              variant="link"
              onClick={() => {
                clearFilters && handleReset(clearFilters)
                confirm();
                
              }}
              style={{ width: 90 }}
            >
              Сбросить
            </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <Search className="h-4 w-4" />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
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
  });


  const columns: TableColumnType<Client>[] = [
    {
      title: 'Клиент',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      responsive: ['md'],
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
      responsive: ['md'],
    },
    {
      title: 'Тип клиента',
      dataIndex: 'sign',
      key: 'sign',
      filters: clientTypeFilters,
      onFilter: (value, record) => {
        const isPhysical = !record.sign;
        return (value === 'physical' && isPhysical) || (value === 'legal' && !isPhysical);
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Space direction="vertical" style={{ display: 'block' }}>
            {clientTypeFilters.map(filter => (
              <div key={filter.value} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <Checkbox
                  checked={selectedKeys.includes(filter.value)}
                  onCheckedChange={(checked) => {
                    const newSelectedKeys = checked
                      ? [...selectedKeys, filter.value]
                      : selectedKeys.filter(key => key !== filter.value);
                    setSelectedKeys(newSelectedKeys);
                  }}
                />
                <span style={{ marginLeft: 8 }}>{filter.text}</span>
              </div>
            ))}
          </Space>
          <Space>
            <Button onClick={() => confirm()} style={{ marginRight: 8 }}>
              Применить
            </Button>
            <Button
              variant="link"
              onClick={() => {
                clearFilters && clearFilters();
                confirm();
              }}
            >
              Сбросить
            </Button>
          </Space>
        </div>
      ),
      render: (sign: boolean) => (sign ? 'Юр лицо' : 'Физ лицо'),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEdit(record.id); }}>
              <Pencil size={20} className="mr-2"/>Редактировать
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDelete(record.id); }}>
              <Trash2 size={20} color="#ff0000" className="mr-2"/>Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }
    
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={clients}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record.id),
        })}
        size="small"
        scroll={{ x: 'max-content' }}
      />
      <FloatButton onClick={handleFloatButtonClick} />
      <DialogModal
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        clientData={clientData}
      />
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
      <Toaster richColors />
    </>
  );
};

export default ClientsPage;
