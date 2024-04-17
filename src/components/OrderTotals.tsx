import { useMemo } from "react";
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers";

type OrderTotalsProps = {
    order: OrderItem[];
    setOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>
    tip: number;
}

export default function OrderTotals({order, setOrder, tip} : OrderTotalsProps) {

    const subtotalAmount = useMemo(() => order.reduce((total, item) => total + (item.price * item.quantity), 0), [order]);
    const tipAmount = useMemo(() => subtotalAmount * tip, [tip, subtotalAmount]);
    const totalAmount = useMemo(() => subtotalAmount + tipAmount, [subtotalAmount, tipAmount])

    const deleteOrder = () => {
        setOrder([]);
    }

  return (
    <>
        <div className="space-y-3">
            <h2 className="font-black text-2xl">Totales y Propina:</h2>
            <p>Subtotal a pagar: {""} 
                <span className="font-bold">{formatCurrency(subtotalAmount)}</span>
            </p>

            <p>Propina: {""} 
                <span className="font-bold">{formatCurrency(tipAmount)}</span>
            </p>

            <p>Total a pagar: {""} 
                <span className="font-bold">{formatCurrency(totalAmount)}</span>
            </p>
        </div>

        <button
            onClick={deleteOrder}
            className="w-full bg-teal-300 hover:bg-teal-200 rounded-md text-lg py-3 font-black"
        >
            Vaciar Orden
        </button>
    </>
    
  )
}
