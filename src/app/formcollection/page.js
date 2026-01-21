"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import BackgroundSection from "@/components/BackgroundSection";

// Team mapping - matches team images (team1.png = CSK, etc.)
const TEAMS = [
  { id: 1, code: "CSK", name: "Chennai Super Kings" },
  { id: 2, code: "GT", name: "Gujarat Titans" },
  { id: 3, code: "SRH", name: "Sunrisers Hyderabad" },
  { id: 4, code: "MI", name: "Mumbai Indians" },
  { id: 5, code: "KKR", name: "Kolkata Knight Riders" },
  { id: 6, code: "RR", name: "Rajasthan Royals" },
  { id: 7, code: "RCB", name: "Royal Challengers Bangalore" },
  { id: 8, code: "PBKS", name: "Punjab Kings" },
  { id: 9, code: "DC", name: "Delhi Capitals" },
  { id: 10, code: "LSG", name: "Lucknow Super Giants" },
];

function FormCollectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedTeamId = searchParams.get("team") || "";
  const jerseySizes = [
    "XS (36)",
    "S (38)",
    "M (40)",
    "L (42)",
    "XL (44)",
    "XXL (46)",
    "XXXL (48)",
  ];

  const [isReady, setIsReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Get selected team from URL param
  const selectedTeam = TEAMS.find((t) => t.id === parseInt(selectedTeamId));

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

  // Fallback timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 15000);
    return () => clearTimeout(timeout);
  }, []);

  const handleBgLoad = () => {
    setIsReady(true);
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    // Indian mobile: 10 digits, optionally starting with +91
    const mobileRegex = /^(\+91)?[6-9]\d{9}$/;
    return mobileRegex.test(mobile.replace(/\s/g, ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.target);
    const drEmail = formData.get("drEmail");
    const drMobile = formData.get("drMobile");

    // Validate
    const newErrors = {};
    if (!validateEmail(drEmail)) {
      newErrors.drEmail = "Please enter a valid email address";
    }
    if (!validateMobile(drMobile)) {
      newErrors.drMobile = "Please enter a valid 10-digit mobile number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    const data = {
      name: formData.get("name"),
      hq: formData.get("hq"),
      employeeId: formData.get("employeeId"),
      smName: formData.get("smName"),
      zbmName: formData.get("zbmName"),
      drName: formData.get("drName"),
      drEmail: drEmail,
      drMobile: drMobile,
      favouriteTeam: formData.get("favouriteTeam"),
      selectedTeamCode: selectedTeam?.code || formData.get("favouriteTeam"),
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
    <>
      {!isReady && (
        <div className="page-loader">
          <div className="loader-spinner"></div>
          <p className="loader-text">Loading...</p>
        </div>
      )}
      <div
        className="formcollection-page"
        style={{
          opacity: isReady ? 1 : 0,
          visibility: isReady ? "visible" : "hidden",
        }}
      >
        <BackgroundSection
          imageSrc="/formcollection/bg_formcollection.png"
          fixed
          onImageLoad={handleBgLoad}
        >
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
                      className={`form-input ${errors.drEmail ? "input-error" : ""}`}
                      required
                    />
                    {errors.drEmail && (
                      <span className="error-text">{errors.drEmail}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Dr's Mobile Number</label>
                    <input
                      type="tel"
                      name="drMobile"
                      className={`form-input ${errors.drMobile ? "input-error" : ""}`}
                      placeholder="10-digit mobile number"
                      required
                    />
                    {errors.drMobile && (
                      <span className="error-text">{errors.drMobile}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Dr's Favourite Team For Jersey
                    </label>
                    {selectedTeam ? (
                      <input
                        type="text"
                        name="favouriteTeam"
                        className="form-input"
                        value={`${selectedTeam.code} - ${selectedTeam.name}`}
                        readOnly
                      />
                    ) : (
                      <select
                        name="favouriteTeam"
                        className="form-input form-select"
                        required
                      >
                        <option value="">Select Team</option>
                        {TEAMS.map((team) => (
                          <option key={team.id} value={team.code}>
                            {team.code} - {team.name}
                          </option>
                        ))}
                      </select>
                    )}
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
                    <label className="form-label">
                      Name To Print On Jersey
                    </label>
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
                <p className="form-note">
                  If the team whose jersey you're collecting finishes as the
                  winner or runner-up, you'll receive special gifts. Stay tuned!
                </p>
              </>
            )}
          </div>
        </BackgroundSection>
      </div>
    </>
  );
}

export default function FormCollection() {
  return (
    <Suspense
      fallback={
        <div className="page-loader">
          <div className="loader-spinner"></div>
          <p className="loader-text">Loading...</p>
        </div>
      }
    >
      <FormCollectionContent />
    </Suspense>
  );
}
