import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DataTable from '../components/DataTable';
import { fetchOrdersByCustomer } from '../api';
import type { Order } from '../types';
import { formatDate } from '../utils/dateFormat';

interface LocationState {
  customerName?: string;
}

const OrdersPage: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  //
  const location = useLocation();

  const state = location.state as LocationState;
  const customerName = state?.customerName ?? `Client #${customerId}`;

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //
  useEffect(() => {
    if (!customerId) return;
    fetchOrdersByCustomer(Number(customerId))
      .then(setOrders)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [customerId]);

  // Calcule le total des commandes
  const total = orders.reduce((sum, o) => sum + o.price * o.quantity, 0);

  // Devise par défaut (au cas où il n'y aurait aucune commande)
  const currency = orders[0]?.currency ?? 'EUR';

  // Vérifie s'il y a plusieurs devises différentes dans les commandes
  const currencies = new Set(orders.map(o => o.currency));
  const multipleCurrencies = currencies.size > 1;
  

  const columns = [
    { header: 'Nom', accessor: 'last_name' as keyof Order },
    { header: 'Réf. achat', accessor: 'purchase_identifier' as keyof Order },
    { header: 'Produit', accessor: 'product_id' as keyof Order },
    { header: 'Qté', accessor: 'quantity' as keyof Order },
    {
      header: 'Prix unitaire',
      accessor: (o: Order) => (
        <span className="font-medium text-slate-800">
          {o.price.toFixed(2)}{' '}
          <span className="text-xs text-slate-400 font-normal">{o.currency}</span>
        </span>
      ),
    },
    {
      header: 'Date',
      accessor: (o: Order) => (
        <span className="text-slate-500 text-xs">{formatDate(o.date)}</span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 text-sm text-slate-600
            hover:text-slate-900 transition-colors group cursor-pointer"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 19l-7-7 7-7"/>
          </svg>
          Retour aux clients
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Commandes —{' '}
            <span className="text-indigo-600">{customerName}</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {orders.length} commande{orders.length > 1 ? 's' : ''}
          </p>
        </div>

        <DataTable<Order>
          columns={columns}
          data={orders}
          keyExtractor={(o) => o.id}
          isLoading={isLoading}
          error={error}
        />

        {!isLoading && !error && orders.length > 0 && (
          <div className="mt-4 flex justify-end">
            {multipleCurrencies ? (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                  Total indisponible (devises multiples)
            </div>
              ) : (
                <div className="inline-flex items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-6 py-3">
                  <span className="text-sm text-indigo-600 font-medium">Total</span>
                  <span className="text-xl font-bold text-indigo-900">
                    {total.toFixed(2)}{' '}
                    <span className="text-sm font-normal text-indigo-500">{currency}</span>
                  </span>
                </div>
              )}
            
          </div>
        )}

      </div>
    </div>
  );
};

export default OrdersPage;