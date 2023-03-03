export const url = {
    baseUrl: import.meta.env.VITE_APP_ENV === 'production' || import.meta.env.VITE_APP_ENV === 'staging' ? '' : import.meta.env.VITE_APP_BASE_API,
    requestLogger: '/request_logger'
}