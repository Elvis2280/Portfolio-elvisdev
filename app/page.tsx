import { Button } from "@/atoms/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main>
        <h1>Hello, World!</h1>
        <Button variant="outline">Click me</Button>
      </main>
    </div>
  );
}
