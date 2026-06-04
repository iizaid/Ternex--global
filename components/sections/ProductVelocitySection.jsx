export default function ProductVelocitySection() {
  const row1 = [1, 2, 3, 4, 5, 6];
  const row2 = [7, 8, 9, 10, 11, 1];

  return (
    <section className="product-velocity" id="products" aria-label="Products">
      {/* The header with "Our Products" has been removed as requested */}
      <div className="product-velocity__container">
        <div className="product-velocity__row" data-direction="normal">
          <div className="product-velocity__track">
            {[...row1, ...row1, ...row1].map((num, i) => (
              <img
                key={`r1-${i}`}
                src={`/products/${num}.png`}
                alt={`Product ${num}`}
                className="product-velocity__image"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="product-velocity__row" data-direction="reverse">
          <div className="product-velocity__track">
            {[...row2, ...row2, ...row2].map((num, i) => (
              <img
                key={`r2-${i}`}
                src={`/products/${num}.png`}
                alt={`Product ${num}`}
                className="product-velocity__image"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
