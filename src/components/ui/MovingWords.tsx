import { additionalTraining } from "@/data/site-content";
import { Tag } from "@/components/ui/Tag";

export function MovingWords({ onDark = false }: { onDark?: boolean }) {
  const first = additionalTraining.items.slice(0, 5);
  const second = additionalTraining.items.slice(4);

  return (
    <div className="space-y-3">
      <MarqueeRow items={first} onDark={onDark} />
      <MarqueeRow items={second} reverse onDark={onDark} />
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  onDark = false,
}: {
  items: readonly string[];
  reverse?: boolean;
  onDark?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div className="marquee-row relative overflow-hidden">
      <div
        className={
          reverse
            ? "marquee-track-reverse flex w-max gap-3"
            : "marquee-track flex w-max gap-3"
        }
      >
        {loop.map((item, index) => (
          <Tag
            key={`${item}-${index}`}
            className={
              onDark
                ? "border-bg/20 bg-bg/12 text-bg"
                : "bg-bg"
            }
          >
            {item}
          </Tag>
        ))}
      </div>
    </div>
  );
}
