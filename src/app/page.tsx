"use client";

import { useMemo } from "react";
import {
  SheetRouter,
  SheetRoute,
  useSheetNavigate,
  useSheetParams,
} from "@rezahasani78/sheet-router";
import "@rezahasani78/sheet-router/styles.css";
import { createReduxStorageProvider } from "@/store/sheet-storage-provider";

export default function Home() {
  const storageProvider = useMemo(() => createReduxStorageProvider(), []);

  return (
    <SheetRouter storageProvider={storageProvider}>
      <WelcomePage />
      <SheetRoute path="settings" component={Settings} title="Settings" />
      <SheetRoute path="profile" component={Profile} title="Profile" />
      <SheetRoute path="notifications" component={Notifications} title="Notifications" />
      <SheetRoute path="confirm" component={Confirm} title="Confirm Action" />
    </SheetRouter>
  );
}

function WelcomePage() {
  const { open } = useSheetNavigate();

  return (
    <main className="flex flex-col items-center justify-center min-h-dvh p-6 gap-8 text-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium tracking-wide">
          @rezahasani78/sheet-router + Next.js
        </span>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
          Sheet Router Demo
        </h1>
        <p className="text-slate-500 max-w-sm leading-relaxed">
          Stacked bottom sheets with full back-button support.
          Open sheets, navigate deep, press back to unwind.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => open("settings")}
          className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Settings
        </button>
        <button
          onClick={() => open("profile", { userId: "42", name: "Reza" })}
          className="px-6 py-3 rounded-xl border-2 border-slate-900 text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-colors cursor-pointer"
        >
          Profile (with params)
        </button>
        <button
          onClick={() => open("notifications")}
          className="px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition-colors cursor-pointer"
        >
          Notifications
        </button>
      </div>
    </main>
  );
}

function Settings() {
  const { open, back, backAll } = useSheetNavigate();

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-slate-900">Settings</h2>
      <p className="text-slate-500 leading-relaxed">
        Manage your preferences. You can stack more sheets on top of this one.
      </p>

      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-slate-50 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Dark mode</span>
          <div className="w-10 h-6 bg-slate-300 rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow" />
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Push notifications</span>
          <div className="w-10 h-6 bg-blue-500 rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <button
          onClick={() => open("profile", { userId: "7", name: "Reza" })}
          className="flex-1 min-w-[120px] px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold cursor-pointer"
        >
          Open Profile
        </button>
        <button
          onClick={() => open("notifications")}
          className="flex-1 min-w-[120px] px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold cursor-pointer"
        >
          Notifications
        </button>
        <button
          onClick={back}
          className="flex-1 min-w-[120px] px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-900 text-sm font-semibold cursor-pointer"
        >
          Close
        </button>
        <button
          onClick={backAll}
          className="flex-1 min-w-[120px] px-4 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold cursor-pointer"
        >
          Close All
        </button>
      </div>
    </div>
  );
}

function Profile() {
  const { open, back } = useSheetNavigate();
  const { params } = useSheetParams<{ userId: string; name: string }>();

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-slate-900">Profile</h2>

      <div className="p-5 rounded-2xl bg-slate-50 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
            {params.name?.charAt(0) ?? "?"}
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-lg">{params.name}</p>
            <p className="text-slate-400 text-sm">User ID: {params.userId}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => open("confirm", { action: "delete-account" })}
          className="flex-1 min-w-[120px] px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold cursor-pointer"
        >
          Open Confirm
        </button>
        <button
          onClick={back}
          className="flex-1 min-w-[120px] px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-900 text-sm font-semibold cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Notifications() {
  const { open, back } = useSheetNavigate();

  const items = [
    { id: 1, text: "Your order has shipped", time: "2m ago" },
    { id: 2, text: "New follower: Reza", time: "15m ago" },
    { id: 3, text: "Payment received", time: "1h ago" },
    { id: 4, text: "Weekly report ready", time: "3h ago" },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-slate-900">Notifications</h2>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="p-4 rounded-xl bg-slate-50 flex items-center justify-between">
            <span className="text-sm text-slate-700">{item.text}</span>
            <span className="text-xs text-slate-400 shrink-0 ml-3">{item.time}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => open("profile", { userId: "99", name: "Guest" })}
          className="flex-1 min-w-[120px] px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold cursor-pointer"
        >
          Open Profile
        </button>
        <button
          onClick={back}
          className="flex-1 min-w-[120px] px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-900 text-sm font-semibold cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Confirm() {
  const { back, backAll } = useSheetNavigate();
  const { params } = useSheetParams<{ action: string }>();

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-slate-900">Confirm</h2>
      <p className="text-slate-500 leading-relaxed">
        Are you sure you want to <strong className="text-slate-900">{params.action}</strong>?
        This is the deepest sheet in the current stack.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={backAll}
          className="flex-1 min-w-[120px] px-4 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold cursor-pointer"
        >
          Confirm & Close All
        </button>
        <button
          onClick={back}
          className="flex-1 min-w-[120px] px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-900 text-sm font-semibold cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
