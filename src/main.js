import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, fa, faGlobeAmericas, faViruses, faDna, faNewspaper, faComment, faPaperPlane, faPen, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createHead } from '@vueuse/head'

library.add(fas, faGlobeAmericas, faViruses, faDna, faNewspaper, faComment, faPaperPlane, faPen, faTimesCircle )

const head = createHead()

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).use(head).mount('#app')