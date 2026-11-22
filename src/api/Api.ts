/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ChannelResponseDto {
  /** @example 1 */
  id: number;
  /** @example "Дневник менеджера" */
  name: string;
  /** @example "@manager_diary" */
  username?: string;
  /** @example "Бизнес" */
  topic?: string;
  /** @example 125000 */
  subscribersCount: number | null;
  /** @example 40000 */
  averageReach: number | null;
  /** @example 35000 */
  adPrice?: number;
  /** @example 12 */
  repostsCount?: number;
  /** @example 340 */
  commentsCount?: number;
  /** @example "Канал про менеджмент и карьеру" */
  description?: string | null;
  /** @example "published" */
  status: string;
  /** @example "cover_abc123.jpg" */
  coverUrl?: string | null;
  /** @example "video_abc123.mp4" */
  videoUrl?: string | null;
  /** @example 5 */
  nextId?: number | null;
  /** @example "2024-05-01T10:00:00.000Z" */
  channelCreated: string;
  /** @example "2024-06-01T10:00:00.000Z" */
  channelFormed?: string | null;
  /** @example 1 */
  creatorId: number;
  /**
   * Количество лайков
   * @example 7
   */
  likes?: number;
  /**
   * 1 — своя услуга, 0 — чужая
   * @example 1
   */
  isMine?: number;
  /**
   * 1 — лайк поставлен текущим пользователем, 0 — нет
   * @example 1
   */
  liked?: number;
}

export interface CatalogResponseDto {
  catalogChannels: ChannelResponseDto[];
}

export interface PublishChannelDto {
  /** @example "Новый канал" */
  name: string;
  /** @example 50000 */
  subscribersCount: number;
  /** @example 15000 */
  averageReach: number;
  /** @example "Описание канала" */
  description?: string;
}

export interface SuccessResponseDto {
  /** @example true */
  success: boolean;
}

export interface LikeChannelDto {
  /** @example 1 */
  value: 0 | 1;
}

export interface LikeResponseDto {
  /** @example 7 */
  likes: number;
}

export interface RegisterUserDto {
  /**
   * Имя пользователя
   * @example "Роман"
   */
  name: string;
  /**
   * Email (уникальный)
   * @example "test@mail.ru"
   */
  email: string;
  /**
   * Пароль (будет захеширован)
   * @example "12345"
   */
  password: string;
}

export interface LoginUserDto {
  /**
   * Email
   * @example "test@mail.ru"
   */
  email: string;
  /**
   * Пароль
   * @example "12345"
   */
  password: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title PostTrace API
 * @version 1.0
 * @contact
 *
 * Веб-сервис истории пересылки постов в каналах
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags channels
     * @name DraftGet
     * @summary Чтение последнего черновика канала, при его наличии
     * @request GET:/api/channels/draft
     * @secure
     */
    draftGet: (params: RequestParams = {}) =>
      this.request<ChannelResponseDto, any>({
        path: `/api/channels/draft`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags channels
     * @name FeedGet
     * @summary Лента: без id — с начала, с id — конкретный канал
     * @request GET:/api/channels/feed
     */
    feedGet: (
      query?: {
        id?: string;
        next?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ChannelResponseDto, any>({
        path: `/api/channels/feed`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags channels
     * @name ChannelsList
     * @summary Каталог каналов с фильтром по минимальному числу подписчиков
     * @request GET:/api/channels
     */
    channelsList: (
      query?: {
        minSubscribers?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CatalogResponseDto, any>({
        path: `/api/channels`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags channels
     * @name DraftCreate
     * @summary Создание черновика канала
     * @request POST:/api/channels/add
     * @secure
     */
    draftCreate: (
      data: {
        name: string;
        /** @format binary */
        cover: File;
        /** @format binary */
        video: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<ChannelResponseDto, any>({
        path: `/api/channels/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags channels
     * @name DraftPublish
     * @summary Публикация услуги (смена статуса)
     * @request PUT:/api/channels/publish
     * @secure
     */
    draftPublish: (data: PublishChannelDto, params: RequestParams = {}) =>
      this.request<ChannelResponseDto, any>({
        path: `/api/channels/publish`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags channels
     * @name ChannelDelete
     * @summary Удаление канала
     * @request DELETE:/api/channels/{id}
     * @secure
     */
    channelDelete: (id: string, params: RequestParams = {}) =>
      this.request<SuccessResponseDto, any>({
        path: `/api/channels/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags channels
     * @name LikeSet
     * @summary Поставить или снять лайк
     * @request POST:/api/channels/{id}/like
     * @secure
     */
    likeSet: (id: string, data: LikeChannelDto, params: RequestParams = {}) =>
      this.request<LikeResponseDto, any>({
        path: `/api/channels/${id}/like`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthRegister
     * @summary Регистрация: пароль хешируется bcrypt
     * @request POST:/api/users/registration
     */
    authRegister: (data: RegisterUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/registration`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthLogin
     * @summary Точка входа пользователя: сверка логина и пароля
     * @request POST:/api/users/login
     */
    authLogin: (data: LoginUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthLogout
     * @summary Выход из системы
     * @request POST:/api/users/logout
     */
    authLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/logout`,
        method: "POST",
        ...params,
      }),
  };
}
