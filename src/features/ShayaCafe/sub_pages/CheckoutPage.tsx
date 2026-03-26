import { useState, useMemo } from "react";
import type { FC, ChangeEvent, FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { CartItem } from "../context/CartContext";
import { formatCOP, unitPriceFor } from "../constants";

// ─── Types ─────────────────────────────────────────────────────────
type PayMethod = "efectivo" | "transferencia" | "nequi" |  "";

interface FormData {
  name: string;
  phone: string;
  department: string;
  city: string;
  address: string;
  paymentMethod: PayMethod;
  notes: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

// ─── Config — change this to your real WhatsApp number ─────────────
const WA_NUMBER = "573124639729"; // Format: country code + number, no + or spaces

// ─── Helpers ───────────────────────────────────────────────────────
// cart is parsed via useSearchParams inside the component

const fmt = (n: number) => formatCOP(n);

// ─── Icons ─────────────────────────────────────────────────────────
const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowLeftIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const WAIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.533 5.847L.057 23.887l6.207-1.46A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.844 0-3.577-.487-5.078-1.338l-.362-.213-3.684.866.899-3.572-.235-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

// ─── Step dot ──────────────────────────────────────────────────────
const StepDot: FC<{ n: number; active: boolean; done: boolean; label: string }> = ({
  n, active, done, label,
}) => (
  <div className="flex flex-col items-center gap-1.5">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${done
          ? "bg-[#5A8270] text-white"
          : active
            ? "bg-[#C07B52] text-white"
            : "bg-[#E8DDD0] text-[#8A7060]"
        }`}
    >
      {done ? <CheckIcon className="w-3.5 h-3.5" /> : n}
    </div>
    <span
      className={`font-sans text-[10px] font-semibold tracking-[.06em] uppercase ${active ? "text-[#271409]" : "text-[#8A7060]"
        }`}
    >
      {label}
    </span>
  </div>
);

// ─── Input field wrapper ───────────────────────────────────────────
const Field: FC<{
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}> = ({ label, required, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-sans text-[11px] font-bold tracking-[.12em] uppercase text-[#5A8270]">
      {label} {required && <span className="text-[#C07B52]">*</span>}
    </label>
    {children}
    {error && (
      <p className="font-sans text-[11px] text-red-500">{error}</p>
    )}
  </div>
);

const inputBase =
  "w-full font-sans text-sm text-[#271409] rounded-xl px-4 py-2.5 border outline-none transition-colors duration-200 bg-white placeholder:text-[#C5B8AC]";
const inputNormal = `${inputBase} border-[#E8DDD0] focus:border-[#C07B52]`;
const inputError = `${inputBase} border-red-400 bg-red-50`;

// ─── Payment methods ───────────────────────────────────────────────
const PAYMENT_LABELS: Record<string, string> = {
  efectivo: "Efectivo",
  transferencia: "Transferencia bancaria",
  nequi: "Nequi",
  daviplata: "Daviplata",
};

// ─── CheckoutPage ──────────────────────────────────────────────────
const CheckoutPage: FC = () => {
  const [searchParams] = useSearchParams();
  const navigateBack = useNavigate();

  const items = useMemo((): CartItem[] => {
    try {
      const raw = searchParams.get("cart");
      return raw ? (JSON.parse(decodeURIComponent(raw)) as CartItem[]) : [];
    } catch {
      return [];
    }
  }, [searchParams]);

  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    city: "",
    department: "",
    address: "",
    paymentMethod: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const totalPrice = items.reduce(
    (acc, i) =>
      acc + unitPriceFor(i.product, i.weightGrams) * i.quantity,
    0
  );
  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0);

  // ── Validation ─────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Ingresa tu nombre completo";
    if (!form.phone.trim() || !/^\d{7,15}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Teléfono inválido (solo números)";
    if (!form.address.trim()) e.address = "Ingresa tu dirección de entrega";
    if (!form.city.trim()) e.city = "Ingresa tu ciudad";
    if (!form.department.trim()) e.department = "Ingresa tu departamento";
    if (!form.paymentMethod) e.paymentMethod = "Selecciona un método de pago";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ── Build WhatsApp message ──────────────────────────────────────
  const buildMessage = (): string => {
    const lines = [
      "*NUEVO PEDIDO — SHAYA CAFÉ*",
      "",
      "*Productos:*",
      ...items.map((i) => {
        const w =
          i.weightGrams != null ? `${i.weightGrams} g` : i.product.weight;
        const unit = unitPriceFor(i.product, i.weightGrams);
        return `  • ${i.product.name} × *${i.quantity}* (${w}) — *${formatCOP(unit)} c/u*`;
      }),
      "",
      `*Total:* ${fmt(totalPrice)}`,
      "",
      "*Datos del cliente:*",
      `  • *Nombre*: ${form.name}`,
      `  • *Teléfono*: ${form.phone}`,
      `  • *Ciudad*: ${form.city}`,
      `  • *Departamento*: ${form.department}`,
      `  • *Dirección*: ${form.address}`,
      `  • *Pago*: ${PAYMENT_LABELS[form.paymentMethod] ?? form.paymentMethod}`,
      ...(form.notes.trim() ? [`  • *Notas*: ${form.notes}`] : []),
    ];
    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(`https://wa.me/${WA_NUMBER}?text=${buildMessage()}`, "_blank");
  };

  // ── Empty cart ─────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F5EF] flex flex-col items-center justify-center gap-5 px-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#EDE7DE]">
          <svg className="w-7 h-7 text-[#C07B52]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <p className="font-display text-xl font-bold text-[#271409]">No hay productos en el pedido</p>
        <button
          onClick={() => navigateBack("/")}
          className="font-sans text-xs font-semibold tracking-wide uppercase text-white bg-[#C07B52] hover:bg-[#271409] transition-colors duration-300 rounded-full px-7 py-2.5 border-0 cursor-pointer"
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F5EF]">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-50 px-5 bg-[#F9F5EF]/96 backdrop-blur-xl border-b border-[#E8DDD0]">
        <div className="max-w-[900px] mx-auto h-14 flex items-center justify-between">
          <button
            onClick={() => navigateBack("/")}
            className="bg-transparent border-0 cursor-pointer flex items-center gap-2.5 relative z-[501]"
          >
            <img
              src="/logo_sin_fondo.ico"
              alt="Shaya Café"
              className={`h-10 sm:h-8 md:h-12 w-auto object-contain transition-all duration-[400ms] `}
            />
            <span
              className={`text-[#402d0f] font-display italic text-2xl font-semibold transition-colors duration-[400ms] "
            }`}
            >
              Shaya <span className="text-[#f3990d]">Café</span>
            </span>
          </button>
          <span 
            onClick={() => navigateBack("/")}
            className="hover:cursor-pointer font-sans text-xs font-semibold tracking-[.08em] uppercase text-[#8A7060]">
            Finalizar pedido
          </span>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-4 py-8 md:py-12">

        {/* ── Step indicator ── */}
        <div className="flex items-center justify-center gap-4 mb-8 md:mb-10">
          <StepDot n={1} active={step === 1} done={step > 1} label="Tu pedido" />
          <div
            className={`flex-1 max-w-[60px] h-0.5 rounded-full transition-colors duration-500 ${step > 1 ? "bg-[#5A8270]" : "bg-[#E8DDD0]"
              }`}
          />
          <StepDot n={2} active={step === 2} done={false} label="Tus datos" />
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 md:gap-8 items-start">

          {/* ── Left: steps ── */}
          <div>

            {/* STEP 1 — review order */}
            {step === 1 && (
              <div>
                <h1 className="font-display text-[26px] font-bold text-[#271409] mb-6">
                  Revisa tu pedido
                </h1>

                <div className="flex flex-col gap-3 mb-6">
                  {items.map(({ product, quantity, weightGrams }) => (
                    <div
                      key={`${product.id}-${weightGrams ?? "x"}`}
                      className="flex gap-4 rounded-2xl p-4 bg-white border border-[#E8DDD0]"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={product.imgA} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-[9.5px] font-bold tracking-[.18em] uppercase text-[#5A8270] mb-0.5">
                          {product.tagline}
                        </p>
                        <p className="font-display text-[15px] font-bold text-[#271409] truncate">{product.name}</p>
                        <p className="font-sans text-xs text-[#8A7060] mt-0.5">
                          {weightGrams != null ? `${weightGrams} g` : product.weight}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between flex-shrink-0">
                        <span className="font-display text-base font-bold text-[#C07B52]">
                          {formatCOP(unitPriceFor(product, weightGrams))}
                        </span>
                        <span className="font-sans text-xs text-[#8A7060]">× {quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full font-sans text-sm font-bold tracking-wide uppercase text-white bg-[#C07B52] hover:bg-[#271409] transition-colors duration-300 border-0 rounded-full py-3.5 cursor-pointer"
                >
                  Continuar con mis datos →
                </button>
              </div>
            )}

            {/* STEP 2 — customer form */}
            {step === 2 && (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex items-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    aria-label="Volver"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EDE7DE] hover:bg-[#E0D6CA] transition-colors duration-200 border-0 cursor-pointer flex-shrink-0"
                  >
                    <ArrowLeftIcon className="w-4 h-4 text-[#271409]" />
                  </button>
                  <h1 className="font-display text-[26px] font-bold text-[#271409]">
                    Tus datos
                  </h1>
                </div>

                <div className="flex flex-col gap-4">

                  {/* Name */}
                  <Field label="Nombre completo" required error={errors.name}>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ej: María García"
                      className={errors.name ? inputError : inputNormal}
                    />
                  </Field>

                  {/* Phone */}
                  <Field label="Teléfono / WhatsApp" required error={errors.phone}>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Ej: 3001234567"
                      className={errors.phone ? inputError : inputNormal}
                    />
                  </Field>

                  {/* Departamento */}
                  <Field label="Departamento" required error={errors.department}>
                    <input
                      type="text"
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      placeholder="Ej: Cundinamarca"
                      className={errors.department ? inputError : inputNormal}
                    />
                  </Field>

                  {/* City */}
                  <Field label="Ciudad" required error={errors.city}>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Ej: Bogotá"
                      className={errors.city ? inputError : inputNormal}
                    />
                  </Field>

                  {/* Address */}
                  <Field label="Dirección de entrega" required error={errors.address}>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Ej: Cra 15 #85-20, Apto 301"
                      className={errors.address ? inputError : inputNormal}
                    />
                  </Field>


                  {/* Payment */}
                  <Field label="Forma de pago" required error={errors.paymentMethod}>
                    <select
                      name="paymentMethod"
                      value={form.paymentMethod}
                      onChange={handleChange}
                      className={`${errors.paymentMethod ? inputError : inputNormal} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'12'%20height%3D'8'%20viewBox%3D'0%200%2012%208'%3E%3Cpath%20d%3D'M1%201l5%205%205-5'%20stroke%3D'%238A7060'%20stroke-width%3D'1.8'%20stroke-linecap%3D'round'%20fill%3D'none'%2F%3E%3C%2Fsvg%3E")] bg-no-repeat bg-[right_14px_center] pr-9`}
                    >
                      <option value="">Selecciona...</option>
                      {Object.entries(PAYMENT_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Notes */}
                  <Field label="Notas adicionales" error={errors.notes}>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Instrucciones especiales, referencias del lugar, etc."
                      rows={3}
                      className={`${errors.notes ? inputError : inputNormal} resize-none`}
                    />
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 font-sans text-sm font-bold tracking-wide uppercase text-white bg-[#25D366] hover:bg-[#1ebe59] transition-colors duration-300 border-0 rounded-full py-3.5 cursor-pointer mt-2"
                  >
                    <WAIcon className="w-4 h-4" />
                    Enviar pedido por WhatsApp
                  </button>

                  <p className="font-sans text-xs text-[#8A7060] text-center">
                    Se abrirá WhatsApp con todos los detalles. Un agente confirmará tu pedido en breve.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ── Right: order summary (sticky) ── */}
          <aside className="rounded-2xl p-5 bg-white border border-[#E8DDD0] shadow-[0_4px_20px_rgba(39,20,9,.06)] md:sticky md:top-[80px]">
            <h2 className="font-display text-base font-bold text-[#271409] mb-4">
              Resumen del pedido
            </h2>

            {/* Item list */}
            <div className="flex flex-col gap-3 pb-4 border-b border-[#E8DDD0]">
              {items.map(({ product, quantity, weightGrams }) => (
                <div
                  key={`${product.id}-${weightGrams ?? "x"}`}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C07B52] text-white font-sans text-[11px] font-bold flex-shrink-0">
                      {quantity}
                    </span>
                    <span className="font-sans text-sm text-[#271409] truncate">
                      {product.name}
                      {weightGrams != null ? ` · ${weightGrams} g` : ""}
                    </span>
                  </div>
                  <span className="font-sans text-sm font-semibold text-[#271409] flex-shrink-0">
                    {formatCOP(unitPriceFor(product, weightGrams) * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex justify-between">
                <span className="font-sans text-sm text-[#8A7060]">
                  Subtotal ({totalCount} {totalCount === 1 ? "producto" : "productos"})
                </span>
                <span className="font-sans text-sm font-semibold text-[#271409]">{fmt(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-sm text-[#8A7060]">Envío</span>
                <span className="font-sans text-sm font-semibold text-[#5A8270]">A confirmar</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#E8DDD0]">
                <span className="font-display text-[15px] font-bold text-[#271409]">Total</span>
                <span className="font-display text-lg font-bold text-[#C07B52]">{fmt(totalPrice)}</span>
              </div>
            </div>

            {/* Payment method pills */}
            <div className="mt-4 pt-4 border-t border-[#E8DDD0] flex flex-wrap gap-1.5">
              {Object.values(PAYMENT_LABELS).map((m) => (
                <span
                  key={m}
                  className="font-sans text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#F3EDE4] text-[#8A7060]"
                >
                  {m}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;