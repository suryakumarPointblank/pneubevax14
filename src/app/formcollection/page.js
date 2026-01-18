"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import BackgroundSection from "@/components/BackgroundSection";

function FormCollectionContent() {
  const searchParams = useSearchParams();
  const selectedTeam = searchParams.get("team") || "";
  const jerseySizes = ["Xs", "S", "M", "L", "Xl", "Xxl", "Xxxl"];

  return (
    <div className="formcollection-page">
      <BackgroundSection imageSrc="/formcollection/bg_formcollection.png" fixed>
        <img className="ipl-logo" src="/common/ipl_logo.png" alt="IPL Logo" />

        <div className="form-wrapper">
          <img className="shine-left" src="/common/shine.png" alt="" />
          <img className="shine-right" src="/common/shine.png" alt="" />
          <img
            className="form-title-image"
            src="/formcollection/details_to_fill.png"
            alt="Details to Fill"
          />
          <div className="form-container">
            <div className="form-group">
              <label className="form-label">Write Your Name:</label>
              <input type="text" className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">HQ</label>
              <input type="text" className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Employee Id</label>
              <input type="text" className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Sm Name</label>
              <input type="text" className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Zbrn Name</label>
              <input type="text" className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Dr's Name As Per Besmartr</label>
              <input type="text" className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Dr's Email Id</label>
              <input type="email" className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Dr's Mobile Number</label>
              <input type="tel" className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">
                Dr's Favourite Team For Jersey
              </label>
              <input
                type="text"
                className="form-input"
                defaultValue={selectedTeam ? `Team ${selectedTeam}` : ""}
                readOnly={!!selectedTeam}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Jersey Size</label>
              <div className="radio-group">
                {jerseySizes.map((size) => (
                  <label key={size} className="radio-label">
                    <input
                      type="radio"
                      name="jerseySize"
                      value={size}
                      className="radio-input"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Name To Print On Jersey</label>
              <input type="text" className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Number To Print On Jersey</label>
              <input type="text" className="form-input" />
            </div>
          </div>
        </div>
      </BackgroundSection>
    </div>
  );
}

export default function FormCollection() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormCollectionContent />
    </Suspense>
  );
}
