import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '@/components/DataTable/DataTable';
import type { Column } from '@/components/DataTable/DataTable';
import { fetchCustomers } from '@/api';
import type { Customer } from '@/types';
import Button from '@/components/Button';
import { Label } from '@/components/Label';

type CustomerColumn = Column<Customer>;

const CustomersPage: React.FC = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const columns = useMemo<CustomerColumn[]>(() => [
    { id: 'id', header: 'ID', accessor: 'id' },

    {
      id: 'title',
      header: 'Civilité',
      accessor: (c) => (<Label title={c.title} />),
    },

    { id: 'lastname', header: 'Nom', accessor: 'lastname' },
    { id: 'firstname', header: 'Prénom', accessor: 'firstname' },
    { id: 'postcode', header: 'Code postal', accessor: 'postcode' },
    { id: 'city', header: 'Ville', accessor: 'city' },

    {
      id: 'email',
      header: 'Email',
      accessor: (c) => (
        <a
          href={`mailto:${c.email}`}
          className="text-indigo-600 hover:text-indigo-800 hover:underline"
        >
          {c.email}
        </a>
      ),
    },

    {
      id: 'orders',
      header: 'Commandes',
      accessor: (c) => (
        <Button type='button' onClick={() =>
            navigate(`/customers/${c.id}/orders`, {
              state: { customerName: `${c.firstname} ${c.lastname}` },
            })
          }
          children="Voir les commandes"
           />
      ),
    },
  ], [navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Liste des clients</h1>

        <DataTable<Customer>
          columns={columns}
          data={customers}
          keyExtractor={(c) => c.id}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default CustomersPage;