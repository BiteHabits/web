import type { Route } from "./+types/home";
import { Menu } from "lucide-react";
import BiteHabitsLogo from "../assets/bite-habits-with-text-trans.svg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BiteHabits" },
    {
      name: "description",
      content:
        "Welcome to BiteHabits, a mealplanner app that helps you make dinner.",
    },
  ];
}

export default function Home() {
  return (
    <div>
      <header className="max-w-screen-md py-8 px-4 w-full mx-auto flex items-center justify-between">
        <img
          src={BiteHabitsLogo}
          alt="BiteHabits Logo"
          className="h-5 w-auto"
        />

        <Menu className="h-5" />
      </header>

      <main className="max-w-screen-md mx-auto py-16">
        <ul className="grid grid-cols-3 gap-4">
          <li className="rounded-lg bg-yellow-100 p-4 col-span-3">
            <h2 className="text-2xl font-bold text-slate-900 p-4">Bentobox</h2>
            <p className="text-slate-800 p-4">
              A meal planner that helps you make dinner.
            </p>
          </li>
          <li className="rounded-lg bg-green-100 p-4 col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 p-4">Bentobox</h2>
            <p className="text-slate-800 p-4">
              A meal planner that helps you make dinner.
            </p>
          </li>
          <li className="rounded-lg bg-blue-100 p-4 col-span-1">
            <h2 className="text-2xl font-bold text-slate-900 p-4">Bentobox</h2>
            <p className="text-slate-800 p-4">
              A meal planner that helps you make dinner.
            </p>
          </li>
          <li className="rounded-lg bg-red-100 p-4 col-span-3">
            <h2 className="text-2xl font-bold text-slate-900 p-4">Bentobox</h2>
            <p className="text-slate-800 p-4">
              A meal planner that helps you make dinner.
            </p>
          </li>
        </ul>
      </main>
    </div>
  );
}
