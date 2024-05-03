import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CategoryListProps {
  categories: string[];
  onCategoryButtonClick: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategoryButtonClick }) => {
  return (
    <div className="w-full md:w-48 md:flex-shrink-0 mt-7">
      <Button onClick={onCategoryButtonClick} className="mb-4">
        Добавить статус  <Plus className="ml-2 h-4 w-4"/>
      </Button>
      <ScrollArea className="h-72 w-full md:w-full rounded-md border">
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
