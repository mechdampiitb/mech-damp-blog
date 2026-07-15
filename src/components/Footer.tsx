export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-8 text-sm text-gray-600 flex flex-col gap-2">
      <div className="flex gap-4">
        <a href="/contribute">Contribute a review</a>
        <a href="https://www.me.iitb.ac.in" target="_blank">
          IITB Mechanical Dept
        </a>
      </div>
      <p>© {new Date().getFullYear()} Mech DAMP, IIT Bombay</p>
    </footer>
  );
}