"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

export function ListFilter() {
  const t = useTranslations("report.agent");
  const [agentId, setAgentId] = useQueryState("agentId");
  const [gameId, setGameId] = useQueryState<string[]>("gameId", {
    defaultValue: [],
    parse: (value) => value.split(",").filter(Boolean),
    serialize: (value) => value.join(","),
  });

  const gameTypeOptions = [
    { id: "baccarat", label: "百家乐" },
    { id: "guandan", label: "掼蛋" },
  ];

  const handleGameTypeChange = (gameType: string, checked: boolean) => {
    const currentTypes = gameId || [];
    if (checked) {
      setGameId([...currentTypes, gameType].filter(Boolean));
    } else {
      setGameId(currentTypes.filter((type) => type !== gameType));
    }
  };

  const handleReset = () => {
    setAgentId("");
    setGameId([]);
  };

  const isGameTypeSelected = (gameType: string) => {
    return (gameId || []).includes(gameType);
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* First row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label>结算日期</Label>
          <DateRangeFilter enableTimeSelect />
        </div>
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">{t("agentID")}</Label>
          <Input
            value={agentId ?? ""}
            onChange={(e) => setAgentId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>

      {/* Second row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">游戏类型</Label>
          {gameTypeOptions.map((game) => (
            <div key={game.id} className="flex items-center space-x-2">
              <Checkbox
                id={game.id}
                checked={isGameTypeSelected(game.id)}
                onCheckedChange={(checked) =>
                  handleGameTypeChange(game.id, checked as boolean)
                }
              />
              <label
                htmlFor={game.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {game.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Last row */}
      <div className="flex gap-4 justify-end items-center">
        <div className="flex gap-2 items-center">
          <Button
            className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            onClick={handleReset}
          >
            {t("reset")}
          </Button>
          <Button>{t("search")}</Button>
        </div>
      </div>
    </div>
  );
}
