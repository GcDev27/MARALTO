import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/*
  Só o núcleo do GSAP entra no carregamento inicial, porque a abertura anima
  assim que a página aparece. O ScrollTrigger fica em ./rolagem.ts.
*/
gsap.registerPlugin(useGSAP)

/* Condições usadas em gsap.matchMedia: só anima quem não pediu movimento reduzido. */
export const comMovimento = '(prefers-reduced-motion: no-preference)'
export const desktopComMovimento = `${comMovimento} and (min-width: 900px)`

export { gsap, useGSAP }
