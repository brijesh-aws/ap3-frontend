import { Temple, TempleWithDistance, SearchRequest } from '../types/Temple';

const API_BASE_URL = 'http://localhost:5000/api'; // Update this for production

export class TempleService {
  static async searchTemples(searchParams: SearchRequest): Promise<TempleWithDistance[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/temples/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const temples = await response.json();
      return temples;
    } catch (error) {
      console.error('Error searching temples:', error);
      throw error;
    }
  }

  static async getAllTemples(): Promise<Temple[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/temples`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const temples = await response.json();
      return temples;
    } catch (error) {
      console.error('Error fetching all temples:', error);
      throw error;
    }
  }

  static async getTempleById(id: number): Promise<Temple | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/temples/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const temple = await response.json();
      return temple;
    } catch (error) {
      console.error('Error fetching temple by ID:', error);
      throw error;
    }
  }

  static validateZipcode(zipcode: string): boolean {
    return /^\d{5}(-\d{4})?$/.test(zipcode.trim());
  }
}