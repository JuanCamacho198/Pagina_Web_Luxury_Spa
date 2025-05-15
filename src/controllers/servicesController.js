// src/controllers/servicesController.js
import { fetchServices } from '../models/servicesModel';

export const getAllServices = async (setServices, setError) => {
  try {
    const services = await fetchServices();
    setServices(services);
  } catch (err) {
    console.error('Error cargando servicios:', err);
    setError(err.message);
  }
};
