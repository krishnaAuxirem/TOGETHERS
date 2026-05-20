export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full skeleton" />
        <div className="flex-1 space-y-2">
          <div className="h-4 skeleton rounded-lg w-3/4" />
          <div className="h-3 skeleton rounded-lg w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 skeleton rounded-lg" />
        <div className="h-4 skeleton rounded-lg w-5/6" />
        <div className="h-4 skeleton rounded-lg w-4/6" />
      </div>
      <div className="flex gap-3">
        <div className="h-8 skeleton rounded-lg flex-1" />
        <div className="h-8 skeleton rounded-lg flex-1" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
          <div className="w-10 h-10 rounded-full skeleton flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 skeleton rounded-lg w-3/4" />
            <div className="h-3 skeleton rounded-lg w-1/2" />
          </div>
          <div className="h-8 w-20 skeleton rounded-lg" />
        </div>
      ))}
    </div>
  );
}
