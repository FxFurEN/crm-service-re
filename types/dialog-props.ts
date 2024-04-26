export type DialogModalProps<T> = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode?: "add" | "edit";
    data?: T | null;
    onSuccess?: () => void; 
  };
  