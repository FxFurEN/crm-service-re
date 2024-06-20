"use client";

import dynamic from 'next/dynamic';

const DynamicAccessDeniedDialog = dynamic(() => import('@/components/access-denied-dialog'), { ssr: false });

const AccessPage = () => {
  return <DynamicAccessDeniedDialog onClose={() => {}} />;
};

export default AccessPage;
