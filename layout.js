import "./globals.css";
export const metadata = {
  title: "Velocity Task Manager",
  description: "Real-time task management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
