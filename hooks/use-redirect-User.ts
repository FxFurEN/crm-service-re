import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';

const useRedirectIfUser = () => {
  const router = useRouter();
  const role = useCurrentRole();

  useEffect(() => {
    if (role === UserRole.USER) {
      router.back();
    }
  }, [role, router]);
};

export default useRedirectIfUser;
