"use client";

import useRedirectIfUser from '@/hooks/use-redirect-User';
import CategoryList from './_components/stages-list';
import React from 'react';

const StagesPage = () => {
    const [categories, setCategories] = React.useState<string[]>([]);

    useRedirectIfUser();

  return ( 
    <>
        <div className="flex items-center justify-center">
          <CategoryList categories={categories} onCategoryButtonClick={() => {}} />
        </div>
    </>
   );
}
 
export default StagesPage;
