'use client';

import StagesList from './_components/stages-list';
import AddButton from './_components/add-button';

const StagesPage = ({ stages }) => {

  const handleSuccess = () => {
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="ml-5">
          <AddButton onSuccess={handleSuccess} />
        </div>
        <div>
          <StagesList data={stages} onSuccess={handleSuccess} />
        </div>
      </div>
    </>
  );
};

export default StagesPage;
