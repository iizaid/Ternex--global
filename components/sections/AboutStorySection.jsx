export default function AboutStorySection() {
  const features = [
    {
      title: "Global Sourcing",
      description: "Partnering with leading international food innovators to bring premium products to Jordan.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
      )
    },
    {
      title: "Reliable Distribution",
      description: "Our robust logistics network ensures safe, efficient, and timely delivery across all retail channels.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
      )
    },
    {
      title: "Premium Quality",
      description: "Maintaining the highest standards of storage and preparation to guarantee freshness at every step.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      )
    }
  ];

  return (
    <section className="features-section" id="about" aria-labelledby="features-title">
      <div className="features-header">
        <span className="features-eyebrow">Who We Are</span>
        <h2 id="features-title">Why Choose Us</h2>
        <div className="features-divider"></div>
      </div>

      <div className="features-grid">
        {features.map((feat, idx) => (
          <div className="feature-card" key={idx}>
            <div className="feature-icon-wrapper">
              <div className="feature-icon">
                {feat.icon}
              </div>
            </div>
            <h3 className="feature-title">{feat.title}</h3>
            <p className="feature-desc">{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
