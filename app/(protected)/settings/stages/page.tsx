import useRedirectIfUser from '@/hooks/use-redirect-User';
import React from 'react';
import StagesList from './_components/stages-list';
import AddButton from './_components/add-button';
import { getAllStages } from '@/actions/data-load';

const StagesPage = async  () => {

    const stages = await getAllStages();
    return ( 
      <>
          <div className="flex flex-col ml-20">
            <div>
                <AddButton/>
            </div>
            <div>
                <StagesList data={stages}/>
            </div>
        </div>
      </>
    );
}
 
export default StagesPage;
