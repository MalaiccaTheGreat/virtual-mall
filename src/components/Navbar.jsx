export default function Navbar() {
    return (
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
          <h1 className="text-xl font-bold">FashionHub</h1>
          <div className="flex gap-6">
            <button className="hover:text-blue-500">Shop</button>
            <button className="hover:text-blue-500">Cart</button>
          </div>
        </div>
      </nav>
    )
  }