import Link from "next/link";
import { getImageUrl } from "@/lib/api";
import { getWebsiteService } from "@/lib/website";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function ServiceDetailsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const serviceId = searchParams.id || "1";

  try {
    const service = await getWebsiteService(serviceId);

    return (
      <>
        <section
          className="page-hero service-detail-hero"
          style={{
            background: `linear-gradient(rgba(20, 28, 45, 0.55), rgba(20, 28, 45, 0.55)), url('${service.serviceImage}') center/cover no-repeat`,
          }}
        >
          <h1>{service.title}</h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/services">Services</Link>
            <span className="separator">/</span>
            <span className="current">{service.title}</span>
          </div>
        </section>

        <section className="service-detail-page">
          <div className="container">
            <div className="service-detail-content">
              <span className="section-badge">Our Expertise</span>
              <h2>{service.title}</h2>
              <p>{service.shortDescription}</p>
              {service.description && (
                <div
                  suppressHydrationWarning
                  dangerouslySetInnerHTML={{
                    __html: service.description,
                  }}
                />
              )}

              <div className="service-detail-actions">
                <Link href="/contact" className="btn-cta">
                  Start Your Project
                </Link>
                <Link href="/services" className="service-back-link">
                  Back to Services <i className="fas fa-arrow-right"></i>
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
            <h2>Service Not Found</h2>
            <p>The service you are looking for could not be found.</p>
            <Link href="/services" className="btn-cta">
              Back to Services
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
