import axios from 'axios'

const API_URL = import.meta.env.VITE_BASE44_API_URL
const API_KEY = import.meta.env.VITE_BASE44_API_KEY

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
})

// Content operations
export const fetchContent = async (entityName) => {
  try {
    const response = await apiClient.get(`/entities/${entityName}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching ${entityName}:`, error)
    throw error
  }
}

export const updateContent = async (entityName, id, data) => {
  try {
    const response = await apiClient.put(`/entities/${entityName}/${id}`, data)
    return response.data
  } catch (error) {
    console.error(`Error updating ${entityName}:`, error)
    throw error
  }
}

export const createContent = async (entityName, data) => {
  try {
    const response = await apiClient.post(`/entities/${entityName}`, data)
    return response.data
  } catch (error) {
    console.error(`Error creating ${entityName}:`, error)
    throw error
  }
}

export const deleteContent = async (entityName, id) => {
  try {
    const response = await apiClient.delete(`/entities/${entityName}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting ${entityName}:`, error)
    throw error
  }
}

export default apiClient
