import "./About.css";
import authorPicture from "../../assets/author_picture.jpg";

function About() {
  return (
    <section className="about">
      <div className="about__avatar">
        <img src={authorPicture} alt="Author" className="about__avatar-image" />
      </div>

      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Myo Myat Myat Thant is an aspiring software engineer who has worked
          hands-on with modern development technologies including HTML, CSS,
          JavaScript, React, Node.js, Express, MongoDB, APIs, Git, and
          responsive design and deployment tools. She has built full-stack
          projects from scratch, connecting front-end interfaces to back-end
          services and learning how to write clean, maintainable code that’s
          easy to extend.
        </p>
        <p className="about__text">
          Before transitioning into tech, she spent several years in public
          relations, where she learned how to understand people’s needs,
          communicate complex ideas simply, and manage projects under real-world
          deadlines. Now she brings that experience into her engineering work.
          Whether it’s improving a product’s user experience or translating
          client goals into working features, she aims to be the bridge between
          people and the technology that supports them.
        </p>
      </div>
    </section>
  );
}

export default About;
