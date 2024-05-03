"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const addButton = () => {
    return (
        <Button className="mb-4">
            Добавить статус  <Plus className="ml-2 h-4 w-4"/>
        </Button>
      );
}



export default addButton;