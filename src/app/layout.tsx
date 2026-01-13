import "./[locale]/globals.css";

export const metadata = {
   title: "Smart EduHub",
   description: "Smart EduHub",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body>{children}</body>
      </html>
   );
}
