import React from "react";
import { Link } from "react-router-dom";

const Card = ({ prop }) => {
  if (!prop) return null; // Ensure prop is not undefined

  return (
    <div key={prop.id} className="group relative">
      {prop.id && (
        <Link to={`/campaign/${prop.id}`} onClick={() => window.scrollTo(0, 0)}>
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 h-96">
            <img
              src={prop.product?.image} // ✅ Corrected Image Reference
              alt={prop.title} // ✅ Use `title` instead of `name`
              className="h-full w-full object-cover object-center"
            />
          </div>
        </Link>
      )}
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to="#">
              <span aria-hidden="true" className="inset-0">
                {prop.title} {/* ✅ Use `title` instead of `name` */}
              </span>
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">
          FCFA{prop.product?.unit_price} {/* ✅ Corrected Price Reference */}
        </p>
      </div>
    </div>
  );
};

export default Card;
