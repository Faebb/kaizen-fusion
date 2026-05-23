import { ArrowRight } from "lucide-react";
import { createPortal } from "react-dom";

type FloatingCartProps = {
    total?: number;
    onClick: () => void;
};

export default function FloatingCart({ total = 0, onClick }: FloatingCartProps) {
    return createPortal(
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={onClick}
                className="group flex items-center gap-3 rounded-full bg-primary pl-4 pr-2 py-2 text-white shadow-2xl shadow-primary/40 hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
            >
                <div className="flex flex-col items-start mr-2">
                    <span className="text-[10px] font-medium uppercase opacity-90">
                        Total pedido
                    </span>
                    <span className="font-display text-lg font-bold">
                        ${total.toLocaleString("es-CO")}
                    </span>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <ArrowRight />
                </div>
            </button>
        </div>,
        document.body
    );
}