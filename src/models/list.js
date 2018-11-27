import { queryFakeList } from '@/services/api';

export default {
  namespace: 'list',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      console.log(response)
      yield put({
        type: 'queryList',
        payload: response
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload.apis
      };
    },
    fetchList(state,action){
      console.log(action)
      const newList = []
      for(let i =0;i<state.list.length;i++){
        for(let j =0;j<state.list[i].tags.length;j++){
          if(state.list[i].tags[j].indexOf(action.payload) !== -1){
            newList.push(state.list[i])
          }
        }
      }
      return {
        ...state,
         list: newList
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
