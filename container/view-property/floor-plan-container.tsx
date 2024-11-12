import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FloorPlan {
  id: number;
  imageUrl: string;
  floor_name: string;
  order: number;
  intro: string;
  createdAt: Date;
  listingId: number;
}

interface FloorPlanTabsProps {
  property: FloorPlan[];
}

export function FloorPlanTabs({ property }: FloorPlanTabsProps) {
  return (
    <Tabs defaultValue={`tab-${property[0]?.id}`} className="w-full mt-3 bg-gray-50
    px-2 py-2">
      {/* Tabs List - Floor Names as Tabs */}
      <TabsList className="grid w-fit grid-cols-3 gap-4 bg-transparent">
        {property
          .sort((a, b) => a.order - b.order) // Sorting the floor plans based on order
          .map((floor) => (
            <TabsTrigger
              key={floor.id}
              value={`tab-${floor.id}`}
              className="cursor-pointer py-2 px-4 bg-transparent"
            >
              {floor.floor_name}
            </TabsTrigger>
          ))}
      </TabsList>

      {/* Tabs Content */}
      {property
        .sort((a, b) => a.order - b.order) // Sorting the floor plans based on order
        .map((floor) => (
          <TabsContent key={floor.id} value={`tab-${floor.id}`} className="">
            <div>
              {/* <h2>{floor.intro}</h2> */}
              <div className="">
                <img
                  src={floor.imageUrl}
                  alt={`${floor.floor_name} Plan`}
                  className="w-full max-w-xl"
                />
              </div>
            </div>
          </TabsContent>
        ))}
    </Tabs>
  );
}
