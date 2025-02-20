// services/notification.js - Notification service
export function showNotification(message, type = 'info') {
    // Simple notification using alert for now
    // In a real React app, you might use a toast library like react-toastify
    if (type === 'error') {
      alert('❌ ' + message);
    } else if (type === 'success') {
      alert('✅ ' + message);
    } else {
      alert(message);
    }
  }