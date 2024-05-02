"use client";

import useRedirectIfUser from '@/hooks/use-redirect-User';

const PositionPage = () => {
  useRedirectIfUser();

  return ( 
    <>
        <p className="text-2xl font-semibold text-center">
          Документы
        </p>
    </>
   );
}
 
export default PositionPage;
