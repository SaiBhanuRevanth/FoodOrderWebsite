import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect,useState } from 'react';


const AvailableMeals=()=>{
    const [meals,setMeals]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [httpError,setHttpError]=useState();
    useEffect(()=>{
      const fetchmeals=async()=>{
          const response= await fetch('https://reactfood-http-default-rtdb.firebaseio.com/meals.json');
          if(!response.ok){
            throw new Error('Something Went Error');
          }
          const responseData=await response.json();

          const loadedMeals=[];

          for (const key in responseData){
            loadedMeals.push({
              id:key,
              name:responseData[key].name,
              description:responseData[key].description,
              price:responseData[key].price,
            })
          }
          setMeals(loadedMeals);
          setIsLoading(false);
      };
      fetchmeals().catch(error=>{
        setIsLoading(false);
        setHttpError(error.message);
      });
    },[])

    if(isLoading){
      return (<section className={classes.MealsLoading}>
          <p>LOADING...</p>
      </section>);
    }

   if(httpError){
    return (<section className={classes.MealsError}>
      <p>{httpError}</p>
  </section>);
   }
    const mealsList=meals.map(meal=> <MealItem id={meal.id} key={meal.id} name={meal.name} price={meal.price} description={meal.description}/>)
      return(
          <section className={classes.meals}>
            <Card>
              <ul>
                {mealsList}
              </ul>
            </Card>
          </section>
      );
};

export default AvailableMeals;