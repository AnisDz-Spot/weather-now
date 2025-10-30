import Image from "next/image";
import Units from "./elements/Units";
import SearchBar from "./elements/SearchBar";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-3/12 py-5">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Weather Now logo"
            width={120}
            height={90}
            className="w-40 h-[90px] md:w-auto md:h-auto"
          />
        </Link>
        <Units />
      </nav>
      <h1 className="text-center text-3xl md:text-4xl font-semibold my-8">
        How&apos;s the sky looking today?
      </h1>
      <SearchBar />
    </header>
  );
};

export default Header;
