import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Order } from "../types";
import { dummyDashboardOrdersData } from "../assets/assets";
import Loading from "../components/Loading";
import {
  ArrowLeftIcon,
  CalendarIcon,
  PackageIcon,
} from "lucide-react";

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [liveLocation, setLiveLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const foundOrder = dummyDashboardOrdersData.find(
      (o) => o._id === id
    );

    setOrder(foundOrder as unknown as Order);
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <Loading />;

  if (!order) return null;

  return (
    <div className="min-h-screen mb-20 bg-app-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-sm text-app-text-light hover:text-app-green mb-6 transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Orders
        </button>

        {/* order id, date, status */}
        <div className="bg-white rounded-2xl p-5 mb-6">
          <div className="flex items-start justify-between">

            {/* Left */}
            <div>
              <h1 className="text-xl font-semibold text-app-green">
                Order #{order._id.slice(-8).toUpperCase()}
              </h1>

              <div className="flex items-center gap-2 mt-2">
                <CalendarIcon className="size-4 text-app-text-light" />

                <span className="text-sm text-app-text-light">
                  {new Date(order.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <span className="inline-flex px-4 py-1 text-xs font-medium rounded-full bg-app-cream text-app-green">
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* Order tracking */}
        <div className="bg-white rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-6">
            <PackageIcon className="size-5 text-app-green" />

            <h2 className="text-lg font-semibold text-app-green">
              Order Tracking
            </h2>
          </div>

          {/* Tracking content */}
          <div className="text-sm text-app-text-light">
            Tracking information for your order will appear here.
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderTracking;