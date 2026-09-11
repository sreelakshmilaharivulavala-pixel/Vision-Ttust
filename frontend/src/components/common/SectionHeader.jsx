export default function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-300">{eyebrow}</p>
        <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>
      </div>
      {action}
    </div>
  );
}
