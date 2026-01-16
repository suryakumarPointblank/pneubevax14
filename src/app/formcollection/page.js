import BackgroundSection from "@/components/BackgroundSection";

export default function FormCollection() {
  const row1 = [1, 2, 3];
  const row2 = [4, 5, 6, 7];
  const row3 = [8, 9, 10];

  return (
    <BackgroundSection imageSrc="/formcollection/bg_formcollection.png" fixed>
      <img className="ipl-logo" src="/common/ipl_logo.png" alt="IPL Logo" />
      <div className="teams-grid">
        <div className="teams-row">
          {row1.map((num) => (
            <img
              key={num}
              className="team-image"
              src={`/formcollection/teams/team${num}.png`}
              alt={`Team ${num}`}
            />
          ))}
        </div>
        <div className="teams-row">
          {row2.map((num) => (
            <img
              key={num}
              className="team-image"
              src={`/formcollection/teams/team${num}.png`}
              alt={`Team ${num}`}
            />
          ))}
        </div>
        <div className="teams-row">
          {row3.map((num) => (
            <img
              key={num}
              className="team-image"
              src={`/formcollection/teams/team${num}.png`}
              alt={`Team ${num}`}
            />
          ))}
        </div>
      </div>
    </BackgroundSection>
  );
}
