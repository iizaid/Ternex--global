import ProductVelocitySection from "@/components/sections/ProductVelocitySection";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

export default function BrandIntroSection() {
  return (
    <>
      <ProductVelocitySection />

      <section className="brand-intro-copy" aria-labelledby="brand-intro-title">
        <div className="brand-intro__content">
          <h2 id="brand-intro-title">
            Trusted food{" "}
            <span style={{ color: "var(--gold-dark)" }}>
              <ContainerTextFlip words={["brands,", "products,", "snacks,"]} />
            </span>{" "}
            brought closer to Jordan
          </h2>
          <p>
            TERNEX partners with regional and global food suppliers to import chocolate, dairy,
            snacks, and packaged products with dependable sourcing, clean distribution, and a clear
            focus on the Jordanian market.
          </p>
          <a className="brand-intro__button" href="#products">
            Learn more
          </a>
        </div>
      </section>
    </>
  );
}
