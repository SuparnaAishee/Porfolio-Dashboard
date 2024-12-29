"use client";

import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/src/config/site";
import { title, subtitle } from "@/src/components/primitives";
import { GithubIcon } from "@/src/components/icons";
import { useUser } from "@/src/context/user.provider";

export default function Home() {
  const { user } = useUser();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-2xl text-center justify-center">
        
        <div className={subtitle({ class: "mt-4" })}>
          Welcome to your portfolio dashboard
        </div>
      </div>

    </section>
  );
}
