import axios from 'axios';
import queryString from 'query-string';
import { IdeaInterface, IdeaGetQueryInterface } from 'interfaces/idea';
import { GetQueryInterface } from '../../interfaces';

export const getIdeas = async (query?: IdeaGetQueryInterface) => {
  const response = await axios.get(`/api/ideas${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createIdea = async (idea: IdeaInterface) => {
  const response = await axios.post('/api/ideas', idea);
  return response.data;
};

export const updateIdeaById = async (id: string, idea: IdeaInterface) => {
  const response = await axios.put(`/api/ideas/${id}`, idea);
  return response.data;
};

export const getIdeaById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/ideas/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteIdeaById = async (id: string) => {
  const response = await axios.delete(`/api/ideas/${id}`);
  return response.data;
};
