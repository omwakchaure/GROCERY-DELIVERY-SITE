import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";

const CartSidebar = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const {
    items,
    updateQuantity,
    removeFromCart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const deliveryFee = cartTotal > 20 ? 0 : 1.99;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 z-50 transition-opacity"
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-app-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="size-5" />
            <h2 className="text-lg font-medium">Your Cart</h2>
            <span className="px-2 py-0.5 text-xs font-semibold bg-app-cream rounded-full">
              {items.length} items
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl hover:bg-app-cream transition-colors"
            aria-label="Close cart"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center text-zinc-500">
              <div>
                <p className="text-base font-medium text-zinc-700">Your cart is empty</p>
                <p className="mt-1 text-sm">Add a product to see it here.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product._id}
                  className="flex gap-3 rounded-xl border border-app-border p-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="size-20 rounded-lg object-cover bg-app-cream"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-medium text-zinc-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {currency}
                      {product.price.toFixed(1)} x {quantity}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-app-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product._id, quantity - 1)
                          }
                          className="p-2 hover:bg-app-cream"
                          aria-label={`Decrease ${product.name}`}
                        >
                          <MinusIcon className="size-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-medium">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product._id, quantity + 1)
                          }
                          className="p-2 hover:bg-app-cream"
                          aria-label={`Increase ${product.name}`}
                        >
                          <PlusIcon className="size-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-app-border px-5 py-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-zinc-600">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? "Free" : `${currency}${deliveryFee.toFixed(2)}`}</span>
          </div>
          <div className="flex items-center justify-between text-base font-medium text-zinc-900">
            <span>Total</span>
            <span>
              {currency}
              {grandTotal.toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsCartOpen(false);
              navigate("/checkout");
            }}
            className="w-full rounded-xl bg-app-orange px-4 py-3 text-sm font-medium text-white hover:bg-app-orange-dark transition-colors disabled:opacity-50"
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
