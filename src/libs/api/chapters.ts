import {
  ChapterCreateInputType,
  ChapterDetailResponseType,
  ChapterListQueryInputType,
  ChapterListType,
  ChapterUpdateInputType,
  QueryInputChapterDetailType,
} from '@/features/chapters'
import request from '../config/axios'



export const getListChapters = async (params: ChapterListQueryInputType) => {
  const { page, limit, name, isPremium } = params
  try {
    const response = await request.get<ChapterListType>('/chapters/all/pagination', {
      params: {
        page,
        limit,
        name,
        isPremium
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getChapter = async (_id: string) => {
  try {
    const response = await request.get<ChapterDetailResponseType>(`/chapters/${_id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createChapter = async (data: ChapterCreateInputType) => {
  try {
    const response = await request.post('/chapters', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateChapter = async (data: ChapterUpdateInputType) => {
  try {
    const { _id, ...dataRequest } = data
    const response = await request.patch(`/chapters/${_id}`, dataRequest)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getChapterDetail = async ({ column, chapterId }: QueryInputChapterDetailType) => {
  try {
    const response = await request.get<ChapterDetailResponseType>(`/chapters/${chapterId}`, {
      params: {
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteChapter = async (chapterId: string) => {
  try {
    const response = await request.delete(`/chapters/${chapterId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getChapterValueLabels = async () => {
  try {
    const response = await request.get('/chapters/value-labels/chapter')
    return response.data
  } catch (error) {
    throw error
  }
}
