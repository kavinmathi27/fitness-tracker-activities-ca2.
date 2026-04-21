import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const Filter = () => {
  const { getFilteredActivities } = useContext(AppContext);
  const [criteria, setCriteria] = useState({ name: '', goalAchieved: undefined, minCalories: '', maxCalories: '', startDate: '', endDate: '' });

  const filtered = getFilteredActivities(criteria);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setCriteria(p => ({ ...p, [name]: type === 'checkbox' ? (checked || undefined) : (value || undefined) }));
  };

  return (
    <div>
      <h2>Filter Activities</h2>
      <input  name="name"        placeholder="Name"         value={criteria.name ?? ''}        onChange={handle} />
      <input  name="minCalories" placeholder="Min Calories" value={criteria.minCalories ?? ''} onChange={handle} type="number" />
      <input  name="maxCalories" placeholder="Max Calories" value={criteria.maxCalories ?? ''} onChange={handle} type="number" />
      <input  name="startDate"   type="date"                value={criteria.startDate ?? ''}   onChange={handle} />
      <input  name="endDate"     type="date"                value={criteria.endDate ?? ''}     onChange={handle} />
      <label><input type="checkbox" name="goalAchieved" checked={!!criteria.goalAchieved} onChange={handle} /> Goal Achieved only</label>
      <button onClick={() => setCriteria({ name: '', goalAchieved: undefined, minCalories: '', maxCalories: '', startDate: '', endDate: '' })}>Reset</button>

      <p>{filtered.length} result(s)</p>
      <ul>
        {filtered.map(a => (
          <li key={a.activityId} data-testid="activity-item">
            <strong>{a.name}</strong> | {a.date} | {a.steps} steps | {a.caloriesBurned} kcal | {a.workoutMinutes} min | {a.goalAchieved ? '✅' : '❌'}
            {' '}<Link to={`/activities/${a.activityId}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;