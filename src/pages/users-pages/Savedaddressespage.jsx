// src/pages/users-pages/SavedAddressesPage.jsx
import { useState } from "react";
import DashboardShell, { Icon } from "../../components/user-components/DashboardShell";
import "../../styles/User.css";

const INITIAL_ADDRESSES = [
  {
    id: "home",
    label: "Home",
    address: "14 Admiralty Way, Lekki Phase 1, Lagos",
    isDefault: true,
  },
  {
    id: "office",
    label: "Office",
    address: "22 Adeola Odeku St, Victoria Island, Lagos",
    isDefault: false,
  },
];

const EMPTY_FORM = { label: "", address: "", city: "", instructions: "" };

export default function SavedAddressesPage() {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  function openAddForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEditForm(a) {
    setEditingId(a.id);
    setForm({ label: a.label, address: a.address, city: "", instructions: "" });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  function handleSave(e) {
    e.preventDefault();
    if (!form.label.trim() || !form.address.trim()) return;

    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingId ? { ...a, label: form.label, address: form.address } : a
        )
      );
    } else {
      const newAddress = {
        id: `addr-${Date.now()}`,
        label: form.label,
        address: form.address,
        isDefault: addresses.length === 0,
      };
      setAddresses((prev) => [...prev, newAddress]);
    }
    closeForm();
  }

  function handleDelete(id) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  function handleSetDefault(id) {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }

  return (
    <DashboardShell
      active="addresses"
      title="Saved Addresses"
      subtitle="Manage the pickup and delivery locations you use often."
      showPromo={false}
    >
      <div className="ud-addresses-page">
        <section className="ud-section" style={{ paddingTop: 0 }}>
          {showForm && (
            <div className="ud-address-form-card">
              <p className="ud-form-title">{editingId ? "Edit Address" : "Add New Address"}</p>
              <p className="ud-form-desc">
                Save it once and pick it in a tap next time you book an errand.
              </p>
              <form onSubmit={handleSave}>
                <div className="ud-form-grid">
                  <div className="ud-field">
                    <label className="ud-field-label">
                      Label <span className="ud-req">*</span>
                    </label>
                    <input
                      className="ud-input"
                      placeholder="e.g. Home, Office"
                      value={form.label}
                      onChange={(e) => setForm({ ...form, label: e.target.value })}
                      required
                    />
                  </div>
                  <div className="ud-field">
                    <label className="ud-field-label">City / Area</label>
                    <input
                      className="ud-input"
                      placeholder="e.g. Lekki Phase 1"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                  </div>
                  <div className="ud-field ud-field-full">
                    <label className="ud-field-label">
                      Full Address <span className="ud-req">*</span>
                    </label>
                    <input
                      className="ud-input"
                      placeholder="Street, building, landmark"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className="ud-field ud-field-full">
                    <label className="ud-field-label">Delivery Instructions</label>
                    <textarea
                      className="ud-textarea"
                      placeholder="Gate code, floor, any notes for the runner"
                      value={form.instructions}
                      onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                    />
                  </div>
                </div>
                <div className="ud-address-form-actions">
                  <button type="button" className="btn btn-outline-black" onClick={closeForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-solid-black">
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          )}

          {addresses.length > 0 ? (
            <div className="ud-addresses-grid">
              {addresses.map((a) => (
                <div className="ud-address-card" key={a.id}>
                  <div className="ud-address-card-top">
                    <div className="ud-address-card-icon">
                      <Icon name="pin" size={17} />
                    </div>
                    <div>
                      <p className="ud-address-card-label">
                        {a.label}
                        {a.isDefault && <span className="ud-address-default">Default</span>}
                      </p>
                      <p className="ud-address-card-text">{a.address}</p>
                    </div>
                  </div>
                  <div className="ud-address-card-actions">
                    {!a.isDefault && (
                      <button
                        type="button"
                        className="ud-btn-pill"
                        onClick={() => handleSetDefault(a.id)}
                      >
                        Set Default
                      </button>
                    )}
                    <button type="button" className="ud-btn-pill" onClick={() => openEditForm(a)}>
                      <Icon name="edit" size={13} /> Edit
                    </button>
                    <button
                      type="button"
                      className="ud-btn-pill"
                      onClick={() => handleDelete(a.id)}
                      aria-label="Delete address"
                    >
                      <Icon name="trash" size={13} />
                    </button>
                  </div>
                </div>
              ))}

              {!showForm && (
                <button type="button" className="ud-address-card ud-address-card--add" onClick={openAddForm}>
                  <div className="ud-address-card--add-icon">
                    <Icon name="plus" size={18} />
                  </div>
                  <span>Add New Address</span>
                </button>
              )}
            </div>
          ) : (
            <div className="ud-empty">
              <div className="ud-empty-icon">
                <Icon name="pin" size={26} />
              </div>
              <h4>No Saved Addresses</h4>
              <p>Save your frequent pickup and delivery spots for faster booking.</p>
              <button type="button" className="btn btn-solid-black" onClick={openAddForm}>
                Add New Address
              </button>
            </div>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}