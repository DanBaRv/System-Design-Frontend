import { createSlice, createAsyncThunk,type PayloadAction} from '@reduxjs/toolkit';
import { api } from '../api';
import type { ChannelResponseDto } from '../api/Api';
import { channels as MOCK_CHANNELS } from '../data/channels';

interface ChannelsState {
  minSubscribers: string;
  channels: ChannelResponseDto[];
  feedChannel: ChannelResponseDto | null;
  draftChannel: ChannelResponseDto | null;
  loading: boolean;
  error: string | null;
  selectedChannel: ChannelResponseDto | null;
}

const initialState: ChannelsState = {
  minSubscribers: '',
  channels: [],
  feedChannel: null,
  draftChannel: null,
  loading: false,
  error: null,
  selectedChannel: null
};

const asDto = (list: typeof MOCK_CHANNELS) => list as unknown as ChannelResponseDto[];

/** Каталог каналов с фильтром */
export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { channels: ChannelsState; auth: { isAuthenticated: boolean } };
    try {
      const res = await api.api.channelsList({
        minSubscribers: state.channels.minSubscribers === '' ? undefined : state.channels.minSubscribers,
      });
      return res.data;
    } catch {
      return rejectWithValue({
        message: 'Бэкенд недоступен',
        isGuest: !state.auth.isAuthenticated,
      });
    }
  },
);

/** Лента: без id — первый канал; с id + next — следующий по кольцу */
export const getFeed = createAsyncThunk(
  'channels/getFeed',
  async (params: { id?: string; next?: boolean }, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { isAuthenticated: boolean } };
    try {
      const res = await api.api.feedGet({
        id: params.id,
        next: params.next ? 'true' : undefined,
      });
      return res.data;
    } catch {
      return rejectWithValue({
        message: 'Бэкенд недоступен',
        isGuest: !state.auth.isAuthenticated,
      });
    }
  },
);

/** Лайк / снятие лайка */
export const setLike = createAsyncThunk(
  'channels/setLike',
  async ({ id, value }: { id: number; value: 0 | 1 }, { rejectWithValue }) => {
    try {
      const res = await api.api.likeSet(String(id), { value });
      return { id, likes: res.data.likes, value };
    } catch {
      return rejectWithValue('Не удалось поставить лайк');
    }
  },
);

/** Получение черновика текущего пользователя */
export const getDraft = createAsyncThunk(
  'channels/getDraft',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.api.draftGet();
      return res.data || null;
    } catch {
      return rejectWithValue('Не удалось загрузить черновик');
    }
  },
);

/** Создание черновика (multipart/form-data) */
export const createDraft = createAsyncThunk(
  'channels/createDraft',
  async (
    payload: { name: string; cover: File; video: File },
    { rejectWithValue },
  ) => {
    try {
      const res = await api.api.draftCreate(payload as any);
      return res.data;
    } catch {
      return rejectWithValue('Не удалось создать черновик');
    }
  },
);

/** Публикация черновика */
export const publishChannel = createAsyncThunk(
  'channels/publishChannel',
  async (
    payload: { name: string; subscribersCount: number; averageReach: number; description?: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await api.api.draftPublish(payload);
      return res.data;
    } catch {
      return rejectWithValue('Не удалось опубликовать канал');
    }
  },
);

/** Удаление своего канала */
export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async (id: number, { rejectWithValue }) => {
    try {
      await api.api.channelDelete(String(id));
      return id;
    } catch {
      return rejectWithValue('Не удалось удалить канал');
    }
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setMinSubscribers(state, action) {
      state.minSubscribers = action.payload;
    },
    resetFilters(state) {
      state.minSubscribers = '';
    },
    clearDraft(state) {
      state.draftChannel = null;
    },
    setSelectedChannel(state, action: PayloadAction<ChannelResponseDto | null>) {
      state.selectedChannel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Каталог
      .addCase(getChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload.catalogChannels ?? [];
      })
      .addCase(getChannels.rejected, (state, action: any) => {
        state.loading = false;
        if (action.payload?.isGuest) {
          state.channels = asDto(
            MOCK_CHANNELS.filter(
              (ch) => state.minSubscribers === '' || ch.subscribersCount >= Number(state.minSubscribers),
            ),
          );
        } else {
          state.error = action.payload?.message ?? 'Ошибка загрузки каталога';
        }
      })

      // Лента
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feedChannel = action.payload;
      })
      .addCase(getFeed.rejected, (state, action: any) => {
        state.loading = false;
        if (action.payload?.isGuest) {
          const mocks = asDto(MOCK_CHANNELS);
          if (action.meta.arg.next && state.feedChannel) {
            const idx = mocks.findIndex((c) => c.id === state.feedChannel?.id);
            state.feedChannel = mocks[(idx + 1) % mocks.length] ?? mocks[0] ?? null;
          } else {
            state.feedChannel = mocks[0] ?? null;
          }
        } else {
          state.error = action.payload?.message ?? 'Ошибка загрузки ленты';
        }
      })

      // Лайк
      .addCase(setLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(setLike.fulfilled, (state, action) => {
        state.loading = false;
        if (state.feedChannel && state.feedChannel.id === action.payload.id) {
          state.feedChannel.likes = action.payload.likes;
          state.feedChannel.liked = action.payload.value;
        }
      })
      .addCase(setLike.rejected, (state) => {
        state.loading = false;
      })

      // Черновик
      .addCase(getDraft.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDraft.fulfilled, (state, action) => {
        state.loading = false;
        state.draftChannel = action.payload;
      })
      .addCase(getDraft.rejected, (state) => {
        state.loading = false;
        state.draftChannel = null;
      })

      // Создание черновика
      .addCase(createDraft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDraft.fulfilled, (state, action) => {
        state.loading = false;
        state.draftChannel = action.payload;
      })
      .addCase(createDraft.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload ?? 'Ошибка создания черновика';
      })

      // Публикация
      .addCase(publishChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishChannel.fulfilled, (state) => {
        state.loading = false;
        state.draftChannel = null;
      })
      .addCase(publishChannel.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload ?? 'Ошибка публикации';
      })

      // Удаление
      .addCase(deleteChannel.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = state.channels.filter((ch) => ch.id !== action.payload);
      })
      .addCase(deleteChannel.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setMinSubscribers, resetFilters, clearDraft, setSelectedChannel } = channelsSlice.actions;
export default channelsSlice.reducer;