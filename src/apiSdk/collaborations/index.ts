import axios from 'axios';
import queryString from 'query-string';
import { CollaborationInterface, CollaborationGetQueryInterface } from 'interfaces/collaboration';
import { GetQueryInterface } from '../../interfaces';

export const getCollaborations = async (query?: CollaborationGetQueryInterface) => {
  const response = await axios.get(`/api/collaborations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCollaboration = async (collaboration: CollaborationInterface) => {
  const response = await axios.post('/api/collaborations', collaboration);
  return response.data;
};

export const updateCollaborationById = async (id: string, collaboration: CollaborationInterface) => {
  const response = await axios.put(`/api/collaborations/${id}`, collaboration);
  return response.data;
};

export const getCollaborationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/collaborations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCollaborationById = async (id: string) => {
  const response = await axios.delete(`/api/collaborations/${id}`);
  return response.data;
};
