import { gsap } from './gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* Importado sob demanda: só quem está no desktop e aceita movimento baixa o ScrollTrigger. */
gsap.registerPlugin(ScrollTrigger)

export { ScrollTrigger }
