import React from "react";
import { Button } from "../ui/button";
import { Download, PhoneCall, Send } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between container mx-auto py-5">
      <nav>
        <ul className="flex flex-row items-center">
          <li className="mr-8">
            <Link
              className="hover:text-primary header__link after:bg-primary"
              href={"/"}
            >
              dnd no libs
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-primary header__link after:bg-primary"
              href={"/dnd-kit"}
            >
              with lib dnd-kit
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <Button
          asChild
          variant={"outline"}
          className="mr-2"
          title="download my cv"
        >
          <a href="/somon_sodikov.pdf" >
            <Download />
          </a>
        </Button>
        <Button
          asChild
          variant={"outline"}
          className="mr-2"
          title="my telegram"
        >
          <a href="https://t.me/somon_0_1">
            <Send />
          </a>
        </Button>
        <Button asChild variant={"outline"} title="call me">
          <a href="tel:+992911042544">
            <PhoneCall />
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
