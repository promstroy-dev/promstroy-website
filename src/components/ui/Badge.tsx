interface Props {
  label: string;
}

export default function Badge({ label }: Props) {
  return (
    <span
      className="inline-block text-[10px] font-semibold px-2.5 py-1 uppercase"
      style={{
        background: "rgba(8,14,22,0.80)",
        color: "#94B4C1",
        letterSpacing: "0.18em",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(84,119,146,0.30)",
      }}
    >
      {label}
    </span>
  );
}
