import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tag } from "antd";
import EditButton from './edit-button';

interface StageListProps {
  data: { name: string; color: string }[];
  onEditSuccess: () => void;
}

const StagesList: React.FC<StageListProps> = ({ data, onEditSuccess }) => {
  return (
    <div className="w-full md:flex-shrink-0 mt-7">
      <ScrollArea className="h-72 w-full md:w-full rounded-md border">
        {data.length > 0 ? (
          <div className="p-4">
            {data.map((stage, index) => (
              <div key={index} className='flex flex-row justify-between items-center mb-2'>
                <div className="flex items-center">
                  <Tag color={stage.color}>{stage.name}</Tag>
                </div>
                <div>
                  <EditButton stageData={stage} onSuccess={onEditSuccess} />
                </div>
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
