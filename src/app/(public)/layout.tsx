import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteBanners from "@/components/SiteBanners";

import { organizationSchema, localBusinessSchema } from "@/lib/seo";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema()),
        }}
      />
      <SiteBanners />
      <Header />
      <main className="overflow-x-hidden pt-[calc(4rem+2rem)] sm:pt-[calc(4rem+2.5rem)] lg:pt-[calc(5rem+2.5rem)]">{children}</main>
      <Footer />

    </>
  );
}
