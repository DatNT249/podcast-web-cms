import request from '../config/axios'

export const getStatistics = async () => {
  try {
    const response = await request.get(`/statisticals/counts`)
    return response?.data
  } catch (error) {
    throw error
  }
}