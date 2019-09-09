import PropJockey from "https://unpkg.com/propjockey@0.0.3/src/propjockey.js"

const fpsCallback = (function () {
  const rollingAverage = (function () {
    const entries = []
    const sum = (t, v) => t + v
    const avg = () => entries.reduce(sum, 0) / entries.length
    return num => {
      entries.unshift(num)
      entries.splice(10)
      return avg()
    }
  })()
  let lastFPS = 0
  let lastClass = "init-fps"
  let awfulCount = 0
  let haulted = false
  // let lastMS = Date.now()
  const bgFPSEl = document.getElementById("bgFPS")
  return (animation, objectInProgress, animationInstanceState) => {
    if (haulted) {
      return
    }
    // const deltaTime = Date.now() - lastMS
    const deltaTime = animation.config.timingPool.deltaTime
    // lastMS = Date.now()
    const currentFPS = Math.min(1000 / deltaTime, 99)
    const fpsAvg = Math.round(rollingAverage(currentFPS))
    if (lastFPS !== fpsAvg) {
      bgFPSEl.innerHTML = fpsAvg
      lastFPS = fpsAvg
      let newClass = ""
      if (fpsAvg > 59) {
        newClass = "great-fps"
      } else if (fpsAvg > 44) {
        newClass = "good-fps"
      } else if (fpsAvg > 29) {
        newClass = "fair-fps"
      } else if (fpsAvg > 19) {
        newClass = "bad-fps"
      } else {
        newClass = "awful-fps"
      }
      if (newClass !== lastClass) {
        bgFPSEl.parentNode.classList.remove(lastClass)
        bgFPSEl.parentNode.classList.add(newClass)
        lastClass = newClass
      }
    }
    if (fpsAvg < 20) {
      awfulCount++
      if (awfulCount > 50) {
        bgFPSEl.parentNode.classList.add("awful-fps-hault")
        document.body.classList.add("background-haulted")
        animation.pause(objectInProgress)
        haulted = true
      }
    }
  }
})()


// --pjAnim-
const presetnationContainer = document.querySelector(".header-presentation")
const presetnationEl = document.querySelector(".presentation-el")
const presentationText = document.querySelector(".presentation-text")
const presentationAnim = new PropJockey({
  repeat: true,
  repeatDelay: 4000,
  defaultSetter: "setter.element.cssVar.unit",
  props: {
    text: {
      slide: x => x,
      setter: (obj, propName, newVal, prop) => {
        if (prop.__oldValue !== newVal) {
          prop.__oldValue = newVal
          presentationText.innerHTML = newVal
        }
      },
      keyframes: [
        // grey standard div, augs with 0 size: tr-clip-x l-clip-y bl-clip tl-round br-round b-clip-x exe
        { position: 0, value: "Introducing augmented-ui", ease: "ease.step-start" },
        { position: 2500, value: "Cyberpunk inspired web design just got a whole lot easier", ease: "ease.step-start" },
        // color shifts to gold, aug sizes increased to defaults in the css file
        // 1/3 way through shift, border added with opacity start dropping
        // 2/3 way through shift, inset added
        { position: 2500 + 8000, value: "Each feature (aug) stays in place for any size element", ease: "ease.step-start" },
        // grow width to 700
        // then grow height to 500
        { position: 2500 + 8000 + 6000, value: "Fine-tune the position<br>of augs along an edge", ease: "ease.step-start" },
        // l-offset-y 0px -> 50px, b-offset 0px -> -50px (1 sec)
        // l-offset-y 50px -> -50px, b-offset -50px -> 50px (2 sec)
        // then return height and width to previous (550 h 350 w), shrink all values to 0 exept (1 sec)
        //   top right becomes 100, "initial", "initial"
        { position: 2500 + 8000 + 6000 + 4000, value: "Several augs to<br>mix and match", ease: "ease.step-start" },
        // flip through 5 on top right for 0.5s each, end at no augs
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: "Learn<br>more!<br>|<br>V", ease: "ease.step-start" }
        // tl-rect tr-rect bl-clip br-clip t-clip exe (draw arrow down)
      ]
    },
    augs: {
      slide: x => x,
      setter: (obj, propName, newVal, prop) => {
        if (prop.__oldValue !== newVal) {
          prop.__oldValue = newVal
          presetnationEl.setAttribute("augmented-ui", newVal)
        }
      },
      keyframes: [
        { position: 0, value: "tr-clip-x l-clip-y bl-clip tl-round br-round b-clip-x exe" },
        { position: 2500 + 8000 + 6000 + 4000, value: "exe" },
        { position: 2500 + 8000 + 6000 + 4000 + 1000, value: "exe tr-clip" },
        { position: 2500 + 8000 + 6000 + 4000 + 2000, value: "exe tr-round" },
        { position: 2500 + 8000 + 6000 + 4000 + 3000, value: "exe tr-rect" },
        { position: 2500 + 8000 + 6000 + 4000 + 4000, value: "exe tr-clip-x" },
        { position: 2500 + 8000 + 6000 + 4000 + 5000, value: "exe tr-clip-y" },
        { position: 2500 + 8000 + 6000 + 4000 + 6000, value: "exe t-clip r-clip" },
        { position: 2500 + 8000 + 6000 + 4000 + 7500, value: "exe t-rect r-rect" },
        { position: 2500 + 8000 + 6000 + 4000 + 9000, value: "exe t-clip-x r-clip-x" },
        { position: 2500 + 8000 + 6000 + 4000 + 10500, value: "exe t-clip-y r-clip-y" },
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: "exe" },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 100, value: "exe tl-rect tr-rect bl-clip br-clip t-clip" }
      ]
    },
    "--pjAnim-height": {
      unit: "px",
      keyframes: [
        { position: 0, value: 350 },
        { position: 2500 + 8000 + 3000, value: 350 },
        { position: 2500 + 8000 + 4000, value: 500 },
        { position: 2500 + 8000 + 6000 + 3000, value: 500 },
        { position: 2500 + 8000 + 6000 + 4000, value: 350 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 350 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 550 }
      ]
    },
    "--pjAnim-width": {
      unit: "px",
      keyframes: [
        { position: 0, value: 550 },
        { position: 2500 + 8000, value: 550 },
        { position: 2500 + 8000 + 2000, value: 700 },
        { position: 2500 + 8000 + 6000 + 3000, value: 700 },
        { position: 2500 + 8000 + 6000 + 4000, value: 550 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 550 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 300 }
      ]
    },
    "--pjAnim-inset": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },
        { position: 2500 + 6000, value: 0 },
        { position: 2500 + 8000, value: 7 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 7 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 12 }
      ]
    },
    "--pjAnim-inset-bg": {
      setter: "setter.element.cssVar",
      slide: "slide.color.hex",
      keyframes: [
        { position: 0, value: "#9c9258" },
        { position: 2500, value: "#9c9258" },
        { position: 2500 + 2000, value: "#ffd700" }
      ]
    },
    "--pjAnim-border": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },
        { position: 2500 + 2000, value: 0 },
        { position: 2500 + 4000, value: 5 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 5 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 10 }
      ]
    },
    "--pjAnim-border-bg": {
      setter: "setter.element.cssVar",
      slide: "slide.color.hex",
      keyframes: [
        { position: 0, value: "#ffd700" }
      ]
    },
    "--pjAnim-border-opacity": {
      setter: "setter.element.cssVar",
      keyframes: [
        { position: 0, value: 1 },
        { position: 2500 + 2000, value: 1 },
        { position: 2500 + 4000, value: 0.5 }
      ]
    },
    "--pjAnim-l-offset": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500 + 8000 + 6000, value: 0 },
        { position: 2500 + 8000 + 6000 + 1000, value: 50 },
        { position: 2500 + 8000 + 6000 + 3000, value: -50 }
      ]
    },
    "--pjAnim-b-offset": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500 + 8000 + 6000, value: 0 },
        { position: 2500 + 8000 + 6000 + 1000, value: -100 },
        { position: 2500 + 8000 + 6000 + 3000, value: 100 }
      ]
    },
    "--pjAnim-tl": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 10 },
        { position: 2500 + 8000, value: 10 },
        { position: 2500 + 8000 + 6000 + 3000, value: 10 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 }
      ]
    },
    "--pjAnim-tl-height": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 0 },
        { position: 2500 + 8000, value: 0 },
        { position: 2500 + 8000 + 6000 + 3000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 350 }
      ]
    },
    "--pjAnim-tl-width": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 0 },
        { position: 2500 + 8000, value: 0 },
        { position: 2500 + 8000 + 6000 + 3000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 75 }
      ]
    },
    "--pjAnim-tr": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 20 },
        { position: 2500 + 8000, value: 20 },
        { position: 2500 + 8000 + 6000 + 3000, value: 20 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 1, value: 100 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 100 }
      ]
    },
    "--pjAnim-tr-height": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 20 },
        { position: 2500 + 8000, value: 20 },
        { position: 2500 + 8000 + 6000 + 3000, value: 20 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0, ease: "ease.step-start" },
        { position: 2500 + 8000 + 6000 + 4000 + 1000, value: 70, ease: "ease.step-end" }, // "exe tr-clip"
        { position: 2500 + 8000 + 6000 + 4000 + 2000, value: 50, ease: "ease.step-end" }, // "exe tr-round"
        { position: 2500 + 8000 + 6000 + 4000 + 3000, value: 50, ease: "ease.step-end" }, // "exe tr-rect"
        { position: 2500 + 8000 + 6000 + 4000 + 4000, value: 40, ease:  "ease.step-end" },  // "exe tr-clip-x"
        { position: 2500 + 8000 + 6000 + 4000 + 5000, value: 120, ease: "ease.step-end" },  // "exe tr-clip-y"
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 350 }
      ]
    },
    "--pjAnim-tr-width": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 160 },
        { position: 2500 + 8000, value: 160 },
        { position: 2500 + 8000 + 6000 + 3000, value: 160 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0, ease: "ease.step-start" },
        { position: 2500 + 8000 + 6000 + 4000 + 1000, value: 70, ease: "ease.step-end" }, // "exe tr-clip"
        { position: 2500 + 8000 + 6000 + 4000 + 2000, value: 50, ease: "ease.step-end" }, // "exe tr-round"
        { position: 2500 + 8000 + 6000 + 4000 + 3000, value: 100, ease: "ease.step-end" }, // "exe tr-rect"
        { position: 2500 + 8000 + 6000 + 4000 + 4000, value: 120, ease: "ease.step-end" }, // "exe tr-clip-x"
        { position: 2500 + 8000 + 6000 + 4000 + 5000, value: 40, ease:  "ease.step-end" },   // "exe tr-clip-y"
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 75 }
      ]
    },
    "--pjAnim-br": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 20 },
        { position: 2500 + 8000, value: 20 },
        { position: 2500 + 8000 + 6000 + 3000, value: 20 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 }
      ]
    },
    "--pjAnim-br-height": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 0 },
        { position: 2500 + 8000, value: 0 },
        { position: 2500 + 8000 + 6000 + 3000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 130 }
      ]
    },
    "--pjAnim-br-width": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 0 },
        { position: 2500 + 8000, value: 0 },
        { position: 2500 + 8000 + 6000 + 3000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 130 }
      ]
    },
    "--pjAnim-bl": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 30 },
        { position: 2500 + 8000, value: 30 },
        { position: 2500 + 8000 + 6000 + 3000, value: 30 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 }
      ]
    },
    "--pjAnim-bl-height": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 30 },
        { position: 2500 + 8000, value: 30 },
        { position: 2500 + 8000 + 6000 + 3000, value: 30 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 130 }
      ]
    },
    "--pjAnim-bl-width": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 30 },
        { position: 2500 + 8000, value: 30 },
        { position: 2500 + 8000 + 6000 + 3000, value: 30 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 130 }
      ]
    },
    "--pjAnim-t": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 0 },
        { position: 2500 + 8000, value: 0 },
        { position: 2500 + 8000 + 6000 + 3000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 }
      ]
    },
    "--pjAnim-t-height": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 0 },
        { position: 2500 + 8000, value: 0 },
        { position: 2500 + 8000 + 6000 + 3000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 5000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 6000, value: 35, ease: "ease.step-end" },     // t,r clip
        { position: 2500 + 8000 + 6000 + 4000 + 7500, value: 50, ease: "ease.step-end" },     // t,r rect
        { position: 2500 + 8000 + 6000 + 4000 + 9000, value: 30, ease: "ease.step-end" },     // t,r clip-x
        { position: 2500 + 8000 + 6000 + 4000 + 10500, value: 90, ease: "ease.step-end" },   // t,r clip-y
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 35 }
      ]
    },
    "--pjAnim-t-width": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 0 },
        { position: 2500 + 8000, value: 0 },
        { position: 2500 + 8000 + 6000 + 3000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 5000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 6000, value: 70, ease: "ease.step-end" },     // t,r clip
        { position: 2500 + 8000 + 6000 + 4000 + 7500, value: 100, ease: "ease.step-end" },    // t,r rect
        { position: 2500 + 8000 + 6000 + 4000 + 9000, value: 120, ease: "ease.step-end" },    // t,r clip-x
        { position: 2500 + 8000 + 6000 + 4000 + 10500, value: 60, ease: "ease.step-end" },    // t,r clip-y
        { position: 2500 + 8000 + 6000 + 4000 + 12000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 1750, value: 70 }
      ]
    },
    "--pjAnim-r": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 0 },
        { position: 2500 + 8000, value: 0 },
        { position: 2500 + 8000 + 6000 + 3000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 }
      ]
    },
    "--pjAnim-r-height": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 0 },
        { position: 2500 + 8000, value: 0 },
        { position: 2500 + 8000 + 6000 + 3000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 5000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 6000, value: 70, ease: "ease.step-end" },  // t,r clip
        { position: 2500 + 8000 + 6000 + 4000 + 7500, value: 100, ease: "ease.step-end" }, // t,r rect
        { position: 2500 + 8000 + 6000 + 4000 + 9000, value: 60, ease: "ease.step-end" }, // t,r clip-x
        { position: 2500 + 8000 + 6000 + 4000 + 10500, value: 120, ease: "ease.step-end" }, // t,r clip-y
      ]
    },
    "--pjAnim-r-width": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 0 },
        { position: 2500 + 8000, value: 0 },
        { position: 2500 + 8000 + 6000 + 3000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 5000, value: 0 },
        { position: 2500 + 8000 + 6000 + 4000 + 6000, value: 35, ease: "ease.step-end"  },  // t,r clip
        { position: 2500 + 8000 + 6000 + 4000 + 7500, value: 50, ease: "ease.step-end"  },  // t,r rect
        { position: 2500 + 8000 + 6000 + 4000 + 9000, value: 90, ease: "ease.step-end" },   // t,r clip-x
        { position: 2500 + 8000 + 6000 + 4000 + 10500, value: 30, ease: "ease.step-end" }, // t,r clip-y
      ]
    },
    "--pjAnim-b": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 15 },
        { position: 2500 + 8000, value: 15 },
        { position: 2500 + 8000 + 6000 + 3000, value: 15 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 }
      ]
    },
    "--pjAnim-b-height": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 15 },
        { position: 2500 + 8000, value: 15 },
        { position: 2500 + 8000 + 6000 + 3000, value: 15 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 }
      ]
    },
    "--pjAnim-b-width": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 120 },
        { position: 2500 + 8000, value: 120 },
        { position: 2500 + 8000 + 6000 + 3000, value: 120 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 }
      ]
    },
    "--pjAnim-l": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 20 },
        { position: 2500 + 8000, value: 20 },
        { position: 2500 + 8000 + 6000 + 3000, value: 20 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 }
      ]
    },
    "--pjAnim-l-height": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 210 },
        { position: 2500 + 8000, value: 210 },
        { position: 2500 + 8000 + 6000 + 3000, value: 210 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 }
      ]
    },
    "--pjAnim-l-width": {
      unit: "px",
      keyframes: [
        { position: 0, value: 0 },                                                     
        { position: 2500, value: 0 },
        { position: 2500 + 6500, value: 20 },
        { position: 2500 + 8000, value: 20 },
        { position: 2500 + 8000 + 6000 + 3000, value: 20 },
        { position: 2500 + 8000 + 6000 + 4000, value: 0 }
      ]
    },
    "fps": {
      setter: () => fpsCallback(presentationAnim, presetnationContainer),
      keyframes: [
        { position: 0, value:0 },
        { position: 2500 + 8000 + 6000 + 4000 + 12000 + 3500, value: 1 }
      ]
    }
  }
})
if (document.body.clientWidth >= 1024) {
  presentationAnim.play(presetnationContainer)
}


/* code animation */
  const hexaToRgba = (obj, propName, newVal, prop) => {
    const rgba = newVal.replace(/#?(..)/g, (_, x) => parseInt(x, 16) + ", ").replace(/(\d+), $/, (_, x) => parseInt(x) / 255)
    obj.style.setProperty(propName, `rgba(${rgba})`)
  }
  const antiAugColorAnimation = new PropJockey({
    defaultSetter: "setter.element.cssVar",
    props: {
      "--gold":     { slide: "slide.color.hex",  keyframes: [ { position: 0, value: "#ffd700"   }, { position: 5000, value: "#d0d0d0"   } ] },
      "--gold88":   { slide: "slide.color.hexa", keyframes: [ { position: 0, value: "#ffd70088" }, { position: 5000, value: "#d0d0d088" } ], setter: hexaToRgba },
      "--goldDark": { slide: "slide.color.hex",  keyframes: [ { position: 0, value: "#eda725"   }, { position: 5000, value: "#acacac"   } ] },
    }
  })

  const antiAugScum = () => {
    presentationAnim.stop(presetnationContainer)
    setTimeout(() => {
      presentationText.innerHTML = "You monster."
      document.body.classList.add("anti-aug-transitions")
    }, 250)
    setTimeout(() => {
      document.body.classList.add("anti-aug")
      antiAugColorAnimation.play(document.body)
    }, 1500)
  }
  const proAugHero = () => {
    presentationText.innerHTML = "The augmented are elments too.<br>#proAug"
    setTimeout(() => {
      document.body.classList.remove("anti-aug")
      antiAugColorAnimation.play(document.body, { speed: -1 })
    }, 250)
    setTimeout(() => {
      document.body.classList.remove("anti-aug-transitions")
      presentationAnim.play(presetnationContainer)
    }, 10500)
  }

  const kk = "38384040373937396665"
  let buf = ""
  document.addEventListener("keydown", (ev) => {
    buf = (buf + ev.which.toString(10)).substr(-20)
    if (buf === kk) {
      antiAugScum()
      setTimeout(proAugHero, 15000)
    }
  })
/* end code animation */



/* load animation */
  const section2El = document.querySelector(".section-2")
  const loadAnimDur = 25000
  const section2LoadAnimation = new PropJockey({
    repeat: true,
    maxFPS: 20,
    defaultEase: "ease.step-start",
    defaultSlide: "slide.number",
    props: {
      "--load-bar-width": {
        unit: "%",
        setter: "setter.element.cssVar.unit",
        keyframes: [
          { position: loadAnimDur * 0 / 100, value: 1 },
          { position: loadAnimDur * 5 / 100, value: 10 },
          { position: loadAnimDur * 10 / 100, value: 40 },
          { position: loadAnimDur * 20 / 100, value: 70 },
          { position: loadAnimDur * 25 / 100, value: 95 },
          { position: loadAnimDur * 26 / 100, value: 100 },
          { position: loadAnimDur * 100 / 100, value: 100 }
        ]
      },
      "--load-spliced-width": {
        unit: "%",
        setter: "setter.element.cssVar",
        keyframes: [
          { position: loadAnimDur * 0 / 100, value: 0 },
          { position: loadAnimDur * 5 / 100, value: 0 },
          { position: loadAnimDur * 10 / 100, value: 0 },
          { position: loadAnimDur * 20 / 100, value: 0 },
          { position: loadAnimDur * 25 / 100, value: 0 },
          { position: loadAnimDur * 26 / 100, value: 100 },
          { position: loadAnimDur * 100 / 100, value: 100 }
        ]
      },
      "--load-span-display": {
        setter: "setter.element.cssVar",
        keyframes: [
          { position: loadAnimDur * 0 / 100, value: 0 },
          { position: loadAnimDur * 5 / 100, value: 0 },
          { position: loadAnimDur * 10 / 100, value: 1 },
          { position: loadAnimDur * 20 / 100, value: 1 },
          { position: loadAnimDur * 25 / 100, value: 1 },
          { position: loadAnimDur * 26 / 100, value: 1 },
          { position: loadAnimDur * 100 / 100, value: 1 }
        ]
      },
      "--load-input-display": {
        setter: "setter.element.cssVar",
        keyframes: [
          { position: loadAnimDur * 0 / 100, value: 0 },
          { position: loadAnimDur * 5 / 100, value: 0 },
          { position: loadAnimDur * 10 / 100, value: 0 },
          { position: loadAnimDur * 20 / 100, value: 1 },
          { position: loadAnimDur * 25 / 100, value: 1 },
          { position: loadAnimDur * 26 / 100, value: 1 },
          { position: loadAnimDur * 100 / 100, value: 1 }
        ]
      },
      "--load-br": {
        unit: "px",
        setter: "setter.element.cssVar.unit",
        keyframes: [
          { position: loadAnimDur * 0 / 100, value: 0 },
          { position: loadAnimDur * 5 / 100, value: 0 },
          { position: loadAnimDur * 10 / 100, value: 0 },
          { position: loadAnimDur * 20 / 100, value: 0 },
          { position: loadAnimDur * 25 / 100, value: 0 },
          { position: loadAnimDur * 26 / 100, value: 25 },
          { position: loadAnimDur * 100 / 100, value: 25 }
        ]
      }
    }
  })
  section2LoadAnimation.play(section2El)
/* end load animation */
