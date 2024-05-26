"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenIcon, Plus } from "lucide-react";
import { DialogModalStages } from "@/components/stages/dialog-modal";

const EditButton = ({ onSuccess }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="outline" onClick={() => setOpen(true)}>
                <div className="flex items-center justify-center">
                    <PenIcon className="h-4 w-4"/>
                </div>
            </Button>
            <DialogModalStages open={open} onOpenChange={setOpen} onSuccess={onSuccess} mode="edit" />
        </>
    );
}

export default EditButton;