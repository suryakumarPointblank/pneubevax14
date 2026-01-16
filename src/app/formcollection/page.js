import BackgroundSection from "@/components/BackgroundSection";

export default function FormCollection() {
  const mobileRow1 = [1, 2, 3];
  const mobileRow2 = [4, 5, 6, 7];
  const mobileRow3 = [8, 9, 10];
  const desktopRow1 = [1, 2, 3, 4, 5];
  const desktopRow2 = [6, 7, 8, 9, 10];
  const jerseySizes = ["Xs", "S", "M", "L", "Xl", "Xxl", "Xxxl"];

  return (
    <BackgroundSection imageSrc="/formcollection/bg_formcollection.png" fixed>
      <img className="ipl-logo" src="/common/ipl_logo.png" alt="IPL Logo" />

      {/* Mobile: 3-4-3 layout */}
      <div className="teams-grid teams-mobile">
        <div className="teams-row">
          {mobileRow1.map((num) => (
            <img
              key={num}
              className="team-image"
              src={`/formcollection/teams/team${num}.png`}
              alt={`Team ${num}`}
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
            />
          ))}
        </div>
      </div>

      {/* Desktop: 5-5 layout */}
      <div className="teams-grid teams-desktop">
        <div className="teams-row">
          {desktopRow1.map((num) => (
            <img
              key={num}
              className="team-image"
              src={`/formcollection/teams/team${num}.png`}
              alt={`Team ${num}`}
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
            />
          ))}
        </div>
      </div>

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
            <label className="form-label">Dr's Favourite Team For Jersey</label>
            <input type="text" className="form-input" />
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
  );
}
