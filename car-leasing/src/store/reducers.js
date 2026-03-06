// Начальное состояние
const initialState = {
  cars: [],
  selectedCar: null,
  leases: [],
  user: { 
    id: 1, 
    name: 'Администратор', 
    email: 'admin@test.com', 
    role: 'admin'
  }
};

// Главный редьюсер
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CARS':
      return {
        ...state,
        cars: action.payload
      };
      
    case 'SELECT_CAR':
      return {
        ...state,
        selectedCar: action.payload
      };
      
    case 'CREATE_LEASE':
      return {
        ...state,
        leases: [...state.leases, action.payload]
      };
      
    case 'UPDATE_LEASE_STATUS':
      return {
        ...state,
        leases: state.leases.map(lease =>
          lease.id === action.payload.leaseId
            ? { ...lease, status: action.payload.status }
            : lease
        )
      };
      
    default:
      return state;
  }
};

export default rootReducer;