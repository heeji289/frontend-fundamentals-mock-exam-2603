import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type ReservationStatusMessage = {
  type: 'success' | 'error';
  text: string;
} | null;

export function useStatusMessage() {
  const location = useLocation();
  
  const locationState = location.state as { message?: string } | null;
  const [message, setMessage] = useState<ReservationStatusMessage>(
    locationState?.message ? { type: 'success', text: locationState.message } : null
  );

  useEffect(() => {
    const initialMessage = locationState?.message;

    if (!initialMessage) {
      return;
    }

    window.history.replaceState({}, '');
  }, [locationState]);

  const showSuccessMessage = (text: string) => {
    setMessage({ type: 'success', text });
  };

  const showErrorMessage = (text: string) => {
    setMessage({ type: 'error', text });
  };

  return {
    message,
    showSuccessMessage,
    showErrorMessage,
  };
}
