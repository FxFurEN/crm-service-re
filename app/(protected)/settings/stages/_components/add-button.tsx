"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogModalStages } from "@/components/stages/dialog-modal";

const AddButton = ({ onSuccess }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button className="mb-4" onClick={() => setOpen(true)}>
                Добавить статус  <Plus className="ml-2 h-4 w-4"/>
            </Button>
            <DialogModalStages open={open} onOpenChange={setOpen} onSuccess={onSuccess}/>
        </>
    );
}

export default AddButton;