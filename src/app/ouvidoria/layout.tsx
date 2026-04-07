// Layout dedicado da ouvidoria — sem header/footer do site público,
// garantindo experiência focada e confidencial.
export const metadata = {
  title: "Canal de Ouvidoria | Instituto João Alves",
  description: "Canal seguro, confidencial e imparcial.",
  robots: { index: false, follow: false },
};

export default function OuvidoriaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
