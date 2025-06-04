import axios from 'axios';
import type { ApiResponse, Character } from '../types/character';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const api = {
  getCharacters: async (page: number = 1): Promise<ApiResponse> => {
    const response = await axios.get(`${BASE_URL}/character/?page=${page}`);
    return response.data;
  },

  getCharacter: async (id: number): Promise<Character> => {
    const response = await axios.get(`${BASE_URL}/character/${id}`);
    return response.data;
  }
}; 