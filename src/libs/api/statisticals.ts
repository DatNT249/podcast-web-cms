import request from '../config/axios'

export const getStatistics = async () => {
  try {
    const response = await request.get(`/statistics/counts`)
    return response?.data
  } catch (error) {
    throw error
  }
}
