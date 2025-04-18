import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";

const ProductPage = () => {
  const {
    product,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
    formData,
    setFormData,
    resetFormData
  } = useProductStore();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  const handleDelete = () => {
    deleteProduct(id);
    navigate("/");
    resetFormData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 border-solid" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => {
          navigate("/");
          resetFormData();
        }}
        className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-8 text-sm font-medium"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PRODUCT IMAGE */}
        <div className="rounded-lg overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* PRODUCT FORM */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Product</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProduct(id, formData);
              resetFormData();
              navigate("/");
            }}
            className="space-y-6"
          >
            {/* PRODUCT NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
              />
            </div>

            {/* PRODUCT PRICE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
              />
            </div>

            {/* PRODUCT IMAGE URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* FORM ACTIONS */}
            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 border border-red-500 rounded-md hover:bg-red-50 hover:shadow transition"
              >
                <Trash2Icon className="w-4 h-4 mr-2" />
                Delete Product
              </button>

              <button
                type="submit"
                disabled={!formData.name || !formData.price || !formData.image || loading}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 hover:shadow transition ${(!formData.name || !formData.price || !formData.image || loading) &&
                  "opacity-50 cursor-not-allowed"
                  }`}
              >
                {loading ? (
                  <div className="animate-spin h-4 w-4 mr-2 border-t-2 border-white rounded-full" />
                ) : (
                  <SaveIcon className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
