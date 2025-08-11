interface Window {
  umami: {
    trackEvent: (eventName: string, data?: Record<string, unknown>) => void;
  };
}

type UserRole = "free" | "basic" | "pro";