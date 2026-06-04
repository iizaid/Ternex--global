import TextType from "@/components/site/TextType";

export default function HeroSection() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">


      <div className="hero-content">
        <a 
          href="https://maps.app.goo.gl/f4fCF1sQ7crL823d8" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="eyebrow"
        >
          <span>Amman, Jordan</span>
          <span aria-hidden="true">•</span>
          <span>
            Food Import <strong>Company</strong>
          </span>
        </a>

        <TextType
          as="h1"
          id="hero-title"
          className="hero-title"
          text={"Bringing Global\nFood Brands to Jordan"}
          typingSpeed={55}
          pauseDuration={99999}
          deletingSpeed={0}
          initialDelay={2700}
          showCursor={true}
          cursorCharacter="|"
          loop={false}
        />



        <p className="lead">
          TERNEX is an Amman-based company importing quality chocolate, snacks, and packaged food
          products for the Jordanian market.
        </p>

        <div className="hero-actions" aria-label="Hero actions">
          <a className="button button-primary" href="#products">
            Explore Products
          </a>
          <a
            className="button button-secondary"
            href="https://wa.me/962799425899"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
