import "./NothingFound.css";

function NothingFound() {
  return (
    <section className="nothing-found">
      <h2 className="nothing-found__title">Nothing found</h2>
      <p className="nothing-found__text">
        Sorry, but nothing matched your search terms.
      </p>
    </section>
  );
}

export default NothingFound;
