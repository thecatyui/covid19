import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, fa, faGlobeAmericas, faViruses, faDna, faNewspaper, faComment, faPaperPlane, faPen, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, faGlobeAmericas, faViruses, faDna, faNewspaper, faComment, faPaperPlane, faPen, faTimesCircle )

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).mount('#app')