import ProductVelocitySection from "@/components/sections/ProductVelocitySection";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

const brands = [
  {
    name: "Nestle",
    src: "/images/brand-nestle.png",
    width: 826,
    height: 237,
  },
  {
    name: "Nutella",
    src: "/images/brand-nutella.png",
    width: 975,
    height: 262,
  },
  {
    name: "Nut Master",
    src: "/images/brand-nut-master.png",
    width: 1610,
    height: 638,
  },
  {
    name: "Snickers",
    src: "/images/brand-snickers.png",
    width: 776,
    height: 229,
  },
  {
    name: "Kraft Heinz",
    src: "/images/brand-kraft-heinz.png",
    width: 707,
    height: 136,
  },
];

export default function BrandIntroSection() {
  return (
    <>
      <ProductVelocitySection />

      <section className="brand-intro" aria-label="Food brands">
        <div className="brand-strip" aria-label="Food brands">
          {brands.map((brand) => (
            <div className="brand-mark" key={brand.name}>
              <img
                src={brand.src}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className="brand-mark__image"
                loading="eager"
              />
              <span>{brand.name}</span>
            </div>
          ))}
        </div>
      </section>

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
