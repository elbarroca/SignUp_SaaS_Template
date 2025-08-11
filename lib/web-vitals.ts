import { Metric } from 'web-vitals';

export function sendToUmami(metric: Metric) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.trackEvent(metric.name, { value: metric.value });
  }
}