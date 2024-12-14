'use client';

import { useState } from 'react';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deleteTagAsync } from '@/lib/features/tag/tagSlice';
import { Tag } from '@/types/tag';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { AlertModal } from '@/components/modal/alert-modal';
import { useAppDispatch } from '@/lib/features/hooks';

interface CellActionProps {
  data: Tag;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onConfirm = async () => {
    setLoading(true);
    try {
      await dispatch(deleteTagAsync(data.id)).unwrap();
      setOpen(false);
    } catch (error) {
      console.error('Failed to delete tag:', error);
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
            onClick={() =>
              router.push(`/dashboard/category-tag/tag/${data.id}`)
            }
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
