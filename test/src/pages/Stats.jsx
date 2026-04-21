import { useContext, useEffect } from 'react';
import { AppContext } from '../Context/AppContext';

const Stats = () => {
  const { state: { activities } } = useContext(AppContext);

  const totalActivities = activities.length;
  const goalAchievedCount = activities.filter(a => a.goalAchieved).length;
  const goalNotAchievedCount = activities.filter(a => !a.goalAchieved).length;
  const totalSteps = activities.reduce((acc, a) => acc + a.steps, 0);
  const totalCalories = activities.reduce((acc, a) => acc + a.caloriesBurned, 0);
  const totalMinutes = activities.reduce((acc, a) => acc + a.workoutMinutes, 0);

  useEffect(() => {
    window.appState = { totalActivities, goalAchievedCount, goalNotAchievedCount };
  }, [totalActivities, goalAchievedCount, goalNotAchievedCount]);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Activities: <span data-testid="total-activities">{totalActivities}</span></p>
      <p>Goals Achieved: <span data-testid="goal-achieved">{goalAchievedCount}</span></p>
      <p>Goals Not Achieved: <span data-testid="goal-not-achieved">{goalNotAchievedCount}</span></p>
      <p>Total Steps: {totalSteps}</p>
      <p>Total Calories: {totalCalories} kcal</p>
      <p>Total Minutes: {totalMinutes} min</p>
    </div>
  );
};

export default Stats;
