import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-x-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      </div>
      <div className="flex flex-wrap space-x-3">
        <Skeleton className="h-4 w-[119px]" />
        <Skeleton className="h-4 w-[119px]" />
        <Skeleton className="h-4 w-[118px]" />
        <Skeleton className="h-4 w-[118px]" />
      </div>
    </div>
  );
}


