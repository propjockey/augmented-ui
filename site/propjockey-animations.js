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
    const currentFPS = 1000 / deltaTime
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

const noopSlide = x => x
const classNameSetter = (obj, propName, newVal, prop) => {
  if (prop.__oldValue !== newVal) {
    prop.__oldValue && obj.classList.remove(...prop.__oldValue.split(" "))
    prop.__oldValue = newVal
    newVal && obj.classList.add(...newVal.split(" "))
  }
}
const objPropChangedSetter = (obj, propName, newVal, prop) => {
  if (prop.__oldValue !== newVal) {
    prop.__oldValue = newVal
    obj[propName] = newVal
  }
}

const demoEl = document.getElementById("demoEl")
const step1End = 3000
const step2End = 7000
const introAnimation = new PropJockey({
  repeat: true,
  repeatDelay: 4000,
  props: {
    presentationAugs: {
      slide: noopSlide,
      setter: classNameSetter,
      keyframes: [
        { position: 0, value: "sadNormalDiv", ease: "ease.step-start" },
        { position: step1End, value: "aug-exe", ease: "ease.step-start" }
      ]
    },
    tlAug: {
      slide: noopSlide,
      setter: classNameSetter,
      keyframes: [
        { position: 0, value: "", ease: "ease.step-start" },
        { position: step1End, value: "aug-tl-clip", ease: "ease.step-start" },
        { position: step2End, value: "aug-tl-round", ease: "ease.step-start" }
      ]
    },
    trAug: {
      slide: noopSlide,
      setter: classNameSetter,
      keyframes: [
        { position: 0, value: "", ease: "ease.step-start" },
        { position: step1End, value: "aug-tr-round", ease: "ease.step-start" },
        { position: step2End, value: "aug-tr-clip-x", ease: "ease.step-start" }
      ]
    },
    brAug: {
      slide: noopSlide,
      setter: classNameSetter,
      keyframes: [
        { position: 0, value: "", ease: "ease.step-start" },
        { position: step1End, value: "aug-br-clip-y", ease: "ease.step-start" },
        { position: step2End, value: "aug-br-round", ease: "ease.step-start" }
      ]
    },
    blAug: {
      slide: noopSlide,
      setter: classNameSetter,
      keyframes: [
        { position: 0, value: "", ease: "ease.step-start" },
        { position: step1End, value: "aug-bl-round", ease: "ease.step-start" },
        { position: step2End, value: "aug-bl-clip", ease: "ease.step-start" }
      ]
    },
    innerHTML: {
      slide: noopSlide,
      setter: objPropChangedSetter,
      keyframes: [
        { position: 0, value: "This is your &lt;div&gt;", ease: "ease.step-start" },
        { position: step1End, value: "This is your &lt;div&gt; augmented", ease: "ease.step-start" },
        { position: step2End, value: "Get augmented.<br>augmented-ui<br><span style='font-size: 14px;'>(animation test)</span>", ease: "ease.step-start" }
      ]
    },
    "fps": { setter: () => fpsCallback(introAnimation, demoEl), keyframes: [ { position: 0, value:0 }, { position: step2End, value: 1 } ] }
  }
})
introAnimation.play(demoEl)

const antiAugColorAnimation = new PropJockey({
  defaultSetter: "setter.element.cssVar",
  props: {
    "--gold":     { slide: "slide.color.hex",  keyframes: [ { position: 0, value: "#ffd700"   }, { position: 5000, value: "#d0d0d0"   } ] },
    "--gold88":   { slide: "slide.color.hexa", keyframes: [ { position: 0, value: "#ffd70088" }, { position: 5000, value: "#d0d0d088" } ] },
    "--goldDark": { slide: "slide.color.hex",  keyframes: [ { position: 0, value: "#eda725"   }, { position: 5000, value: "#acacac"   } ] },
  }
})

const antiAugScum = () => {
  introAnimation.stop(demoEl)
  setTimeout(() => {
    demoEl.innerHTML = "You monster."
    document.body.classList.add("anti-aug-transitions")
  }, 250)
  setTimeout(() => {
    document.body.classList.add("anti-aug")
    antiAugColorAnimation.play(document.body)
  }, 1500)
}
const proAugHero = () => {
  demoEl.innerHTML = "The augmented are elments too.<br>#proAug"
  setTimeout(() => {
    document.body.classList.remove("anti-aug")
    antiAugColorAnimation.play(document.body, { speed: -1 })
  }, 250)
  setTimeout(() => {
    document.body.classList.remove("anti-aug-transitions")
    introAnimation.play(demoEl)
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
