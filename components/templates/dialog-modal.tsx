"use client";

import { generate } from '@pdfme/generator';
import { certificate_of_Completion } from '@/documents/tempates';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from 'react';
import { text, image, readOnlyText, readOnlySvg, tableBeta, line  } from "@pdfme/schemas";
import { getOrderById } from '@/actions/data-load';

export function DialogModal({ open, onOpenChange, orderId }) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [order, setOrder] = useState(null);

  const templates = [
    { name: "certificate_of_Completion", label: "Акт выполненных работ" },
    { name: "товарный чек", label: "Товарный чек" },
    { name: "квитанция о приеме на ремонт", label: "Квитанция о приеме на ремонт" },
    { name: "гарантийная квитанция", label: "Гарантийная квитанция" }
  ];


  useEffect(() => {
    fetchOrder();
  }, [orderId]);


  const fetchOrder = async () => {
    if (orderId) {
      const fetchedOrder = await getOrderById(orderId);
      setOrder(fetchedOrder);
    }
  };

  const handleTemplateSelection = (template: string) => {
    setSelectedTemplate(template);
  };

  const generatePDF = () => {
    if (!certificate_of_Completion) {
      console.error('Template is not loaded yet.');
      return;
    }

    const orderData = `[[\"${order.service.name}\",\"${order.service.price}\"]]`;

    const clientData = order.client.sign === false ?
      `${order.client.initials}\n${order.client.phone}\n${order.client.email}` :
      `${order.client.name}\n${order.client.unp}\n${order.client.email}\n${order.client.phone}`;

    const inputs = [{
      orderData: orderData,
      clientData: clientData
    }];
    const plugins = { text, image, readOnlyText, readOnlySvg, Table: tableBeta, line  };
    generate({ template: certificate_of_Completion, inputs, plugins}).then((pdf) => {
      try {
        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again later.');
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Изменить статус заказа</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup value={selectedTemplate} onValueChange={handleTemplateSelection}>
            {templates.map(({ name, label }) => (
              <div key={name} className="flex items-center space-x-2">
                <RadioGroupItem value={name} id={name} />
                <Label htmlFor={name}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            onClick={generatePDF}
          >
            Печатать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}