import { Template } from "@pdfme/common";

export const  certificate_of_Completion: Template = {
  "schemas": [
    {
      "head copy": {
        "type": "readOnlyText",
        "position": {
          "x": 6.31,
          "y": 9.88
        },
        "content": "Акт выполненных работ",
        "width": 110.08,
        "height": 11.3,
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
      "text-garant": {
        "type": "readOnlyText",
        "position": {
          "x": 5.4,
          "y": 173.83
        },
        "content": "Условия гарантийного обслуживания: \n1. Гарантийный срок составляет 6 месяцев с момента выполнения работ. \n2. В случае обнаружения недостатков, попадающих под гарантийные условия, Заказчик обязан незамедлительно уведомить Исполнителя путем предоставления письменной заявки.\n3. Исполнитель обязуется бесплатно устранить выявленные недостатки в согласованные сроки.\nПретензии по работе:\n\nНастоящий акт приема-сдачи выполненных работ составлен в двух экземплярах, имеющих одинаковую юридическую силу, по одному экземпляру для каждой из Сторон.",
        "width": 196.33,
        "height": 58,
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
          "x": 5.52,
          "y": 224.3
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
          "x": 32.52,
          "y": 231.61
        },
        "width": 50,
        "height": 0.5,
        "rotate": 0,
        "opacity": 1,
        "readOnly": true,
        "color": "#000000"
      },
      "client": {
        "type": "readOnlyText",
        "position": {
          "x": 121.01,
          "y": 224.77
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
          "x": 141.58,
          "y": 231.61
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
          "x": 4.54,
          "y": 29.22
        },
        "width": 196.19,
        "height": 56.3432,
        "content": "[[\"Eggshell Camisole Top\",\"12323\",\"Row 1\",\"Row 1\"],[\"{stage.name}\",\"231\",\"Row 2\",\"Row 2\"]]",
        "showHead": true,
        "head": [
          "Клиент",
          "Услуга",
          "Дата обращения",
          "Предварительная дата выполнения"
        ],
        "headWidthPercentages": [25.4163383953596, 21.6217885237806, 27.4501023541454, 25.5117707267144],
        "tableStyles": {
          "borderWidth": 0,
          "borderColor": "#000000"
        },
        "headStyles": {
          "fontSize": 15,
          "characterSpacing": 0,
          "alignment": "left",
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
      },
      "head copy 2": {
        "type": "readOnlyText",
        "position": {
          "x": 118.35,
          "y": 5.34
        },
        "content": "ООО \"Метр Заславль\"\nул. Дзержинская 26",
        "width": 82.3,
        "height": 22.68,
        "rotate": 0,
        "alignment": "right",
        "verticalAlignment": "middle",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "head copy 3": {
        "type": "readOnlyText",
        "position": {
          "x": 8.63,
          "y": 21.22
        },
        "content": "Заказ от ",
        "width": 27,
        "height": 7.59,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "middle",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "createdAt": {
        "type": "text",
        "position": {
          "x": 29.22,
          "y": 21.43
        },
        "icon": "\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"\u003E\u003Cpath d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/\u003E\u003Cpath d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/\u003E\u003Cpath d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/\u003E\u003Cpath d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/\u003E\u003Cpath d=\"M9 7v10\"/\u003E\u003C/svg\u003E",
        "content": "05.05.2024",
        "width": 45,
        "height": 7.62,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "top",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1
      },
      "serviceData": {
        "type": "table",
        "position": {
          "x": 3.49,
          "y": 101.66
        },
        "width": 196.19,
        "height": 46.4648,
        "content": "[[\"Eggshell Camisole Top\",\"Row 1\"],[\"{stage.name}\",\"Row 2\"]]",
        "showHead": true,
        "head": [
          "Услуга",
          "Цена"
        ],
        "headWidthPercentages": [49.9063068185724, 50.0936931814277],
        "tableStyles": {
          "borderWidth": 0,
          "borderColor": "#000000"
        },
        "headStyles": {
          "fontSize": 15,
          "characterSpacing": 0,
          "alignment": "left",
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
      },
      "field9 copy 3": {
        "type": "line",
        "icon": "\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-minus\"\u003E\u003Cpath d=\"M5 12h14\"/\u003E\u003C/svg\u003E",
        "position": {
          "x": 6.52,
          "y": 205.29
        },
        "width": 139.16,
        "height": 0.5,
        "rotate": 0,
        "opacity": 1,
        "readOnly": true,
        "color": "#000000"
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





  export const  collection_slip: Template = {
    "schemas": [
      {
        "head copy": {
          "type": "readOnlyText",
          "position": {
            "x": 6.31,
            "y": 9.88
          },
          "content": "Приемная квитанция",
          "width": 110.08,
          "height": 11.3,
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
        "text-garant": {
          "type": "readOnlyText",
          "position": {
            "x": 5.4,
            "y": 86.57
          },
          "content": "Условия оказания услуг:\n1. Заказчик соглашается на получение услуг, описанных в заявке или договоре, в соответствии с установленными стандартами и требованиями.\n2. Услуги будут оказаны в соответствии с согласованными сроками и графиком работы. Любые изменения в графике должны быть согласованы сторонами заблаговременно.\n\n3. Стоимость услуг указана в заявке или договоре. Оплата производится в соответствии с условиями, указанными в счете или договоре. Заказчик обязуется оплатить услуги в указанные сроки.\n\n4. Исполнитель несет ответственность за качество и своевременность оказания услуг в соответствии с согласованными условиями. Заказчик обязуется предоставить необходимую информацию и доступ к необходимым ресурсам для выполнения услуг.\n\n5 . В случае выявления недостатков или несоответствия услуг указанным требованиям, Заказчик имеет право на гарантийное обслуживание или рекламацию в соответствии с условиями договора.",
          "width": 196.33,
          "height": 83.23,
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
            "x": 5.52,
            "y": 171.38
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
            "x": 32.52,
            "y": 178.69
          },
          "width": 50,
          "height": 0.5,
          "rotate": 0,
          "opacity": 1,
          "readOnly": true,
          "color": "#000000"
        },
        "client": {
          "type": "readOnlyText",
          "position": {
            "x": 121.01,
            "y": 171.85
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
            "x": 141.58,
            "y": 178.69
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
            "x": 4.54,
            "y": 29.22
          },
          "width": 196.19,
          "height": 56.3432,
          "content": "[[\"Eggshell Camisole Top\",\"12323\",\"Row 1\",\"Row 1\"],[\"{stage.name}\",\"231\",\"Row 2\",\"Row 2\"]]",
          "showHead": true,
          "head": [
            "Клиент",
            "Услуга",
            "Дата обращения",
            "Предварительная дата выполнения"
          ],
          "headWidthPercentages": [25.4163383953596, 21.6217885237806, 27.4501023541454, 25.5117707267144],
          "tableStyles": {
            "borderWidth": 0,
            "borderColor": "#000000"
          },
          "headStyles": {
            "fontSize": 15,
            "characterSpacing": 0,
            "alignment": "left",
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
        },
        "head copy 2": {
          "type": "readOnlyText",
          "position": {
            "x": 118.35,
            "y": 5.34
          },
          "content": "ООО \"Метр Заславль\"\nул. Дзержинская 26",
          "width": 82.3,
          "height": 22.68,
          "rotate": 0,
          "alignment": "right",
          "verticalAlignment": "middle",
          "fontSize": 13,
          "lineHeight": 1,
          "characterSpacing": 0,
          "fontColor": "#000000",
          "backgroundColor": "",
          "opacity": 1,
          "readOnly": true,
        },
        "head copy 3": {
          "type": "readOnlyText",
          "position": {
            "x": 8.63,
            "y": 21.22
          },
          "content": "Заказ от ",
          "width": 27,
          "height": 7.59,
          "rotate": 0,
          "alignment": "left",
          "verticalAlignment": "middle",
          "fontSize": 13,
          "lineHeight": 1,
          "characterSpacing": 0,
          "fontColor": "#000000",
          "backgroundColor": "",
          "opacity": 1,
          "readOnly": true,
        },
        "createdAt": {
          "type": "text",
          "position": {
            "x": 29.22,
            "y": 22.43
          },
          "icon": "\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"\u003E\u003Cpath d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/\u003E\u003Cpath d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/\u003E\u003Cpath d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/\u003E\u003Cpath d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/\u003E\u003Cpath d=\"M9 7v10\"/\u003E\u003C/svg\u003E",
          "content": "05.05.2024",
          "width": 45,
          "height": 7.62,
          "rotate": 0,
          "alignment": "left",
          "verticalAlignment": "top",
          "fontSize": 13,
          "lineHeight": 1,
          "characterSpacing": 0,
          "fontColor": "#000000",
          "backgroundColor": "",
          "opacity": 1
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



export const  guarantee_card: Template = {
  "schemas": [
    {
      "head copy": {
        "type": "readOnlyText",
        "position": {
          "x": 6.31,
          "y": 9.88
        },
        "content": "Гарантийный талон",
        "width": 110.08,
        "height": 11.3,
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
      "text-garant": {
        "type": "readOnlyText",
        "position": {
          "x": 5.67,
          "y": 173.83
        },
        "content": "Условия гарантийного обслуживания: \n1. Гарантийный срок составляет 6 месяцев с момента выполнения работ. \n2. В случае обнаружения недостатков, попадающих под гарантийные условия, Заказчик обязан незамедлительно уведомить Исполнителя путем предоставления письменной заявки.\n3. Исполнитель обязуется бесплатно устранить выявленные недостатки в согласованные сроки.\n",
        "width": 196.33,
        "height": 45.04,
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
          "x": 4.99,
          "y": 213.72
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
          "x": 31.99,
          "y": 221.03
        },
        "width": 50,
        "height": 0.5,
        "rotate": 0,
        "opacity": 1,
        "readOnly": true,
        "color": "#000000"
      },
      "client": {
        "type": "readOnlyText",
        "position": {
          "x": 120.48,
          "y": 214.19
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
          "x": 141.05,
          "y": 221.03
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
          "x": 4.54,
          "y": 29.22
        },
        "width": 196.19,
        "height": 56.3432,
        "content": "[[\"Eggshell Camisole Top\",\"12323\",\"Row 1\",\"Row 1\"],[\"{stage.name}\",\"231\",\"Row 2\",\"Row 2\"]]",
        "showHead": true,
        "head": [
          "Клиент",
          "Услуга",
          "Дата обращения",
          "Предварительная дата выполнения"
        ],
        "headWidthPercentages": [25.4163383953596, 21.6217885237806, 27.4501023541454, 25.5117707267144],
        "tableStyles": {
          "borderWidth": 0,
          "borderColor": "#000000"
        },
        "headStyles": {
          "fontSize": 15,
          "characterSpacing": 0,
          "alignment": "left",
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
      },
      "head copy 2": {
        "type": "readOnlyText",
        "position": {
          "x": 118.35,
          "y": 5.34
        },
        "content": "ООО \"Метр Заславль\"\nул. Дзержинская 26",
        "width": 82.3,
        "height": 22.68,
        "rotate": 0,
        "alignment": "right",
        "verticalAlignment": "middle",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "head copy 3": {
        "type": "readOnlyText",
        "position": {
          "x": 8.63,
          "y": 21.22
        },
        "content": "Заказ от ",
        "width": 27,
        "height": 7.59,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "middle",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "createdAt": {
        "type": "text",
        "position": {
          "x": 29.22,
          "y": 22.43
        },
        "icon": "\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"\u003E\u003Cpath d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/\u003E\u003Cpath d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/\u003E\u003Cpath d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/\u003E\u003Cpath d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/\u003E\u003Cpath d=\"M9 7v10\"/\u003E\u003C/svg\u003E",
        "content": "05.05.2024",
        "width": 45,
        "height": 7.62,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "top",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1
      },
      "serviceData": {
        "type": "table",
        "position": {
          "x": 3.49,
          "y": 98.75
        },
        "width": 197.51,
        "height": 46.4648,
        "content": "[[\"Eggshell Camisole Top\",\"Row 1\"],[\"{stage.name}\",\"Row 2\"]]",
        "showHead": true,
        "head": [
          "Услуга",
          "Цена"
        ],
        "headWidthPercentages": [49.9063068185724, 50.0936931814277],
        "tableStyles": {
          "borderWidth": 0,
          "borderColor": "#000000"
        },
        "headStyles": {
          "fontSize": 15,
          "characterSpacing": 0,
          "alignment": "left",
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
      },
      "head copy 4": {
        "type": "readOnlyText",
        "position": {
          "x": 5.67,
          "y": 204.26
        },
        "content": "Дата:",
        "width": 27,
        "height": 7.59,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "middle",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "createdAtCopy": {
        "type": "text",
        "position": {
          "x": 21.23,
          "y": 205.47
        },
        "icon": "\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"\u003E\u003Cpath d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/\u003E\u003Cpath d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/\u003E\u003Cpath d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/\u003E\u003Cpath d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/\u003E\u003Cpath d=\"M9 7v10\"/\u003E\u003C/svg\u003E",
        "content": "05.05.2024",
        "width": 45,
        "height": 7.62,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "top",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
      }
    }
  ],
  "basePdf": {
    "width": 210,
    "height": 297,
    "padding": [0, 0, 0, 0]
  }
}



export const  sales_receipt: Template = {
  "schemas": [
    {
      "head copy": {
        "type": "readOnlyText",
        "position": {
          "x": 6.31,
          "y": 9.88
        },
        "content": "Товарный чек",
        "width": 110.08,
        "height": 11.3,
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
      "menager": {
        "type": "readOnlyText",
        "position": {
          "x": 5.52,
          "y": 81.16
        },
        "content": "Продавец: ",
        "width": 77.81,
        "height": 13.91,
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
          "x": 32.52,
          "y": 88.47
        },
        "width": 50,
        "height": 0.23,
        "rotate": 0,
        "opacity": 1,
        "readOnly": true,
        "color": "#000000"
      },
      "head copy 2": {
        "type": "readOnlyText",
        "position": {
          "x": 118.35,
          "y": 5.34
        },
        "content": "ООО \"Метр Заславль\"\nул. Дзержинская 26",
        "width": 82.3,
        "height": 22.68,
        "rotate": 0,
        "alignment": "right",
        "verticalAlignment": "middle",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "head copy 3": {
        "type": "readOnlyText",
        "position": {
          "x": 8.63,
          "y": 21.22
        },
        "content": "Продажа от ",
        "width": 30.17,
        "height": 7.59,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "middle",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "createdAt": {
        "type": "text",
        "position": {
          "x": 35.48,
          "y": 22.7
        },
        "icon": "\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"\u003E\u003Cpath d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/\u003E\u003Cpath d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/\u003E\u003Cpath d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/\u003E\u003Cpath d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/\u003E\u003Cpath d=\"M9 7v10\"/\u003E\u003C/svg\u003E",
        "content": "05.05.2024",
        "width": 45,
        "height": 7.62,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "top",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1
      },
      "serviceData": {
        "type": "table",
        "position": {
          "x": 4.55,
          "y": 31.55
        },
        "width": 197.51,
        "height": 44.7008,
        "content": "[[\"Eggshell Camisole Top\",\"Row 1\"],[\"{stage.name}\",\"Row 2\"]]",
        "showHead": true,
        "head": [
          "Услуга",
          "Цена"
        ],
        "headWidthPercentages": [49.9063068185724, 50.0936931814277],
        "tableStyles": {
          "borderWidth": 0,
          "borderColor": "#000000"
        },
        "headStyles": {
          "fontSize": 12,
          "characterSpacing": 0,
          "alignment": "left",
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
          "fontSize": 12,
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
      },
      "head copy 4": {
        "type": "readOnlyText",
        "position": {
          "x": 6.2,
          "y": 91.55
        },
        "content": "Дата:",
        "width": 27,
        "height": 7.59,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "middle",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "createdAtCopy": {
        "type": "text",
        "position": {
          "x": 21.76,
          "y": 92.76
        },
        "icon": "\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"\u003E\u003Cpath d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/\u003E\u003Cpath d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/\u003E\u003Cpath d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/\u003E\u003Cpath d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/\u003E\u003Cpath d=\"M9 7v10\"/\u003E\u003C/svg\u003E",
        "content": "05.05.2024",
        "width": 45,
        "height": 7.62,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "top",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
      },
      "clientData": {
        "type": "text",
        "position": {
          "x": 84.68,
          "y": 82
        },
        "icon": "\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"\u003E\u003Cpath d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/\u003E\u003Cpath d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/\u003E\u003Cpath d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/\u003E\u003Cpath d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/\u003E\u003Cpath d=\"M9 7v10\"/\u003E\u003C/svg\u003E",
        "content": "И И Иванов",
        "width": 79.65,
        "height": 7.62,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "top",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
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



export const  report_by_employee: Template = {
  "schemas": [
    {
      "head copy": {
        "type": "readOnlyText",
        "position": {
          "x": 0,
          "y": 6.71
        },
        "content": "Отчет",
        "width": 210,
        "height": 11.3,
        "rotate": 0,
        "alignment": "center",
        "verticalAlignment": "middle",
        "fontSize": 24,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "head copy 3": {
        "type": "readOnlyText",
        "position": {
          "x": 54.94,
          "y": 17.52
        },
        "content": "о проделанной работе за",
        "width": 61.39,
        "height": 7.59,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "middle",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
        "readOnly": true,
      },
      "serviceData": {
        "type": "table",
        "position": {
          "x": 5.88,
          "y": 33.4
        },
        "width": 197.51,
        "height": 44.7008,
        "content": "[[\"Eggshell Camisole Top\",\"Row 1\",\"Row 1\"],[\"123\",\"Row 2\",\"Row 2\"]]",
        "showHead": true,
        "head": [
          "Дата заказа",
          "Услуга",
          "Сотрудник"
        ],
        "headWidthPercentages": [37.4297301139293, 37.5702698860707, 25],
        "tableStyles": {
          "borderWidth": 0,
          "borderColor": "#000000"
        },
        "headStyles": {
          "fontSize": 12,
          "characterSpacing": 0,
          "alignment": "left",
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
          "fontSize": 12,
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
      },
      "period": {
        "type": "text",
        "position": {
          "x": 115.64,
          "y": 18.15
        },
        "icon": "\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"\u003E\u003Cpath d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/\u003E\u003Cpath d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/\u003E\u003Cpath d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/\u003E\u003Cpath d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/\u003E\u003Cpath d=\"M9 7v10\"/\u003E\u003C/svg\u003E",
        "content": "05.05.2024",
        "width": 45,
        "height": 7.62,
        "rotate": 0,
        "alignment": "left",
        "verticalAlignment": "top",
        "fontSize": 13,
        "lineHeight": 1,
        "characterSpacing": 0,
        "fontColor": "#000000",
        "backgroundColor": "",
        "opacity": 1,
      }
    }
  ],
  "basePdf": {
    "width": 210,
    "height": 297,
    "padding": [0, 0, 0, 0]
  }
}