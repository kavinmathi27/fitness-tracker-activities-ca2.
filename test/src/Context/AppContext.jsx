import { createContext, useContext, useReducer } from 'react';
import { appReducer, initialState } from '../Reducer/AppReducer';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

   
   useEffect(() => {
    const loadData = async () => {
      try {
        const token = await getToken("E0223016", "402907","set2");
        const data = await getOrders(token);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);
 
  const getActivityById = (id) =>
  state.activities.find((a) => String(a.activityId) === String(id));

  const getFilteredActivities = (criteria) => {
    return state.activities.filter((a) => {
      return true;
    });
  };

  return (
    <AppContext.Provider value={{ activities: state.activities, dispatch, getActivityById, getFilteredActivities }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
