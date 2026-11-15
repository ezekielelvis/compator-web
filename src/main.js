import './styles/main.css'
import { MainLayout } from './templates/MainLayout.js'
import { initEase } from './animations/motion.js'
import { initSmooth } from './animations/smooth.js'
import { initCursor } from './animations/cursor.js'
import { initChrome } from './animations/chrome.js'
import { startRouter } from './router/router.js'

initEase()
document.getElementById('app').innerHTML = MainLayout()
initSmooth()
initChrome()
initCursor()
startRouter()
