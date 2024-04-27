import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CategoryListProps {
  categories: string[];
  onEditCategory: (id: string) => void;
  onCategoryButtonClick: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onEditCategory, onCategoryButtonClick }) => {
  return (
    <div className="w-full md:w-48 md:flex-shrink-0 mt-7">
      <h4 className="mb-4 text-md font-medium leading-none">
        Категории
        <Button className="ml-2 rounded-full " variant="ghost" size="icon" onClick={onCategoryButtonClick}>
          <Plus size={15}/>
        </Button>
      </h4>
      <ScrollArea className="h-72 w-full md:w-48 rounded-md border">
        {categories.length > 0 ? (
          <div className="p-4">
            {categories.map((category, index) => (
              <div key={index} className="text-sm">
                {category.name}
                <Button className="ml-2 rounded-full" variant="ghost" size="icon" onClick={() => onEditCategory(category.id)}>
                  <Pencil size={15}/>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-5">Нет результатов</p>
        )}
      </ScrollArea>
    </div>
  );
}

export default CategoryList;
