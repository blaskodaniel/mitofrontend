import { APIClient } from './axiosInit';

export const searchURLpattern = (dep, arr, date) =>
  `https://mock-air.herokuapp.com/search?departureStation=${dep}&arrivalStation=${arr}&date=${date}`;

export const Search = (dep, arr, date) => {
  return APIClient.get(searchURLpattern(dep, arr, date));
};

export const GetAllStation = () => {
  return APIClient.get(process.env.REACT_APP_ALLSTATION);
};
