import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

function ProductCard({ product }) {
  const { deleteProduct } = useProductStore();

  return (
    <div className="bg-white border border-indigo-100 shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-shadow duration-300">
      {/* PRODUCT IMAGE */}
      <div className="relative pt-[56.25%] bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h2>
        <p className="text-xl font-bold text-indigo-600">${Number(product.price).toFixed(2)}</p>

        {/* Actions */}
        <div className="flex justify-end space-x-2 mt-4">
          <Link
            to={`/product/${product.id}`}
            className="inline-flex items-center px-3 py-1 border border-indigo-500 text-indigo-600 rounded-md hover:bg-indigo-50 text-sm"
          >
            <EditIcon className="w-4 h-4" />
          </Link>

          <button
            onClick={() => deleteProduct(product.id)}
            className="inline-flex items-center px-3 py-1 border border-red-500 text-red-600 rounded-md hover:bg-red-50 text-sm"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
