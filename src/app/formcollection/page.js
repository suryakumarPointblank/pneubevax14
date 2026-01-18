"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import BackgroundSection from "@/components/BackgroundSection";

function FormCollectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedTeam = searchParams.get("team") || "";
  const jerseySizes = ["Xs", "S", "M", "L", "Xl", "Xxl", "Xxxl"];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const smNames = [
    "S.Balaji",
    "Himal Pandya",
    "Bhavankumar",
    "Selvakumar",
    "Srinivas",
    "MD Sami",
    "Santosh Rath",
    "Nagpur Vacant",
    "Prashant Patil (Pune)",
    "Prashant Desai",
    "Sudhir Nair",
    "Sajal Gupta",
    "CK Patel",
    "Narendar Rana",
    "Rahul Kumar",
    "Sudhir Jhakar",
    "Rajesh Kumar",
    "Ashish Pandey",
    "Madhur Nagariya",
    "Arindam Das",
    "Op Singh",
    "Ujwal B",
  ];

  const zbmNames = [
    "R.Chelvan",
    "Rajiv Chaubey",
    "Shajie Josef",
    "Serveshwer Verma",
    "Subir De",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      hq: formData.get("hq"),
      employeeId: formData.get("employeeId"),
      smName: formData.get("smName"),
      zbmName: formData.get("zbmName"),
      drName: formData.get("drName"),
      drEmail: formData.get("drEmail"),
      drMobile: formData.get("drMobile"),
      favouriteTeam: selectedTeam
        ? `Team ${selectedTeam}`
        : formData.get("favouriteTeam"),
      selectedTeamNumber: selectedTeam || null,
      jerseySize: formData.get("jerseySize"),
      nameToPrint: formData.get("nameToPrint"),
      numberToPrint: formData.get("numberToPrint"),
    };

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setSubmitMessage("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="formcollection-page">
      <BackgroundSection imageSrc="/formcollection/bg_formcollection.png" fixed>
        <img className="ipl-logo" src="/common/ipl_logo.png" alt="IPL Logo" />

        <div className="form-wrapper">
          <img className="shine-left" src="/common/shine.png" alt="" />
          <img className="shine-right" src="/common/shine.png" alt="" />

          {isSubmitted ? (
            <div className="success-container">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Submission Successful!</h2>
              <p className="success-message">
                Thank you for your submission. Your details have been recorded
                successfully.
              </p>
              <button
                className="submit-button"
                onClick={() => router.push("/")}
              >
                Go Back Home
              </button>
            </div>
          ) : (
            <>
              <img
                className="form-title-image"
                src="/formcollection/details_to_fill.png"
                alt="Details to Fill"
              />
              <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Write Your Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">HQ</label>
                  <input
                    type="text"
                    name="hq"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Employee Id</label>
                  <input
                    type="text"
                    name="employeeId"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Sm Name</label>
                  <select
                    name="smName"
                    className="form-input form-select"
                    required
                  >
                    <option value="">Select SM Name</option>
                    {smNames.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Zbrn Name</label>
                  <select
                    name="zbmName"
                    className="form-input form-select"
                    required
                  >
                    <option value="">Select ZBM Name</option>
                    {zbmNames.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Dr's Name As Per Besmartr
                  </label>
                  <input
                    type="text"
                    name="drName"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Dr's Email Id</label>
                  <input
                    type="email"
                    name="drEmail"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Dr's Mobile Number</label>
                  <input
                    type="tel"
                    name="drMobile"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Dr's Favourite Team For Jersey
                  </label>
                  <input
                    type="text"
                    name="favouriteTeam"
                    className="form-input"
                    defaultValue={selectedTeam ? `Team ${selectedTeam}` : ""}
                    readOnly={!!selectedTeam}
                    required
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
                          required
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Name To Print On Jersey</label>
                  <input
                    type="text"
                    name="nameToPrint"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Number To Print On Jersey
                  </label>
                  <input
                    type="text"
                    name="numberToPrint"
                    className="form-input"
                    required
                  />
                </div>

                {submitMessage && (
                  <div className="submit-message error">{submitMessage}</div>
                )}

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </>
          )}
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
