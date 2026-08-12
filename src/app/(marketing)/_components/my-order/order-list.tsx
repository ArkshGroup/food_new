"use client";

import React, { useState } from "react";
import { OrderCard } from "./order-card";
import { IMyOrdersGetAll } from "../../_types/order";

export function OrdersList({ orders }: { orders: IMyOrdersGetAll[] }) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleOrder = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="space-y-4 w-full">
      {orders.map((order) => (
        <React.Fragment key={order.id}>
          <OrderCard key={order.id} order={order} />
        </React.Fragment>
      ))}
    </div>
  );
}
