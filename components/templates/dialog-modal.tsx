"use client";

import { generate } from '@pdfme/generator';
import { certificate_of_Completion, collection_slip, guarantee_card } from '@/documents/tempates';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from 'react';
import { text, image, readOnlyText, readOnlySvg, tableBeta, line  } from "@pdfme/schemas";
import { getOrderById } from '@/actions/data-load';
import { Template } from "@pdfme/common";
import { formatDate } from "date-fns";

export function DialogModal({ open, onOpenChange, orderId }) {
  const [selectedTemplateName, setSelectedTemplateName] = useState<string>("");
  const [order, setOrder] = useState(null);

  const templates: { name: string; label: string; template: Template; }[] = [
    { name: "certificate_of_Completion", label: "Акт выполненных работ", template: certificate_of_Completion },
    { name: "collection_slip", label: "Квитанция о приеме на ремонт", template: collection_slip },
    { name: "guarantee_card", label: "Гарантийный талон", template: guarantee_card },
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

  const handleTemplateSelection = (templateName: string) => {
    setSelectedTemplateName(templateName);
  };

  const generatePDF = () => {
    const selectedTemplate = templates.find(template => template.name === selectedTemplateName);

    let inputs = []; 

  if (selectedTemplateName === 'certificate_of_Completion') {
      const createdAt = formatDate(order.createdAt, "dd.MM.yyyy");
      const leadTime = formatDate(order.leadTime, "dd.MM.yyyy");

      const serviceData = `[[\"${order.service.name}\",\"${order.service.price}\"]]`;

      const orderData = order.client.sign === false ?
      `[[\"${order.client.initials}\", \"${order.service.name}\", \"${createdAt}\", \"${leadTime}\"]]` :
      `[[${JSON.stringify(order.client.name)}, \"${order.service.name}\", \"${createdAt}\", \"${leadTime}\"]]`;    

      inputs.push({
        orderData: orderData,
        serviceData: serviceData,
        createdAt: createdAt
      });
  } else if (selectedTemplateName === 'collection_slip') {
      const createdAt = formatDate(order.createdAt, "dd.MM.yyyy");
      const leadTime = formatDate(order.leadTime, "dd.MM.yyyy");

      const orderData = order.client.sign === false ?
      `[[\"${order.client.initials}\", \"${order.service.name}\", \"${createdAt}\", \"${leadTime}\"]]` :
      `[[${JSON.stringify(order.client.name)}, \"${order.service.name}\", \"${createdAt}\", \"${leadTime}\"]]`;    

      inputs.push({
        orderData: orderData,
        createdAt: createdAt
      });
  } else if (selectedTemplateName === 'guarantee_card') {
    const createdAt = formatDate(order.createdAt, "dd.MM.yyyy");
    const createdAtCopy = formatDate(order.createdAt, "dd.MM.yyyy");
    const leadTime = formatDate(order.leadTime, "dd.MM.yyyy");

    const serviceData = `[[\"${order.service.name}\",\"${order.service.price}\"]]`;

    const orderData = order.client.sign === false ?
      `[[\"${order.client.initials}\", \"${order.service.name}\", \"${createdAt}\", \"${leadTime}\"]]` :
      `[[${JSON.stringify(order.client.name)}, \"${order.service.name}\", \"${createdAt}\", \"${leadTime}\"]]`;    

      inputs.push({
        orderData: orderData,
        serviceData: serviceData,
        createdAt: createdAt,
        createdAtCopy: createdAtCopy
      });
}
    

    const plugins = { text, image, readOnlyText, readOnlySvg, Table: tableBeta, line };
    generate({ template: selectedTemplate.template, inputs, plugins }).then((pdf) => {
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
          <DialogTitle>Печатать</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup value={selectedTemplateName} onValueChange={handleTemplateSelection}>
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