import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Button, Input } from "@/shared";
import {
  useAdminTables,
  useCreateTable,
  useDeleteTable,
  useUpdateTable,
} from "../admin-query";
import { TABLE_TYPES, TABLE_TYPE_LABELS, type TableType } from "../types";

const TableForm = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState<{ tableNumber: number; tableType: TableType; capacity: number }>({
    tableNumber: 1,
    tableType: "LOW",
    capacity: 2,
  });
  const create = useCreateTable();

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Nueva mesa</h3>
        <button onClick={onClose} className="text-slate-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Input
          label="Número"
          type="number"
          value={form.tableNumber}
          onChange={(e) => setForm({ ...form, tableNumber: Number(e.target.value) })}
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">Tipo</label>
          <select
            value={form.tableType}
            onChange={(e) => setForm({ ...form, tableType: e.target.value as TableType })}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900"
          >
            {TABLE_TYPES.map((t) => (
              <option key={t} value={t}>
                {TABLE_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Capacidad"
          type="number"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
        />
      </div>
      <Button
        onClick={() => create.mutate(form, { onSuccess: onClose })}
        loading={create.isPending}
        className="self-end px-4 py-2"
      >
        Guardar
      </Button>
    </div>
  );
};

export const DashboardTablesView = () => {
  const tables = useAdminTables();
  const remove = useDeleteTable();
  const update = useUpdateTable();
  const [adding, setAdding] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase opacity-80">
            Salón
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">Mesas</h1>
        </div>
        <Button variant="ghost" onClick={() => setAdding(true)} className="px-4 py-2 text-sm">
          <Plus className="w-4 h-4 mr-1" /> Añadir mesa
        </Button>
      </div>

      {adding && <TableForm onClose={() => setAdding(false)} />}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {tables.data?.map((t) => (
          <div
            key={t.id}
            className="bg-linear-to-b from-[#1a0d10] to-[#12080a] border border-white/10 rounded-xl p-4 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-slate-500">
                Mesa {t.tableNumber}
              </span>
              <button
                onClick={() => remove.mutate(t.id)}
                className="text-red-400 hover:text-red-300 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-2xl font-bold text-gold-accent">{TABLE_TYPE_LABELS[t.tableType]}</p>
            <p className="text-xs text-slate-400">Capacidad: {t.capacity}</p>
            <button
              onClick={() =>
                update.mutate({ id: t.id, body: { isOccupied: !t.isOccupied } })
              }
              className={`mt-1 text-xs px-2.5 py-1 rounded-full border self-start ${
                t.isOccupied
                  ? "border-red-300/30 text-red-300 bg-red-300/10"
                  : "border-green-300/30 text-green-300 bg-green-300/10"
              }`}
            >
              {t.isOccupied ? "Ocupada" : "Libre"}
            </button>
          </div>
        ))}

        {!tables.isLoading && !tables.data?.length && (
          <p className="text-slate-500 text-sm col-span-full">Aún no hay mesas.</p>
        )}
      </div>
    </div>
  );
};
