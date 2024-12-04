'use client';

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Option } from '@/types/option';

import { deleteOptionAsync } from '@/lib/features/option/optionSlice';
import { useAppDispatch } from '@/lib/features/hooks';

interface CellActionProps {
  data: Option;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onConfirm = async () => {
    setLoading(true);
    try {
      await dispatch(deleteOptionAsync(data.id)).unwrap();
      setOpen(false);
    } catch (error) {
      console.error('Failed to delete option:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">メニューを開く</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>アクション</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/option/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> 更新
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> 削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
