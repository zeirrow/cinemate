export default function HeroSkeleton() {
  return (
    <div className="relative w-full h-[90vh] bg-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 h-full flex flex-col justify-end pb-16">
        <div className="max-w-2xl">
          <div className="h-12 w-3/4 bg-gray-600 rounded mb-6 animate-pulse" />
          <div className="space-y-3 mb-8">
            <div className="h-4 w-full bg-gray-600 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-600 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-600 rounded animate-pulse" />
          </div>
          <div className="flex gap-3">
            <div className="h-12 w-32 bg-gray-600 rounded animate-pulse" />
            <div className="h-12 w-32 bg-gray-600 rounded animate-pulse" />
            <div className="h-12 w-32 bg-gray-600 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}