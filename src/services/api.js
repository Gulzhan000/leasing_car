import carsData from '../data/cars.json';

// Простая имитация API
const api = {
  getCars: () => {
    return Promise.resolve(carsData.cars);
  },

  getCarById: (id) => {
    const car = carsData.cars.find(c => c.id === parseInt(id));
    return Promise.resolve(car);
  },

  createLease: (leaseData) => {
    const newLease = {
      id: Date.now(),
      ...leaseData,
      status: 'на рассмотрении',
      date: new Date().toISOString()
    };
    
    // Сохраняем в localStorage
    const leases = JSON.parse(localStorage.getItem('leases') || '[]');
    leases.push(newLease);
    localStorage.setItem('leases', JSON.stringify(leases));
    
    return Promise.resolve(newLease);
  },

  getLeases: () => {
    const leases = JSON.parse(localStorage.getItem('leases') || '[]');
    return Promise.resolve(leases);
  },

  updateLeaseStatus: (leaseId, status) => {
    const leases = JSON.parse(localStorage.getItem('leases') || '[]');
    const updatedLeases = leases.map(lease =>
      lease.id === leaseId ? { ...lease, status } : lease
    );
    localStorage.setItem('leases', JSON.stringify(updatedLeases));
    return Promise.resolve({ leaseId, status });
  }
};

export default api;