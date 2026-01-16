import BackgroundSection from "@/components/BackgroundSection";
import Link from "next/link";

export default function Home() {
  return (
    <BackgroundSection imageSrc="/homepage/bg_homepage.png">
      {/* Page 1 - Homepage content */}
      <img
        className="sub-image sub1"
        src="/homepage/SUB1.png"
        alt="Sub 1"
      />
      <img
        className="sub-image sub2"
        src="/homepage/sub2.png"
        alt="Sub 2"
      />
      <Link href="/formcollection">
        <img
          className="select-button"
          src="/homepage/select_button.png"
          alt="Select Your Team"
        />
      </Link>
    </BackgroundSection>
  );
}
