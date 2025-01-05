import { useEditCategoryState } from '@/features/category/hooks/use-edit-category-state';
import { CategoryResponse } from '@/features/category/schemas/category-schemas';
import { cn } from '@/lib/utils';

interface Props {
  category: CategoryResponse;
}

export const CategoryColumn = ({ category }: Props) => {
  const { onOpen } = useEditCategoryState();

  const onClick = () => {
    onOpen(category);
  };

  return (
    <div onClick={onClick} className={cn('flex items-center cursor-pointer hover:underline', !category.name && 'text-rose-500')}>
      {category.name || 'Uncategorized'}
    </div>
  );
};
