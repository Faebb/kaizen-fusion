import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "./socket-client";

export function useOrderSocket(tenantId: string | null | undefined) {
  const queryClient = useQueryClient();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!tenantId) return;

    const socket = getSocket();

    const onConnect = () => {
      setConnected(true);
      socket.emit("join:tenant", tenantId);
    };

    const onDisconnect = () => setConnected(false);

    const invalidateOrders = () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("order:created", invalidateOrders);
    socket.on("order:status-updated", invalidateOrders);

    if (!socket.connected) socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("order:created", invalidateOrders);
      socket.off("order:status-updated", invalidateOrders);
    };
  }, [tenantId, queryClient]);

  return { connected };
}
