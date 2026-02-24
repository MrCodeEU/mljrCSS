export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  dismissible?: boolean;
  exiting?: boolean;
  /** Action buttons */
  actions?: ToastAction[];
}

let toasts = $state<Toast[]>([]);
let position = $state<ToastPosition>('top-right');

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function add(toast: Omit<Toast, 'id'>): string {
  const id = generateId();
  const newToast: Toast = {
    id,
    dismissible: true,
    duration: 5000,
    ...toast,
  };

  toasts = [...toasts, newToast];

  // Auto dismiss
  if (newToast.duration && newToast.duration > 0) {
    setTimeout(() => {
      dismiss(id);
    }, newToast.duration);
  }

  return id;
}

function dismiss(id: string): void {
  // Set exiting state for animation
  toasts = toasts.map(t => t.id === id ? { ...t, exiting: true } : t);

  // Remove after animation
  setTimeout(() => {
    toasts = toasts.filter(t => t.id !== id);
  }, 200);
}

function clear(): void {
  toasts = [];
}

function setPosition(pos: ToastPosition): void {
  position = pos;
}

// Convenience methods
function info(message: string, title?: string, duration?: number): string {
  return add({ type: 'info', message, title, duration });
}

function success(message: string, title?: string, duration?: number): string {
  return add({ type: 'success', message, title, duration });
}

function warning(message: string, title?: string, duration?: number): string {
  return add({ type: 'warning', message, title, duration });
}

function error(message: string, title?: string, duration?: number): string {
  return add({ type: 'error', message, title, duration });
}

// Promise helper - shows loading, then success or error based on promise result
async function promise<T>(
  promiseFn: Promise<T> | (() => Promise<T>),
  options: {
    loading?: string;
    success?: string | ((data: T) => string);
    error?: string | ((error: any) => string);
  }
): Promise<T> {
  const loadingToastId = add({
    type: 'info',
    message: options.loading || 'Loading...',
    duration: 0, // No auto dismiss
    dismissible: false,
  });

  try {
    const promise = typeof promiseFn === 'function' ? promiseFn() : promiseFn;
    const result = await promise;

    // Dismiss loading toast
    dismiss(loadingToastId);

    // Show success toast
    const successMsg = typeof options.success === 'function'
      ? options.success(result)
      : (options.success || 'Success!');

    add({ type: 'success', message: successMsg });

    return result;
  } catch (err) {
    // Dismiss loading toast
    dismiss(loadingToastId);

    // Show error toast
    const errorMsg = typeof options.error === 'function'
      ? options.error(err)
      : (options.error || 'An error occurred');

    add({ type: 'error', message: errorMsg });

    throw err;
  }
}

export const toastStore = {
  get toasts() { return toasts; },
  get position() { return position; },
  add,
  dismiss,
  clear,
  setPosition,
  info,
  success,
  warning,
  error,
  promise,
};
