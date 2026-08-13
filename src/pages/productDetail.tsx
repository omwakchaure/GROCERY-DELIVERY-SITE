import { useNavigate, useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import type { Product } from "../types";
import { dummyProducts } from "../assets/assets";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Loading from "../components/Loading";
import DummyReviewsSection from "../assets/DummyReviewsSection";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const { id } = useParams();
  const navigate = useNavigate();

  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setLocalQuantity(1);
    window.scrollTo(0, 0);

    const foundProduct = dummyProducts.find((p) => p._id === id);

    setProduct(foundProduct || null);

    setRelatedProducts(dummyProducts.filter((p) => p._id !== id));

    setLoading(false);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex-center">
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

  const cartItem = items.find((item) => item.product._id === product._id);
  const categoryLabel = product.category.replace(/-/g, " ");

  const inCart = !!cartItem;

  const displayQuantity = inCart ? cartItem.quantity : localQuantity;

  const handleMinus = () => {
    if (inCart) {
      if (cartItem.quantity > 1)
        updateQuantity(product._id, cartItem.quantity - 1);
      else removeFromCart(product._id);
    } else {
      setLocalQuantity(Math.max(1, localQuantity - 1));
    }
  };

  const handlePlus = () => {
    if (inCart) updateQuantity(product._id, cartItem.quantity + 1);
    else setLocalQuantity(localQuantity + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
        <Link
          to="/"
          className="hover:text-app-green transition-colors flex items-center gap-1"
        >
          <HomeIcon className="size-4" />
          Home
        </Link>

        <span>/</span>

        <Link to="/products" className="hover:text-app-green transition-colors">
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

            <h1 className="text-3xl md:text-4xl font-semibold text-app-text mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl md:text-4xl font-semibold text-app-green">
                {currency}
                {product.price.toFixed(2)}
              </span>

              {product.originalPrice > product.price && (
                <span className="text-lg text-app-text-light line-through">
                  {currency}
                  {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-app-text-light leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="text-sm text-app-success font-medium">
                  ✓ In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-sm text-app-error font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Quantity + Add to  */}
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-app-border rounded-xl overflow-hidden">
                {/* Minus */}
                <button
                  onClick={handleMinus}
                  disabled={displayQuantity <= 1}
                  className="p-3 hover:bg-app-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>

                {/* Quantity Number */}
                <span className="px-5 text-sm font-semibold min-w-[40px] text-center">
                  {displayQuantity}
                </span>

                <button
                  onClick={handlePlus}
                  disabled={
                    product.stock === 0 || displayQuantity >= product.stock
                  }
                  className="p-3 hover:bg-app-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => {
                  if (!inCart) {
                    addToCart(product, localQuantity);
                  }
                }}
                disabled={product.stock === 0}
                className={`flex-1 py-3 font-semibold rounded-xl transition-colors flex-center gap-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  active:scale-[0.98]
                  ${
                    inCart
                      ? "bg-app-cream text-app-green border border-app-green"
                      : "bg-app-orange text-white hover:bg-app-orange-dark"
                  }`}
              >
                <ShoppingCartIcon className="w-4 h-4" />

                {inCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      {product.reviewCount > 0 && <DummyReviewsSection product={product} />}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12 mb-44">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-app-gray">
                Related Products
              </h2>

              <p className="text-sm text-app-text-light mt-1">
                More from {categoryLabel}
              </p>
            </div>

            <Link
              className="text-sm font-semibold text-app-orange hover:text-app-orange-dark flex items-center gap-1 transition-colors"
              to={`/products?category=${product.category}`}
            >
              View All
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8">
            {relatedProducts.slice(0, 5).map((rp) => (
              <ProductCard key={rp._id} product={rp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
