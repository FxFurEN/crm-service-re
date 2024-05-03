"use client";

import { DialogModalStages } from "@/components/stages/dialog-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const AddButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
        <Button className="mb-4" onClick={() => setOpen(true)}>
            Добавить статус  <Plus className="ml-2 h-4 w-4"/>
        </Button>
        <DialogModalStages open={open} onOpenChange={setOpen}/>
        </>
        
      );
}

export default AddButton;