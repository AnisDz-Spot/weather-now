import Header from "@/components/Header";
import Main from "@/components/Main";

export default function Home() {
  return (
    <main className="flex flex-col gap-5 md:gap-15 bg-blue-bg min-h-screen max-w-screen px-8 md:px-10 lg:px-[5vw] py-2 lg:overflow-hidden">
      <Header />
      <Main />
    </main>
  );
}
