import React from "react";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => (
  <Button variant="outline" onClick={onClick}>
    <div className="flex items-center justify-center">
      <PenIcon className="h-4 w-4" />
    </div>
  </Button>
);

export default EditButton;
