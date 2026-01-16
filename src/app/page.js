import BackgroundSection from "@/components/BackgroundSection";

export default function Home() {
  return (
    <BackgroundSection imageSrc="/homepage/bg_homepage.png">
      {/* Page 1 - Homepage content */}
      <img
        className="select-button"
        src="/homepage/select_button.png"
        alt="Select Your Team"
      />
    </BackgroundSection>
  );
}
