import { useEffect, useReducer } from 'react';
import axios from 'axios';
import store from 'store';
import { tokenKey, baseUrl } from '../config/settings';

/**
 * useReducer hook 을 이용하기 위한 action 처리
 * REST API 호출의 시작과 종료에 해당하는 액션입니다.
 * author: dante@stunitas.com (2019.08.27)
 */
const actions = {
  REQUEST_START: 'REQUEST_START',
  REQUEST_END: 'REQUEST_END',
};

/**
 * 모든 요청에 access_token 을 추가하기 위한 인터셉터
 * async / wait 모듈에서도 상관없이 사용할 수 있습니다.
 * author: dante@stunitas.com (2019.08.27)
 */
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.get(tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.ContentType = 'application/json';
    config.headers['X-CSRF-TOKEN'] = document.getElementsByName(
      'csrf-token'
    )[0].content;
    return config;
  },
  (err) => Promise.reject(err)
);

/**
 * @param {hash} options
 * 최초 state 를 options 으로 넘겨줄 수 있습니다.
 * 페이지가 로드될 때 (componentMount) data fetching 하고자 하면 manual: false 로 전달합니다.
 * 버튼을 눌렀을 때 data fetching 하는 방식이면 manual: true 로 전달합니다.
 * author: dante@stunitas.com (2019.08.27)
 */

function createInitialState(options) {
  return {
    loading: !options.manual,
  };
}

/**
 * useReducer 에 의해 관리되는 reducer 입니다.
 * @param {hash} state : 최초 상태
 * @param {hash} action : useReducer 에서 관리되는 상태
 */
function reducer(state, action) {
  switch (action.type) {
    case actions.REQUEST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.REQUEST_END:
      return {
        ...state,
        loading: false,
        ...(action.error ? {} : { data: action.payload.data }),
        [action.error ? 'error' : 'response']: action.payload,
      };
    default:
      return state;
  }
}

async function request(config, dispatch) {
  try {
    dispatch({ type: actions.REQUEST_START });
    const response = await axiosInstance(config);
    dispatch({ type: actions.REQUEST_END, payload: response });
  } catch (error) {
    dispatch({ type: actions.REQUEST_END, payload: error, error: true });
  }
}

/**
 *
 * @param config : GET 방식의 요청을 위해서는 config 항목에 url 에 해당하는 string 을 넘겨야 합니다.
 * @param options : 요청방식에 따라 추가적으로 필요한 데이터 (data, method 등의 정보) 를 넘겨야 합니다.
 * author: dante@stunitas.com (2019.08.27)
 */
export default function useRestApi(config, options) {
  if (typeof config === 'string') {
    config = {
      url: config,
    };
  }

  const [state, dispatch] = useReducer(reducer, createInitialState(options));

  useEffect(() => {
    if (!options.manual) {
      request(config, dispatch);
    }
  }, [JSON.stringify(config)]);

  return [
    state,
    (configOverride) => {
      return request({ ...config, ...configOverride }, dispatch);
    },
  ];
}
