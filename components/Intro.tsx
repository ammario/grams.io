import { Link } from "@mui/material";
import Image from "next/image";

const Intro: React.FC = () => {
  return (
    <>
      <div className="flex items-center mb-2">
        <Link href="/">
          <Image width="48" height="48" alt="" src={"/icon.svg"} priority></Image>
        </Link>
        <div className="ml-3">
          <h1>grams.io</h1>
          <p>How long do drugs stay in your body?</p>
        </div>
      </div>
      <p className="tagline mt-3">
        Grams works by calculating the{" "}
        <a href={"https://en.wikipedia.org/wiki/Elimination_(pharmacology)"}>
          half-life elimination
        </a>{" "}
        timeline of ingested drugs. Some drugs (notably alcohol and THC) cannot
        be accurately modeled this way. All drugs metabolize differently in
        different people. For example, caffeine&apos;s half-life is 97 hours in
        infants but only 5 hours in adults.{" "}
        <b>Research drugs before you consume them</b>. This site is not medical
        advice. <br />
        <Link
          href={
            "/?i=1h-Caffeine-80000ug-5h&i=2h-Amphetamine-30mg-600min&i=3h-Caffeine-100mg-5h"
          }
        >
          (Example report)
        </Link>
      </p>
    </>
  );
};

export default Intro;
