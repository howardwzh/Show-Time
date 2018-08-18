import _cloneDeep from 'lodash/cloneDeep'
import _set from 'lodash/set'
import _get from 'lodash/get'
import {data} from '../../pages/skrollr/assets/data/'

const skrollr = {
  state: {
    skrollrData: [],
    skrollrDataChange: 1
  },
  mutations: {
    'skrollr/initData' (state) {
      const dataFromCache = localStorage.getItem('skrollrData')
      state.skrollrData = dataFromCache ? JSON.parse(dataFromCache) : _cloneDeep(data)
      state.skrollrDataChange = 1 + state.skrollrDataChange % 2
    },
    'skrollr/updateData' (state, {pos, val}) {
      const level = pos.split('.')
      _set(state, level, val)
      state.skrollrDataChange = 1 + state.skrollrDataChange % 2
    },
    'skrollr/addData' (state, {pos}) {
      const level = pos.split('.')
      const tempLevel = pos.replace(/.\d+./g, '.0.').split('.')
      const tempState = {
        skrollrData: _cloneDeep(data)
      }
      const originArray = _get(state, level)
      originArray.push(_get(tempState, tempLevel)[0])
      state.skrollrDataChange = 1 + state.skrollrDataChange % 2
    },
    'skrollr/deleteData' (state, {pos}) {
      const level = pos.split('.')
      const index = level.pop()
      const originArray = _get(state, level)
      originArray.splice(index, 1)
      state.skrollrDataChange = 1 + state.skrollrDataChange % 2
    },
    'skrollr/addStyle' (state, {pos, style}) {
      const level = pos.split('.')
      _get(state, level).push(style)
      state.skrollrDataChange = 1 + state.skrollrDataChange % 2
    }
  },
  actions: {
    'skrollr/initData' ({commit}) {
      commit('skrollr/initData')
    },
    'skrollr/updateData' ({commit}, {pos, val}) {
      if (/true|false/.test(val)) {
        val = val === 'true'
      }
      commit('skrollr/updateData', {pos, val})
    },
    'skrollr/addData' ({commit}, {pos}) {
      commit('skrollr/addData', {pos})
    },
    'skrollr/deleteData' ({commit}, {pos}) {
      commit('skrollr/deleteData', {pos})
    },
    'skrollr/addStyle' ({commit}, {pos, style}) {
      commit('skrollr/addStyle', {pos, style})
    }
  }
}
export default skrollr