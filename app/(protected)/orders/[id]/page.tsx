"use client";

import { SkeletonCard } from '@/components/skeleton-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getOrderById, getOrderExecutionHistory  } from '@/actions/data-load';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { History } from 'lucide-react';
import { Tag } from "antd";
import { DialogModalChangeStages } from '@/components/orders/dialog-modal-change-stage';
import type { Template } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import { text, image, readOnlyText, readOnlySvg, tableBeta, line  } from "@pdfme/schemas";

const template: Template = {
  "schemas": [
    {
      "logo copy": {
        "type": "readOnlySvg",
        "position": {
          "x": 6.72,
          "y": 4.07
        },
        "content": "\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-6 h-6\"\u003E\n  \u003Cpath stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z\" /\u003E\n\u003C/svg\u003E\n",
        "width": 27.3,
        "height": 23.86,
        "readOnly": true
      },
      "head copy": {
        "type": "readOnlyText",
        "position": {
          "x": 92.3,
          "y": 3.54
        },
        "content": "Акт выполненных работ",
        "width": 110.08,
        "height": 25.06,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "middle",
        "fontSize": 24,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "CleintLabel": {
        "type": "readOnlyText",
        "position": {
          "x": 6.72,
          "y": 41.95
        },
        "content": "Клиент:",
        "width": 97.39,
        "height": 9.42,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "top",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "clientData": {
        "type": "text",
        "content": "\nImani Olowe \n+123-456-7890 \n63 Ivy Road, Hawkville, GA, USA 31036",
        "position": {
          "x": 4.87,
          "y": 48.31
        },
        "width": 97.65,
        "height": 25.34,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "top",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "dynamicFontSize": {
          "min": 3,
          "max": 13,
          "fit": "vertical"
        },
      },
      "text-garant": {
        "type": "readOnlyText",
        "position": {
          "x": 6.72,
          "y": 131.28
        },
        "content": "Условия гарантийного обслуживания: 1. Впишите сюда ваши условия гарантийного обслуживания 2. Качество выполненных ремонтных работ проверено клиентом в присутствии Исполнителя и соответствует условиям приемной квитанции\nПретензии по работе:\n\nНастоящий акт приема-сдачи выполненных работ составлен в двух экземплярах, имеющих одинаковую юридическую силу, по одному экземпляру для каждой из Сторон.",
        "width": 196.33,
        "height": 48.31,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "top",
        "fontSize": 12,
        "lineHeight": 1.1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "menager": {
        "type": "readOnlyText",
        "position": {
          "x": 4.98,
          "y": 179.32
        },
        "content": "Менеджер: ",
        "width": 82.58,
        "height": 27.41,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "top",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "field9": {
        "type": "line",
        "icon": "\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-minus\"\u003E\u003Cpath d=\"M5 12h14\"/\u003E\u003C/svg\u003E",
        "position": {
          "x": 31.69,
          "y": 185.1
        },
        "width": 50,
        "height": 0.5,
        "rotate": 0,
        "opacity": 1,
        "readOnly": true,
        "color": "#000000"
      },
      "field9 copy": {
        "type": "line",
        "icon": "\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-minus\"\u003E\u003Cpath d=\"M5 12h14\"/\u003E\u003C/svg\u003E",
        "position": {
          "x": 6.69,
          "y": 154.1
        },
        "width": 128.32,
        "height": 0.5,
        "rotate": 0,
        "opacity": 1,
        "readOnly": true,
        "color": "#000000"
      },
      "client": {
        "type": "readOnlyText",
        "position": {
          "x": 119.19,
          "y": 179.53
        },
        "content": "Клиент: ",
        "width": 82.58,
        "height": 27.41,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "top",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "field9 copy 2": {
        "type": "line",
        "icon": "\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-minus\"\u003E\u003Cpath d=\"M5 12h14\"/\u003E\u003C/svg\u003E",
        "position": {
          "x": 145.9,
          "y": 185.31
        },
        "width": 50,
        "height": 0.5,
        "rotate": 0,
        "opacity": 1,
        "readOnly": true,
        "color": "#000000"
      },
      "orderData": {
        "type": "table",
        "position": {
          "x": 6.13,
          "y": 78.69
        },
        "width": 195.4,
        "height": 45.7592,
        "content": "[[\"Eggshell Camisole Top\",\"12323\"],[\"{stage.name}\",\"231\"]]",
        "showHead": true,
        "head": [
          "Услуга",
          "Цена"
        ],
        "headWidthPercentages": [73.3888549751235, 26.6111450248765],
        "tableStyles": {
          "borderWidth": 0,
          "borderColor": "#000000"
        },
        "headStyles": {
          "fontSize": 13,
          "characterSpacing": 0,
          "alignment": "center",
          "verticalAlignment": "middle",
          "lineHeight": 1,
          "fontColor": "#000000",
          "borderColor": "#000000",
          "backgroundColor": "",
          "borderWidth": {
            "top": 0.1,
            "right": 0.1,
            "bottom": 0.1,
            "left": 0.1
          },
          "padding": {
            "top": 5,
            "right": 5,
            "bottom": 5,
            "left": 5
          }
        },
        "bodyStyles": {
          "fontSize": 13,
          "characterSpacing": 0,
          "alignment": "center",
          "verticalAlignment": "middle",
          "lineHeight": 1,
          "fontColor": "#000000",
          "borderColor": "#000000",
          "backgroundColor": "",
          "alternateBackgroundColor": "",
          "borderWidth": {
            "top": 0.1,
            "right": 0.1,
            "bottom": 0.1,
            "left": 0.1
          },
          "padding": {
            "top": 6,
            "right": 5,
            "bottom": 5,
            "left": 5
          }
        },
        "columnStyles": {
          "alignment": {
            "0": "left"
          }
        }
      }
    }
  ],
  "basePdf": {
    "width": 210,
    "height": 297,
    "padding": [0, 0, 0, 0]
  },
  "pdfmeVersion": "4.0.0"
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}, ${hours}:${minutes}`;
};


export default function OrderDetailPage() {
  const pathname = usePathname(); 
  const id = pathname.split('/').pop();
  const [order, setOrder] = useState(null);
  const [executionHistory, setExecutionHistory] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchExecutionHistory();
    fetchOrder();
  }, [id]);


  const fetchOrder = async () => {
    if (id) {
      const fetchedOrder = await getOrderById(id);
      setOrder(fetchedOrder);
    }
  };

  const fetchExecutionHistory = async () => {
    if (id) {
      const history = await getOrderExecutionHistory(id);
      setExecutionHistory(history);
    }
  };

  const generatePDF = () => {
    if (!template) {
      console.error('Template is not loaded yet.');
      return;
    }
  
    const clientData = order.client.sign === false ?
      `${order.client.initials}\n${order.client.phone}\n${order.client.address}` :
      `${order.client.name}\n${order.client.unp}\n${order.client.email}\n${order.client.phone}`;

    const inputs = [{
      clientData: clientData
    }];
    const plugins = { text, image, readOnlyText, readOnlySvg, Table: tableBeta, line  };
    generate({ template, inputs, plugins}).then((pdf) => {
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
    <div className='ml-20'>
      {order ? (
        <>
          <div className='ml-5'>
            <Button className="mb-4" onClick={() => setOpen(true)}>Изменить статус заказа</Button>
            <Button className="mb-4" onClick={generatePDF}>Печатать</Button>
          </div>
          <div className="flex justify-between">
            <div className="md:w-[100%] px-4">
              <Card>
                <CardHeader>
                  <p className="text-2xl font-semibold text-center">
                    Информация
                  </p>
                </CardHeader>
                <CardContent>
                <div className="flex justify-between">
                  <div className="md:w-[50%] px-4">
                      <p className="text-2xl font-semibold text-left mb-4">
                        Заказ
                      </p>
                      <div>
                        <Label htmlFor="orderCreatedAt">Дата создания заказа: {new Date(order.createdAt).toLocaleDateString()}</Label>
                        <Separator className="my-2" />
                      </div>
                      <div>
                        <Label htmlFor="orderLeadTime">Предварительная дата выполнения заказа: {new Date(order.leadTime).toLocaleDateString()}</Label>
                        <Separator className="my-2" />
                      </div>
                      <div>
                        <Label htmlFor="orderService">Услуга: {order.service.name}</Label>
                        <Separator className="my-2" />
                      </div>
                      <div>
                        <Label htmlFor="orderService">Принял заказ: {order.user.name}</Label>
                        <Separator className="my-2" />
                      </div>
                      <div>
                        <Label htmlFor="orderComments">Комментарии к заказу:</Label>
                        <Textarea value={order.comments} className="resize-none" readOnly />
                      </div>
                  </div>
                  <div className="md:w-[50%] px-4">
                    <p className="text-2xl font-semibold text-left mb-4">
                        Клиент
                      </p>
                    {order.client.sign === false ? (
                        <>
                        
                          <div>
                            <Label htmlFor="initials">ФИО: {order.client.initials}</Label>
                            <Separator className="my-2" />
                          </div>
                          <div>
                            <Label htmlFor="email">Email: {order.client.email}</Label>
                            <Separator className="my-2" />
                          </div>
                          <div>
                            <Label htmlFor="phone">Телефон: {order.client.phone}</Label>
                            <Separator className="my-2" />
                          </div>
                          
                        </>
                      ) : (
                        <>
                          <div>
                            <Label htmlFor="name">Название компании: {order.client.name}</Label>
                            <Separator className="my-2" />
                          </div>
                          <div>
                            <Label htmlFor="name">УНП: {order.client.unp}</Label>
                            <Separator className="my-2" />
                          </div>
                          <div>
                            <Label htmlFor="email">Почта: {order.client.email}</Label>
                            <Separator className="my-2" />
                          </div>
                          <div>
                            <Label htmlFor="phone">Телефон: {order.client.phone}</Label>
                            <Separator className="my-2" />
                          </div>
                        </>
                      )}
                  </div>
                </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex-grow md:w-1/4">
              <Card>
                <CardHeader>
                  <p className="text-2xl font-semibold flex items-center text-left">
                    История <History className="ml-2" />
                  </p>
                </CardHeader>
                <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md">
                  {executionHistory.map((execution) => (
                    <div key={execution.id}>
                      <p>
                        {execution.name !== "Заказ добавлен" && execution.name !== "Заказ обновлен" ? (
                          <>
                            <span className="text-500">{execution.name} </span>
                            <Tag color={execution.stage.color}>{execution.stage.name}</Tag>
                          </>
                        ) : (
                          execution.name === "Заказ обновлен" ? (
                            <span className="text-green-500">Информация о заказе была обновлена</span>
                          ) : (
                            <Tag color={execution.stage.color}>{execution.stage.name}</Tag>
                          )
                        )}
                      </p>
                      <p className="text-gray-800 text-sm">{formatDate(execution.executionDate)} <span className="text-gray-400">{execution.user.name}</span></p>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <SkeletonCard/>
      )}
      <DialogModalChangeStages open={open} onOpenChange={setOpen} orderId={id} />
    </div>
  );
}
