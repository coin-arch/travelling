export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="relative">
        {/* Outer Ring */}
        <div className="h-24 w-24 rounded-full border-4 border-slate-100 animate-pulse" />
        {/* Inner Spinning Ring */}
        <div className="absolute inset-0 h-24 w-24 rounded-full border-t-4 border-accent animate-spin" />
        {/* Logo/Icon in Center */}
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-primary font-black tracking-tighter italic text-xs">KHOJII</span>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-xl font-black tracking-tighter text-primary animate-bounce">Finding your next adventure...</h3>
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-2">Connecting to amazing experiences in India</p>
      </div>
    </div>
  );
}
