"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useRouter } from 'next/navigation';
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type AccessDeniedDialogProps = {
  onClose: () => void;
};

const AccessDeniedDialog = ({ onClose }: AccessDeniedDialogProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
    onClose();
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="rounded p-4">
        <AlertDialogHeader className="flex items-center">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2" />
          <AlertDialogTitle className="font-bold">
            Доступ запрещен
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Эта страница доступна только для администраторов.
        </AlertDialogDescription>
        <AlertDialogFooter className="mt-4">
          <AlertDialogAction onClick={handleGoBack} >
            Вернуться назад
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AccessDeniedDialog;
