import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css"; // <-- now this file exists

createApp(App).use(router).mount("#app");
