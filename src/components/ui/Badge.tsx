interface Props {
  label: string;
}

export default function Badge({ label }: Props) {
  return (
    <span
      className="inline-block text-[10px] font-semibold px-2.5 py-1 uppercase"
      style={{
        background: "rgba(9,10,12,0.75)",
        color: "#C09A5C",
        letterSpacing: "0.18em",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(192,154,92,0.25)",
      }}
    >
      {label}
    </span>
  );
}
