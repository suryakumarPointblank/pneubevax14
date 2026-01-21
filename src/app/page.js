"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import BackgroundSection from "@/components/BackgroundSection";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  const mobileRow1 = [1, 2, 3];
  const mobileRow2 = [4, 5, 6, 7];
  const mobileRow3 = [8, 9, 10];
  const desktopRow1 = [1, 2, 3, 4, 5];
  const desktopRow2 = [6, 7, 8, 9, 10];

  const handleBgLoad = () => {
    setShowContent(true);
  };

  const handleTeamSelect = (teamNumber) => {
    setIsModalOpen(false);
    router.push(`/formcollection?team=${teamNumber}`);
  };

  return (
    <>
      {!showContent && (
        <div className="page-loader">
          <div className="loader-spinner"></div>
          <p className="loader-text">Loading...</p>
        </div>
      )}
      {/* Main content */}
      <div className={`homepage-page ${showContent ? "images-ready" : ""}`}>
        <BackgroundSection
          imageSrc="/homepage/bg_homepage.png"
          onImageLoad={handleBgLoad}
        >
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
          <img
            className="select-button"
            src="/homepage/select_button.png"
            alt="Select Your Team"
            onClick={() => setIsModalOpen(true)}
          />
        </BackgroundSection>

        {isModalOpen && (
          <div
            className="team-modal-overlay"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="team-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>

              <h2 className="modal-title">Select Your Team</h2>

              {/* Mobile: 3-4-3 layout */}
              <div className="teams-grid teams-mobile modal-teams">
                <div className="teams-row">
                  {mobileRow1.map((num) => (
                    <img
                      key={num}
                      className="team-image"
                      src={`/formcollection/teams/team${num}.png`}
                      alt={`Team ${num}`}
                      onClick={() => handleTeamSelect(num)}
                    />
                  ))}
                </div>
                <div className="teams-row">
                  {mobileRow2.map((num) => (
                    <img
                      key={num}
                      className="team-image"
                      src={`/formcollection/teams/team${num}.png`}
                      alt={`Team ${num}`}
                      onClick={() => handleTeamSelect(num)}
                    />
                  ))}
                </div>
                <div className="teams-row">
                  {mobileRow3.map((num) => (
                    <img
                      key={num}
                      className="team-image"
                      src={`/formcollection/teams/team${num}.png`}
                      alt={`Team ${num}`}
                      onClick={() => handleTeamSelect(num)}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop: 5-5 layout */}
              <div className="teams-grid teams-desktop modal-teams">
                <div className="teams-row">
                  {desktopRow1.map((num) => (
                    <img
                      key={num}
                      className="team-image"
                      src={`/formcollection/teams/team${num}.png`}
                      alt={`Team ${num}`}
                      onClick={() => handleTeamSelect(num)}
                    />
                  ))}
                </div>
                <div className="teams-row">
                  {desktopRow2.map((num) => (
                    <img
                      key={num}
                      className="team-image"
                      src={`/formcollection/teams/team${num}.png`}
                      alt={`Team ${num}`}
                      onClick={() => handleTeamSelect(num)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
