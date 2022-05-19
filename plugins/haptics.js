import Haptics from '@/utils/haptics'

export default ({ app }, inject) => {
  inject('haptics', Haptics)
}
