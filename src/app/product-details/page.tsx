import Link from "next/link";
import { getWebsiteProduct, listWebsiteProductMetrics, listWebsiteProductTags } from "@/lib/website";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function ProductDetailsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const productId = searchParams.id || "1";

  try {
    const product = await getWebsiteProduct(productId);
    const [metrics, tags] = await Promise.all([
      listWebsiteProductMetrics(product.id),
      listWebsiteProductTags(product.id),
    ]);

    return (
      <>
        <section
          className="page-hero service-detail-hero"
          style={{
            background: `linear-gradient(rgba(20, 28, 45, 0.55), rgba(20, 28, 45, 0.55)), url('${product.productImage}') center/cover no-repeat`,
          }}
        >
          <h1>{product.title}</h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/portfolio">Products</Link>
            <span className="separator">/</span>
            <span className="current">{product.title}</span>
          </div>
        </section>

        <section className="service-detail-page">
          <div className="container">
            <div className="service-detail-content">
              <span className="section-badge">{product.category || "Product Overview"}</span>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              {product.longDescription && (
                <div
                  suppressHydrationWarning
                  dangerouslySetInnerHTML={{
                    __html: product.longDescription,
                  }}
                />
              )}

              {/* Display metrics if available */}
              {metrics.length > 0 && (
                <div className="product-metrics" style={{ marginTop: "30px" }}>
                  <h3>Key Metrics</h3>
                  <div className="metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px", marginTop: "20px" }}>
                    {metrics.map((metric) => (
                      <div key={metric.id} className="metric-card" style={{ textAlign: "center", padding: "20px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
                        <div className="metric-value" style={{ fontSize: "2rem", fontWeight: "bold", color: "#FECD06" }}>{metric.metricValue}</div>
                        <div className="metric-label" style={{ fontSize: "0.9rem", color: "#666" }}>{metric.metricLabel}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Display tags if available */}
              {tags.length > 0 && (
                <div className="product-tags" style={{ marginTop: "30px" }}>
                  <h3>Tags</h3>
                  <div className="tags-container" style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "15px" }}>
                    {tags.map((tag) => (
                      <span key={tag.id} className="product-tag" style={{ background: "#f0f0f0", padding: "5px 12px", borderRadius: "20px", fontSize: "0.9rem", color: "#666" }}>
                        {tag.tagName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="service-detail-actions">
                <Link href="/contact" className="btn-cta">
                  Request Demo
                </Link>
                <Link href="/portfolio" className="service-back-link">
                  Back to Products <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    return (
      <section className="service-detail-page">
        <div className="container">
          <div className="service-detail-content">
            <h2>Product Not Found</h2>
            <p>The product you are looking for could not be found.</p>
            <Link href="/portfolio" className="btn-cta">
              Back to Products
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
