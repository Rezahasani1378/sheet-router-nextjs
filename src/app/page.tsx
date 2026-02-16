"use client";

import { useMemo } from "react";
import {
  SheetRouter,
  SheetRoute,
  useSheetNavigate,
} from "@rezahasani78/sheet-router";
import "@rezahasani78/sheet-router/styles.css";
import { createReduxStorageProvider } from "@/store/sheet-storage-provider";

export default function Home() {
  const storageProvider = useMemo(() => createReduxStorageProvider(), []);

  return (
    <SheetRouter storageProvider={storageProvider}>
      <MainPage />
      <SheetRoute path="sheet-a" component={SheetA} title="Sheet A" height="50%" />
      <SheetRoute path="sheet-b" component={SheetB} title="Sheet B" height="80%" />
      <SheetRoute path="sheet-c" component={SheetC} title="Sheet C" />
    </SheetRouter>
  );
}

function MainPage() {
  const { open } = useSheetNavigate();

  return (
    <main className="flex flex-col items-center justify-center min-h-dvh p-6 gap-8 bg-slate-50">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">Sheet Router</h1>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">
          PWA with stacked bottom sheets, back-button support & configurable height.
        </p>
      </div>

      <div className="w-full max-w-xs space-y-3">
        <button
          onClick={() => open("sheet-a")}
          className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm cursor-pointer hover:bg-slate-800 transition-colors"
        >
          Sheet A &mdash; 50% height
        </button>
        <button
          onClick={() => open("sheet-b")}
          className="w-full py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm cursor-pointer hover:bg-indigo-500 transition-colors"
        >
          Sheet B &mdash; 80% height
        </button>
        <button
          onClick={() => open("sheet-c")}
          className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm cursor-pointer hover:bg-emerald-500 transition-colors"
        >
          Sheet C &mdash; full screen
        </button>
      </div>

      <p className="text-xs text-slate-300 max-w-xs text-center">
        Try opening sheets, stacking them, then use the browser back button to unwind. Refresh the page &mdash; state persists.
      </p>
    </main>
  );
}

function SheetA() {
  const { open, back } = useSheetNavigate();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-900">Sheet A <span className="text-slate-400 font-normal text-sm">(50%)</span></h2>
      <p className="text-sm text-slate-500">This sheet takes 50% of the screen. You can stack Sheet B on top.</p>
      <div className="flex gap-2">
        <button
          onClick={() => open("sheet-b")}
          className="flex-1 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold cursor-pointer"
        >
          Open Sheet B
        </button>
        <button
          onClick={back}
          className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-900 text-sm font-semibold cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function SheetB() {
  const { open, back, backAll } = useSheetNavigate();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-900">Sheet B <span className="text-slate-400 font-normal text-sm">(80%)</span></h2>
      <p className="text-sm text-slate-500">This sheet takes 80% of the screen. Stack one more on top or go back.</p>
      <div className="flex gap-2">
        <button
          onClick={() => open("sheet-c")}
          className="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold cursor-pointer"
        >
          Open Sheet C
        </button>
        <button
          onClick={back}
          className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-900 text-sm font-semibold cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={backAll}
          className="py-3 px-4 rounded-xl bg-red-500 text-white text-sm font-semibold cursor-pointer"
        >
          Close All
        </button>
      </div>
    </div>
  );
}

function SheetC() {
  const { back, backAll } = useSheetNavigate();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-900">Sheet C <span className="text-slate-400 font-normal text-sm">(full screen)</span></h2>
      <p className="text-sm text-slate-500">This is a full-screen sheet. Press back to go to the previous sheet, or close all to return home.</p>
      <div className="flex gap-2">
        <button
          onClick={back}
          className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-900 text-sm font-semibold cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={backAll}
          className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold cursor-pointer"
        >
          Close All
        </button>
      </div>
    </div>
  );
}
