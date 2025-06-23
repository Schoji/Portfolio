export default function CustomBadge({ content }: { content: string }) {
  return (
    <p className="pl-2 pr-2 pb-1 pt-1 text-base-300 text-xs font-bold border-gray-400 border-1 rounded-2xl">
      {content}
    </p>
  );
}
