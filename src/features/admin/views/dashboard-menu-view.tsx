import { useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { Button, Input } from "@/shared";
import {
  useAdminCategories,
  useAdminMenuItems,
  useCreateCategory,
  useCreateMenuItem,
  useDeleteCategory,
  useDeleteMenuItem,
  useUpdateMenuItem,
} from "../admin-query";
import type { AdminMenuItem } from "../types";

const PanelHeader = ({ title, onAdd, addLabel }: { title: string; onAdd: () => void; addLabel: string }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    <Button variant="ghost" onClick={onAdd} className="px-4 py-2 text-sm">
      <Plus className="w-4 h-4 mr-1" /> {addLabel}
    </Button>
  </div>
);

const CategoryForm = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const create = useCreateCategory();

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Nueva categoría</h3>
        <button onClick={onClose} className="text-slate-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Entradas"
        />
        <Input
          label="Tipo (slug)"
          value={type}
          onChange={(e) => setType(e.target.value.toUpperCase())}
          placeholder="ENTRADAS"
        />
      </div>
      <Button
        onClick={() => {
          if (!name || !type) return;
          create.mutate({ name, type }, { onSuccess: onClose });
        }}
        loading={create.isPending}
        className="self-end px-4 py-2"
      >
        Guardar
      </Button>
    </div>
  );
};

const ItemForm = ({
  categories,
  initial,
  onClose,
}: {
  categories: { id: string; type: string; name: string }[];
  initial?: AdminMenuItem;
  onClose: () => void;
}) => {
  const [form, setForm] = useState({
    categoryId: initial?.categoryId ?? (categories[0]?.id ?? ""),
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    price: initial?.price ?? 0,
    image: initial?.image ?? "",
    category: initial?.category ?? (categories[0]?.type ?? ""),
  });
  const create = useCreateMenuItem();
  const update = useUpdateMenuItem();
  const isPending = create.isPending || update.isPending;

  const submit = () => {
    if (!form.name || !form.description || !form.image || !form.categoryId) return;
    if (initial) {
      update.mutate({ id: initial.id, body: form }, { onSuccess: onClose });
    } else {
      create.mutate(form, { onSuccess: onClose });
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">
          {initial ? "Editar ítem" : "Nuevo ítem"}
        </h3>
        <button onClick={onClose} className="text-slate-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">Categoría</label>
          <select
            value={form.categoryId}
            onChange={(e) => {
              const cat = categories.find((c) => c.id === e.target.value);
              setForm({ ...form, categoryId: e.target.value, category: cat?.type ?? form.category });
            }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Precio"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
        <Input
          label="Imagen (URL)"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <div className="md:col-span-2">
          <Input
            label="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
      </div>

      <Button onClick={submit} loading={isPending} className="self-end px-4 py-2">
        Guardar
      </Button>
    </div>
  );
};

export const DashboardMenuView = () => {
  const categories = useAdminCategories();
  const items = useAdminMenuItems();
  const deleteCategory = useDeleteCategory();
  const deleteItem = useDeleteMenuItem();

  const [addingCategory, setAddingCategory] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminMenuItem | null>(null);
  const [addingItem, setAddingItem] = useState(false);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase opacity-80">
          Catálogo
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">Menú</h1>
      </div>

      {/* Categories */}
      <section>
        <PanelHeader
          title="Categorías"
          onAdd={() => setAddingCategory(true)}
          addLabel="Añadir categoría"
        />
        {addingCategory && <CategoryForm onClose={() => setAddingCategory(false)} />}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.data?.map((c) => (
            <div
              key={c.id}
              className="bg-linear-to-b from-[#1a0d10] to-[#12080a] border border-white/10 rounded-xl p-4 flex flex-col gap-1"
            >
              <span className="text-xs uppercase tracking-widest text-slate-500">{c.type}</span>
              <span className="font-semibold text-white">{c.name}</span>
              <span className="text-xs text-slate-400">{c._count?.items ?? 0} ítems</span>
              <button
                onClick={() => deleteCategory.mutate(c.id)}
                className="self-end text-red-400 hover:text-red-300 transition text-xs flex items-center gap-1 mt-2"
              >
                <Trash2 className="w-3 h-3" /> Eliminar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Menu items */}
      <section>
        <PanelHeader
          title="Ítems"
          onAdd={() => {
            setEditingItem(null);
            setAddingItem(true);
          }}
          addLabel="Añadir ítem"
        />
        {(addingItem || editingItem) && (
          <ItemForm
            categories={categories.data ?? []}
            initial={editingItem ?? undefined}
            onClose={() => {
              setAddingItem(false);
              setEditingItem(null);
            }}
          />
        )}
        <div className="flex flex-col gap-2">
          {items.data?.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-white font-medium">{item.name}</p>
                <p className="text-xs text-slate-400">{item.category}</p>
              </div>
              <span className="text-gold-accent font-semibold">
                ${item.price.toLocaleString("es-CO")}
              </span>
              <button
                onClick={() => {
                  setAddingItem(false);
                  setEditingItem(item);
                }}
                className="text-slate-400 hover:text-white transition"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteItem.mutate(item.id)}
                className="text-red-400 hover:text-red-300 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {!items.data?.length && !items.isLoading && (
            <p className="text-slate-500 text-sm">No hay ítems todavía.</p>
          )}
        </div>
      </section>
    </div>
  );
};
