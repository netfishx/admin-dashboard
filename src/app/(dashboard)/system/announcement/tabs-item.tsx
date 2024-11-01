"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TabsItem({
  tabsContent,
}: {
  tabsContent: { label: string; value: string }[];
}) {
  const pathname = usePathname();

  const tabValue = () => {
    const lastPath = pathname.split("/").pop();
    return lastPath !== "announcement" ? lastPath : tabsContent[0].value;
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="p-2 bg-background gap-2">
        <Tabs value={tabValue()}>
          <TabsList>
            {tabsContent.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                <Link href={`/system/announcement/${tab.value}`}>
                  {tab.label}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
