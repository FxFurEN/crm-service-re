import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tag } from "antd";

interface CategoryListProps {
  categories: string[];
}

const StagesList: React.FC<CategoryListProps> = ({ data }) => {
  return (
    <div className="w-full md:flex-shrink-0 mt-7">
      <ScrollArea className="h-72 w-full md:w-full rounded-md border">
        {data.length > 0 ? (
          <div className="p-4">
            {data.map((stage, index) => (
              <div key={index} className="text-sm">
                 <Tag color={stage.color}>{stage.name}</Tag>
                
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

export default StagesList;
