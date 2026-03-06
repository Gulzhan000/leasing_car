// Типы действий
export const FETCH_CARS = 'FETCH_CARS';
export const SELECT_CAR = 'SELECT_CAR';
export const CREATE_LEASE = 'CREATE_LEASE';
export const UPDATE_LEASE_STATUS = 'UPDATE_LEASE_STATUS';

// Action Creators
export const fetchCars = (cars) => ({
  type: FETCH_CARS,
  payload: cars
});

export const selectCar = (carId) => ({
  type: SELECT_CAR,
  payload: carId
});

export const createLease = (lease) => ({
  type: CREATE_LEASE,
  payload: lease
});

export const updateLeaseStatus = (leaseId, status) => ({
  type: UPDATE_LEASE_STATUS,
  payload: { leaseId, status }
});