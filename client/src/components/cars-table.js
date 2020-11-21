import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { rentCar, getCars } from '../api';

export default function CarsTable() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRentSuccess, setRentStatus] = React.useState(false);

  React.useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      try {
        const cars = await getCars();
        setData(cars);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }

    fetch();
  }, []);

  async function onRental(id) {
    await rentCar(id);

    setRentStatus(true);
  }
  if (isRentSuccess) {
    return <Redirect to="/rentals" />;
  }
  return (
    <table>
      <thead>
        <tr>
          <th> Id</th>
          <th> Producent</th>
          <th> Model</th>
          <th> Cena</th>
          <th> Action</th>
        </tr>
      </thead>
      <tbody>
        {isLoading && (
          <tr>
            <td colSpan="5">Trwa ładowanie ...</td>
          </tr>
        )}
        {data.map(car => {
          return (
            <tr data-testid={`car-${car.car_id}`} key={car.car_id}>
              <td>{car.car_id}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.price}</td>
              <td>
                <button onClick={() => onRental(car.car_id)}>wynajmij</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
