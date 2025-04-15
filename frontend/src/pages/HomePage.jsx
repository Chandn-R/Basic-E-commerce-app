import { useProductStore } from "../store/useProductStore.jsx";
import { useEffect, useState } from "react";
import { PlusCircleIcon, RefreshCwIcon, PackageIcon } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import AddProductModal from "../components/AddProductModal.jsx";

const HomePage = () => {
  const [showModal, setshowModal] = useState(false);

  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);


  return (
    <>
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <button
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
            onClick={() => setshowModal(true)}
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Add Product
          </button>
          {/* <button
          className="p-2 rounded-full hover:bg-indigo-100 transition"
          onClick={fetchProducts}
        >
          <RefreshCwIcon className="w-5 h-5 text-indigo-600" />
        </button> */}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 text-red-600 bg-red-100 p-4 rounded-md border border-red-300">
            {error}
          </div>
        )}

        {/* No Products Message */}
        {products.length === 0 && !loading && (
          <div className="flex flex-col justify-center items-center h-96 space-y-4 text-center">
            <div className="bg-indigo-100 rounded-full p-6">
              <PackageIcon className="w-12 h-12 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">No products found</h3>
              <p className="text-gray-500">Get started by adding your first product.</p>
            </div>
          </div>
        )}

        {/* Product Grid or Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(products) &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}
      </main>

      <AddProductModal visible={showModal} onClose={() => setshowModal(false)} />

    </>
  );
};

export default HomePage;
