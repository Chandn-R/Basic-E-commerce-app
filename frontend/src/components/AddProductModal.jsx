import { useEffect, useState } from "react";
import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";

function AddProductModal({ visible, onClose }) {
  const { addProduct, formData, setFormData, loading, resetFormData } = useProductStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 200); // wait for exit animation
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!visible && !show) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-200 ${visible ? "bg-black/40 opacity-100" : "opacity-0"}`}>
      <div
        className={`bg-white rounded-xl shadow-xl w-full max-w-lg p-6 transform transition-all duration-300 ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Add New Product</h3>
          <button
            className="text-gray-500 hover:text-red-500 transition text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await addProduct(formData);
            onClose();
            resetFormData();
          }}
          className="space-y-6"
        >
          {/* PRODUCT NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <div className="relative">
              <Package2Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          {/* PRODUCT PRICE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <div className="relative">
              <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>

          {/* PRODUCT IMAGE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition font-medium shadow-md ${(!formData.name || !formData.price || !formData.image || loading) && "opacity-50 cursor-not-allowed"
                }`}
              disabled={!formData.name || !formData.price || !formData.image || loading}
              // onClick={() => { addProduct(formData), resetFormData(); }}
              // onSubmit={onClose}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <PlusCircleIcon className="w-5 h-5" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
