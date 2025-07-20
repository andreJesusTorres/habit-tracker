import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((message, type = 'info', duration = 5000) => {
        const id = Date.now() + Math.random();
        setNotifications(prev => [...prev, { id, message, type, duration }]);
        
        // Auto-remove notification after duration
        setTimeout(() => {
            setNotifications(prev => prev.filter(notification => notification.id !== id));
        }, duration);
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, []);

    const alert = useCallback((message, type = 'info') => {
        addNotification(message, type);
    }, [addNotification]);

    return (
        <NotificationContext.Provider value={{ alert, addNotification, removeNotification }}>
            {children}
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-in-out translate-x-0 opacity-100`}
                >
                    <div className={`rounded-lg shadow-lg border-l-4 p-4 ${
                        notification.type === 'success' ? 'bg-green-500 border-green-600 text-white' :
                        notification.type === 'error' ? 'bg-red-500 border-red-600 text-white' :
                        notification.type === 'warning' ? 'bg-yellow-500 border-yellow-600 text-white' :
                        'bg-blue-500 border-blue-600 text-white'
                    }`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-lg font-bold">
                                    {notification.type === 'success' ? '✓' :
                                     notification.type === 'error' ? '✕' :
                                     notification.type === 'warning' ? '⚠' : 'ℹ'}
                                </span>
                                <p className="text-sm font-medium">{notification.message}</p>
                            </div>
                            <button
                                onClick={() => removeNotification(notification.id)}
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
} 