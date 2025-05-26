'use client'

import { DetailItem } from '@/features/article/components'
import { useChapterValueLabel } from '@/features/chapters/hooks/useChapterValueLabel'
import { FormLayout, Input, RadioGroup, Select, UploadImage } from '@/libs/components/Form'
import { UploadAudio } from '@/libs/components/Form/UploadImg/UploadAudio'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEpisodeCreate, useEpisodeDetail, useEpisodeUpdate } from '../hooks'
import { EpisodeCreateInputSchema, EpisodeCreateInputType } from '../type'
import { error } from 'console'

const options = [
  { label: 'Có', value: 'true' },
  { label: 'Không', value: 'false' },
]

const EpisodeForm = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { episodesId } = useParams()
  const { data: episodeDetail } = useEpisodeDetail(episodesId as string)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm<EpisodeCreateInputType>({
    defaultValues: {
      title: '',
      album: '',
      artist: '',
      description: '',
      isPremium: true,
      isTop: true,
      chapterId: '',
      url: undefined,
    },
    resolver: zodResolver(EpisodeCreateInputSchema),
  })

  useEffect(() => {
    if (episodeDetail) {
      const { title, album, artist, description, isPremium, isTop, chapterId, artwork } =
        episodeDetail
      setValue('title', title as string)
      setValue('album', album as string)
      setValue('artist', artist as string)
      setValue('description', description as string)
      setValue('isPremium', isPremium ? true : false)
      setValue('isTop', isTop ? true : false)
      setValue('chapterId', chapterId as string)
      setValue('artwork', artwork as string)
    }
  }, [setValue, episodeDetail])

  const { mutate: createEpisode, isPending: isPendingCreate } = useEpisodeCreate(setError)
  const { mutate: updateEpisode, isPending: isPendingUpdate } = useEpisodeUpdate(setError)
  const { data: CHAPTERS } = useChapterValueLabel()

  type AIBookType = {
    content: string
  }

  const postAIBook = async (data: AIBookType) => {

    try {
      const response = await axios.post('http://localhost:8000/api/sumary/', {
        data,
      })
      return response.data
    } catch (err) {
      console.log(err)
    }

  }

  const { mutate, data: aiData } = useMutation({
    mutationFn: postAIBook,
  })

  const onSubmit: SubmitHandler<EpisodeCreateInputType> = (data) => {
    const submitData = { ...data, _id: episodesId as string }

    const successCallback = () => {
      queryClient.invalidateQueries()
      enqueueSnackbar(episodesId ? 'Cập nhật tập thành công' : 'Thêm mới tập thành công', {
        variant: 'success',
      })
      router.push(episodesId ? `/episodes/${episodesId}/detail` : '/episodes')
    }

    if (episodesId) {
      updateEpisode(
        {
          ...submitData,
          description: aiData?.message ? aiData.message : submitData.description,
        },
        { onSuccess: successCallback },
      )
    } else {
      createEpisode({
        ...data,
        description: aiData?.message ? aiData.message : submitData.description,
      }, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={episodesId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row">
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={episodeDetail?._id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="title"
              label="Tên tập"
              labelLeft
              placeholder="Tên tập"
              fullWidth
            />
          </Stack>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="album"
              label="Album"
              labelLeft
              placeholder="Album"
              fullWidth
            />
          </Stack>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="artist"
              label="Tác giả"
              labelLeft
              placeholder="Tác giả"
              fullWidth
            />
          </Stack>
          <Stack
            direction="column"
            gap={2}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              padding: 2,
              backgroundColor: '#fafbfc',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <Box ml={16} maxHeight={100} overflow="auto">
              {aiData && aiData?.message && (
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: '#1976d2',
                    mb: 1,
                  }}
                >
                  {aiData?.message}
                </Typography>
              )}
            </Box>

            <Stack direction="row" gap={1} alignItems="end">
              <Input
                control={control}
                name="description"
                label="Mô tả"
                labelLeft
                placeholder="Mô tả"
                multiline
                rows={3}
                fullWidth
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: 1,
                  '& textarea': {
                    fontSize: 15,
                    lineHeight: 1.6,
                  },
                }}
              />

              <Button
                variant="outlined"
                fontSize={12}
                onClick={() => {
                  mutate({
                    content: watch('description'),
                  })
                }}
              >
                Tóm tắt văn bản
              </Button>
            </Stack>
          </Stack>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Select
              control={control}
              name="chapterId"
              label="Chương"
              labelLeft
              placeholder="Chương"
              options={CHAPTERS}
              fullWidth
            />
          </Stack>
          <Stack direction={'row'} gap={1}>
            <Stack
              minWidth={120}
              padding="4px 8px"
              bgcolor="base.white"
              justifyContent="center"
              sx={{ height: 44 }}
            >
              <Typography variant="body2" color="grey.500">
                Hình ảnh
              </Typography>
            </Stack>
            <UploadImage
              name="artwork"
              control={control}
              content="Kéo và thả file hình ảnh vào đây hoặc nhấp để chọn"
            />
          </Stack>
          <Stack direction={'row'} gap={1}>
            <Stack
              minWidth={120}
              padding="4px 8px"
              bgcolor="base.white"
              justifyContent="center"
              sx={{ height: 44 }}
            >
              <Typography variant="body2" color="grey.500">
                Âm thanh
              </Typography>
            </Stack>
            <UploadAudio
              name="url"
              control={control}
              content="Kéo và thả file âm thanh vào đây hoặc nhấp để chọn"
            />
          </Stack>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} marginTop={4}>
            <RadioGroup
              control={control}
              name="isPremium"
              label="Trả phí"
              options={options}
              defaultValue="true"
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { EpisodeForm }
