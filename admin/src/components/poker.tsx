export function Poker({ poker, suffix }: { poker: string; suffix?: string }) {
  const suitMap: Record<string, { symbol: string; color: string }> = {
    H: { symbol: "♥", color: "text-destructive" }, // Hearts
    D: { symbol: "♦", color: "text-destructive" }, // Diamonds
    C: { symbol: "♣", color: "text-foreground" }, // Clubs
    S: { symbol: "♠", color: "text-foreground" }, // Spades
    X: { symbol: "小王", color: "text-foreground" },
    Y: { symbol: "大王", color: "text-destructive" },
  };
  const cardMap: { [key: string]: string } = {
    "1": "A",
    "11": "J",
    "12": "Q",
    "13": "K",
    "14": " ",
  };
  const suit = poker[0];
  const card = poker.slice(1);
  const suitInfo = suitMap[suit];
  const cardInfo = cardMap[card] || card;
  return (
    <>
      <span className={suitInfo.color}>{suitInfo.symbol}</span>
      <span>
        {cardInfo}
        {suffix}
      </span>
    </>
  );
}
