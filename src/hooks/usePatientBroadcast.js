// libs
import { useEffect, useRef } from "react";

export function usePatientBroadcast(onMessage) {
  const channelRef = useRef(null);

  useEffect(() => {
    const channel = new BroadcastChannel("patients-sync");
    channelRef.current = channel;

    channel.onmessage = (event) => {
      onMessage(event.data);
    };

    return () => {
      channel.close();
    };
  }, [onMessage]);

  const broadcastChange = (type, payload = {}) => {
    channelRef.current?.postMessage({ type, payload });
  };

  return { broadcastChange };
}
