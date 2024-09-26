"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronRight,
  GamepadIcon,
  RotateCwIcon,
  UsersIcon,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

interface Player {
  id: string;
  score: number;
  rank: number;
}

interface Round {
  id: string;
  basebet: number;
  bombCount: number;
  maxBet: number;
  tribute: number;
  startTime: string;
  endTime: string;
  players: Player[];
}

interface Game {
  id: string;
  startTime: string;
  clubId: string;
  roomId: string;
  level: number;
  amount: number;
  endTime: string;
  rounds: Round[];
}

interface ExpandedRows {
  [key: string]: boolean;
}

const HierarchicalTable: React.FC<{ data: Game[] }> = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState<ExpandedRows>({});

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderGameRow = (game: Game) => (
    <Card className="mb-4 overflow-hidden" key={game.id}>
      <CardContent className="p-0">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleRow(game.id)}
            >
              {expandedRows[game.id] ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </Button>
            <GamepadIcon size={20} />
            <span className="font-semibold">局号: {game.id}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline">级数: {game.level}</Badge>
            <Badge variant={game.amount >= 0 ? "default" : "destructive"}>
              输赢: {game.amount}
            </Badge>
          </div>
        </div>
        <Separator />
        <div className="p-4 grid grid-cols-2 gap-4 text-sm">
          <div>开始时间: {game.startTime}</div>
          <div>结束时间: {game.endTime}</div>
          <div>俱乐部ID: {game.clubId}</div>
          <div>房间ID: {game.roomId}</div>
        </div>
        {expandedRows[game.id] && renderRounds(game.rounds)}
      </CardContent>
    </Card>
  );

  const renderRounds = (rounds: Round[]) => (
    <div className="pl-8 pr-4 pb-4 space-y-4">
      {rounds.map((round) => (
        <Card key={round.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-blue-50 dark:bg-blue-900 p-3 flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleRow(round.id)}
                className="mr-2"
              >
                {expandedRows[round.id] ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </Button>
              <div className="flex items-center space-x-3">
                <RotateCwIcon size={16} />
                <span className="font-medium">轮次ID: {round.id}</span>
              </div>
            </div>
            <Separator />
            <div className="p-3 grid grid-cols-2 gap-3 text-sm">
              <div>基础下注: {round.basebet}</div>
              <div>最大下注: {round.maxBet}</div>
              <div>炸弹数: {round.bombCount}</div>
              <div>进贡: {round.tribute}</div>
              <div>开始时间: {round.startTime}</div>
              <div>结束时间: {round.endTime}</div>
            </div>
            {expandedRows[round.id] && renderPlayers(round.players)}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderPlayers = (players: Player[]) => (
    <div className="pl-6 pr-2 pb-3 space-y-2">
      {players.map((player) => (
        <Card key={player.id} className="bg-green-50 dark:bg-green-900">
          <CardContent className="p-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UsersIcon size={14} />
              <span>玩家ID: {player.id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">得分: {player.score}</Badge>
              <Badge variant="outline">排名: {player.rank}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">{data.map((game) => renderGameRow(game))}</div>
  );
};

export default HierarchicalTable;
