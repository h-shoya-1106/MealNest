import LogoutButton from "./LogoutButton";

export default function Header() {
  return (
    <header className="w-full px-4 py-3 flex justify-between items-center shadow bg-white fixed top-0 z-50">
      <h1 className="text-xl font-bold text-gray-800">MealNest</h1>
      <LogoutButton />
    </header>
  );
}
