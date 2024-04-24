import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function DialogModal({ open, onOpenChange }) {
  const [clientType, setClientType] = useState("individual");

  const handleClientTypeChange = (value) => {
    setClientType(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавить клиента</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <RadioGroup value={clientType} onValueChange={handleClientTypeChange} className="flex flex-col gap-10px">
              <RadioGroupItem value="individual" id="r1" />
                <Label htmlFor="r1">Физ. лицо</Label>
              <RadioGroupItem value="corporate" id="r2"/>
                <Label htmlFor="r2">Юр. лицо</Label>
            </RadioGroup>
          {clientType === "individual" && (
            <>
              <div>
                <Label htmlFor="name" className="text-left">ФИО</Label>
                <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
              </div>
            </>
            
          )}
          {clientType === "corporate" && (
            <>
              <div>
                <Label htmlFor="company" className="text-right">Название организации</Label>
                <Input id="company" defaultValue="ABC Inc." className="col-span-3" />
              </div>
              <div>
                <Label htmlFor="unp" className="text-right">УНП</Label>
                <Input id="unp" defaultValue="123456789." className="col-span-3" />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="phone" className="text-right">Телефон</Label>
            <Input id="phone" defaultValue="+375 (29) ***-**-**" className="col-span-3" />
          </div>
          <div>
            <Label htmlFor="email" className="text-right">Почта</Label>
            <Input id="email" defaultValue="example@example.com" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Добавить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
