import { useNavigate, useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import type { Product } from "../types";
import { dummyProducts } from "../assets/assets";
import { ArrowLeftIcon, HomeIcon, LeafIcon } from "lucide-react";
import Loading from "../components/Loading";

const ProductDetail = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setLocalQuantity(1);
    window.scrollTo(0, 0);

    const foundProduct = dummyProducts.find(
      (p) => p._id === id
    );

    setProduct(foundProduct || null);

    setRelatedProducts(
      dummyProducts.filter((p) => p._id !== id)
    );

    setLoading(false);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-app-text mb-4">
            Product not found
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="text-app-green hover:underline"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const cartItem = items.find(
    (item) => item.product._id === product._id
  );

  const inCart = !!cartItem;

  const displayQuantity = inCart
    ? cartItem.quantity
    : localQuantity;

  const categoryLabel = product.category.replace(/-/g, " ");

  return (
    <div className="min-h-screen">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">

        <Link
          to="/"
          className="hover:text-app-green transition-colors"
        >
          <HomeIcon className="size-4" />
        </Link>

        <span>/</span>

        <Link
          to="/products"
          className="hover:text-app-green transition-colors"
        >
          Products
        </Link>

        <span>/</span>

        <Link
          to={`/products?category=${product.category}`}
          className="hover:text-app-green transition-colors capitalize"
        >
          {categoryLabel}
        </Link>

        <span>/</span>

        <span className="text-app-green font-medium truncate max-w-[200px]">
          {product.name}
        </span>

      </nav>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-1.5 text-sm text-app-text-light hover:text-app-green transition-colors"
      >
        <ArrowLeftIcon className="size-4" />
        Back
      </button>

      {/* Product Details Section */}
      <div className="bg-white/50 rounded-2xl overflow-hidden">

        <div className="grid md:grid-cols-2 gap-0">

          {/* Left side - Image */}
          <div className="relative flex-center p-8 md:p-12 min-h-[320px] md:min-h-[480px]">

            <img
              src={product.image}
              alt={product.name}
              className="max-h-[360px] w-auto object-contain"
            />

            {/* Badges */}
            <div className="absolute top-5 left-5 flex flex-wrap gap-1.5">

              {/* Organic Badge */}
              {product.isOrganic && (
                <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-app-green text-white rounded-full">
                  <LeafIcon className="w-3 h-3" />
                  Organic
                </span>
              )}

              {/* Discount Badge */}
              {product.discount > 0 && (
                <span className="px-2.5 py-1 text-xs font-semibold bg-app-orange text-white rounded-full">
                  {product.discount}% OFF
                </span>
              )}

            </div>
          </div>

          {/* Right side - Details */}
          <div className="p-6 md:p-10 flex flex-col justify-center">

            {/* Category */}
            <p className="text-sm text-app-green font-medium capitalize mb-2">
              {categoryLabel}
            </p>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-semibold text-app-text mb-4">
              {product.name}
            </h1>

            {/* Product Price */}
            <div className="flex items-center gap-3 mb-4">

              <span className="text-2xl font-bold text-app-green">
                {currency}
                {product.price}
              </span>

              {product.discount > 0 && (
                <span className="text-sm text-app-text-light line-through">
                  {currency}
                  {(
                    product.price /
                    (1 - product.discount / 100)
                  ).toFixed(2)}
                </span>
              )}

            </div>

            {/* Product Description */}
            <p className="text-sm text-app-text-light leading-6 mb-6">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mb-6">

              <p className="text-sm font-medium text-app-text mb-2">
                Quantity
              </p>

              <div className="flex items-center gap-3">

                {/* Decrease */}
                <button
                  type="button"
                  onClick={() => {
                    if (displayQuantity <= 1) return;

                    if (inCart) {
                      updateQuantity(
                        product._id,
                        displayQuantity - 1
                      );
                    } else {
                      setLocalQuantity(
                        displayQuantity - 1
                      );
                    }
                  }}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-app-green hover:text-app-green transition-colors"
                >
                  -
                </button>

                {/* Quantity */}
                <span className="w-8 text-center font-medium">
                  {displayQuantity}
                </span>

                {/* Increase */}
                <button
                  type="button"
                  onClick={() => {
                    if (inCart) {
                      updateQuantity(
                        product._id,
                        displayQuantity + 1
                      );
                    } else {
                      setLocalQuantity(
                        displayQuantity + 1
                      );
                    }
                  }}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-app-green hover:text-app-green transition-colors"
                >
                  +
                </button>

              </div>
            </div>

            {/* Cart Actions */}
            <div className="flex gap-3">

              {!inCart ? (
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product);
                  }}
                  className="flex-1 bg-app-green text-white py-3 px-6 rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Add to Cart
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      removeFromCart(product._id);
                    }}
                    className="flex-1 border border-red-500 text-red-500 py-3 px-6 rounded-xl font-medium hover:bg-red-50 transition-colors"
                  >
                    Remove from Cart
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="flex-1 bg-app-green text-white py-3 px-6 rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    Go to Cart
                  </button>
                </>
              )}

            </div>

          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <section className="mt-10">

        <h2 className="text-xl font-semibold text-app-text mb-4">
          Customer Reviews
        </h2>

        <div className="bg-white/50 rounded-xl p-6">
          <p className="text-sm text-app-text-light">
            No reviews yet.
          </p>
        </div>

      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">

          <h2 className="text-2xl font-semibold text-app-text mb-6">
            Related Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            {relatedProducts.slice(0, 4).map((relatedProduct) => (
              <Link
                key={relatedProduct._id}
                to={`/products/${relatedProduct._id}`}
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >

                <div className="h-40 flex items-center justify-center mb-4">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="max-h-full w-auto object-contain"
                  />
                </div>

                <h3 className="font-medium text-app-text truncate">
                  {relatedProduct.name}
                </h3>

                <p className="text-sm text-app-text-light capitalize mt-1">
                  {relatedProduct.category.replace(
                    /-/g,
                    " "
                  )}
                </p>

              </Link>
            ))}

          </div>

        </section>
      )}

    </div>
  );
};

export default ProductDetail;