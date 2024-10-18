import Image from "next/image";
import Link from "next/link";
import { QrCode, ShoppingBag, Home, Package } from "lucide-react";
import p1 from "@/public/p1.jpg";
import p2 from "@/public/p2.jpg";
import p3 from "@/public/p3.jpg";

const products = [
  {
    id: 1,
    name: "Rebel Tee",
    price: 27.99,
    sizes: ["S", "M", "L", "XL"],
    image: p1.src,
  },
  {
    id: 2,
    name: "Punk Hoodie",
    price: 39.99,
    sizes: ["M", "L", "XL", "XXL"],
    image: p2.src,
  },
  {
    id: 3,
    name: "Grunge Jacket",
    price: 54.99,
    sizes: ["S", "M", "L"],
    image: p3.src,
  },
];

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 bg-transparent bg-opacity-90 backdrop-blur-sm drop-shadow-[0_0px_79px_rgba(71,214,70,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="bg-white rounded-full mx-auto max-w-2xl border">
            <div className="px-4">
              <div className="flex items-center justify-center h-16">
                <div className="flex gap-4">
                  <Link
                    href="/shop"
                    className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-full text-xs font-medium"
                  >
                    <ShoppingBag className="inline-block mr-1" size={15} />
                    Shop
                  </Link>
                  <Link
                    href="/"
                    className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-full text-xs font-medium"
                  >
                    <Home className="inline-block mr-1" size={15} />
                    Home
                  </Link>
                  <Link
                    href="/orders"
                    className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-full text-xs font-medium"
                  >
                    <Package className="inline-block mr-1" size={15} />
                    Your Orders
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center drop-shadow-[0_0px_79px_rgba(71,214,70,0.5)] p-40">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tighter">
            quest for rebellion
          </h1>
          <p className="text-sm tracking-tighter text-gray-600 mb-8">
            let your clothes speak about you!
          </p>
          <QrCode className="mx-auto text-gray-800 " size={120} />
        </section>

        <section className="mt-16 ">
          <h2 className="text-2xl tracking-tighter text-gray-900 mb-20 text-center ">
            Our Latest Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 drop-shadow-[0_0px_79px_rgba(171,214,70,0.3)]">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-white rounded-md p-2">
                    <QrCode size={24} />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-gray-800 text-xl font-semibold mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-sm"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white shadow-md mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">QRApparel</h3>
              <p className="text-sm text-gray-600">
                Fashion for the digital age
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Instagram
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
