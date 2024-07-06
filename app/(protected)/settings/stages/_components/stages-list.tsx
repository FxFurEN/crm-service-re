import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tag } from "antd";
import EditButton from './edit-button';
import { Stage } from '@/types/stages';
import { EditStageDialog } from '@/components/stages/edit-stage-dialog';

interface StageListProps {
  data: Stage[];
  onEditSuccess: () => void;
}

const StagesList: React.FC<StageListProps> = ({ data }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);

  const handleEditClick = (stage: Stage) => {
    setCurrentStage(stage);
    setOpenDialog(true);
  };


  return (
    <div className="w-full md:flex-shrink-0 mt-7">
      <ScrollArea className="max-h-[34rem] w-full md:w-full rounded-md border">
        {data.length > 0 ? (
          <div className="p-4">
            {data.map((stage, index) => (
              <div key={index} className='flex flex-row justify-between items-center mb-2'>
                <div className="flex items-center">
                  <Tag color={stage.color}>{stage.name}</Tag>
                </div>
                <div>
                  <EditButton onClick={() => handleEditClick(stage)} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-5">Нет результатов</p>
        )}
      </ScrollArea>

      {currentStage && (
        <EditStageDialog 
          open={openDialog} 
          onOpenChange={setOpenDialog} 
          stageData={currentStage} 
        />
      )}
    </div>
  );
}

export default StagesList;
