import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    name: '',
    email: '',
    phone: '',
    code: '',
    code_nfc: '',
    created_at: '',
    updated_at: '',
  }),

  actions: {
    setUser(userData) {
      this.id = userData.id || null
      this.name = userData.name || ''
      this.email = userData.email || ''
      this.phone = userData.phone || ''
      this.code = userData.code || ''
      this.code_nfc = userData.code_nfc || ''
      this.created_at = userData.created_at || ''
      this.updated_at = userData.updated_at || ''
    },

    clearUser() {
      this.$reset()
    },
  },
  //  persist:true,
})
