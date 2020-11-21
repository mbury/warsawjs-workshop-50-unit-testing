import axios from 'axios';

const req = axios.create({});

req.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error.response.status) {
      window.location.reload();
    } else {
      return Promise.reject(error);
    }
  }
);

export async function rentCar(id) {
  await req.get(`/api/cars/${id}/rent`);
}

export async function getCars() {
  const result = await req.get('/api/cars');
  return result.data;
}

export async function payDeposit(id) {
  await req.get(`/api/rentals/${id}/pay-deposit`);
}

export async function returnDeposit(id) {
  await req.get(`/api/rentals/${id}/return-deposit`);
}

export async function takeCar(id) {
  await req.get(`/api/rentals/${id}/take-car`);
}

export async function returnCar(id) {
  await req.get(`/api/rentals/${id}/return-car`);
}

export async function getRentals() {
  const result = await req.get('/api/rentals');
  return result.data;
}
