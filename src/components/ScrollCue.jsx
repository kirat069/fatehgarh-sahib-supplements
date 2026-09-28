import React from "react";

export default function ScrollCue() {
  return (
    <div
      id="scrollcue"
      className="fixed left-7 bottom-[calc(1.75rem+env(safe-area-inset-bottom,0px))] z-[5] font-mono text-[0.72rem] tracking-[0.08em] text-muted flex items-center gap-[0.6rem] pointer-events-none"
    >
      <span className="w-[22px] h-px bg-muted" />
      <span>scroll</span>
    </div>
  );
}
