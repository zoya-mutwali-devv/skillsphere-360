import { Link } from "react-router-dom";

const SkillCard = ({ skill }) => {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h3>{skill.title}</h3>
      <p>Instructor: {skill.instructor}</p>
      <Link to={`/skill/${skill.id}`}>View Details</Link>
    </div>
  );
};

export default SkillCard;