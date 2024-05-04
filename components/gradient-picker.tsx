'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent} from '@/components/ui/tabs';
import { cn } from "@/lib/utils";
import { Paintbrush } from 'lucide-react';
import { useMemo, useState } from 'react';

export function PickerExample() {
  const [background, setBackground] = useState('#B4D455');

  return (
    <div
      className="w-full h-full preview flex min-h-[350px] justify-center p-10 items-center rounded !bg-cover !bg-center transition-all"
      style={{ background }}
    >
      <GradientPicker background={background} setBackground={setBackground} />
    </div>
  );
}

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
}) {
  const solids = [
    '#E2E2E2',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
    '#f78fb3',
    '#3e64ff',
    '#fcb045',
    '#8e9eab',
    '#12c2e9',
    '#c471ed',
    '#f64f59',
    '#3a1c71',
    '#f8b500',
    '#29b6f6',
    '#00d084',
    '#ff3e75',
  ];

  const defaultTab = useMemo(() => {
    return 'solid';
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[220px] justify-start text-left font-normal',
            !background && 'text-muted-foreground',
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {background ? background : 'Pick a color'}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue={defaultTab} className="w-full">

          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>
        </Tabs>

        <Input
            id="custom"
            value={background || ''}
            className="col-span-2 h-8 mt-4"
            onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}
