import s from "./Section.module.css";
import PropTypes from "prop-types";

const Section = ({ title, children }) => (
  <section className={s.sectionWrp}>
    <h1 className="sectionTittle">{title}</h1>
    <div className="sectionContent">{children}</div>
  </section>
);
export default Section;

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};
