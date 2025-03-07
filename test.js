const comp = (() =>
{
    return {
        marquee: {
            _01: class Marquee_01
            {
                #tagSelf
                #tagSlider
                #optEase
                #optDuration
                #optDirection
                #progDelay
                #progTime
                #progAnim
                #debouncedRender

                constructor(config = {})
                {
                    this.#tagSelf = tag.self
                    this.#tagSlider = tag.slider
                    this.#optEase = opt.ease || "none"
                    this.#optDuration = opt.duration || 30
                    this.#optDirection = opt.direction || "left"
                    this.#progDelay = 200
                    this.#progAnim = null

                    this.#tagSlider.setAttribute("rf-component-self-selector", "")
                    this.#tagSelf.append(this.#tagSlider.cloneNode(true))

                    this.#debouncedRender = this.#debounce(this.#render.bind(this), this.#progDelay)
                }

                // Private helper to debounce any function call without using the spread operator
                #debounce (fn, delay)
                {
                    var timeout = null
                    return function ()
                    {
                        if (timeout !== null) {
                            clearTimeout(timeout)
                        }
                        var args = arguments
                        timeout = setTimeout(function ()
                        {
                            fn.apply(null, args)
                        }, delay)
                    }
                }

                #reset (animation)
                {
                    if (!animation) return 0
                    var savedProgress = animation.progress()
                    animation.progress(0).kill()
                    return savedProgress
                }

                #render ()
                {
                    console.log("RENDER")
                    var prog = this.#reset(this.#progAnim)
                    var items = this.#tagSelf.querySelectorAll("[rf-component-self-selector]")
                    var width = parseInt(getComputedStyle(items[0]).width, 10)
                    var xFrom, xTo

                    if (this.#optDirection === "left") {
                        xFrom = 0
                        xTo = -width
                    } else {
                        xFrom = -width
                        xTo = 0
                    }

                    this.#progAnim = gsap.fromTo(
                        items,
                        { x: xFrom },
                        {
                            x: xTo,
                            duration: this.#optDuration,
                            ease: this.#optEase,
                            repeat: -1,
                        }
                    )
                    this.#progAnim.progress(prog)
                }

                Create ()
                {
                    lib.Load(["gsap"]).then(() =>
                    {
                        this.#render()
                    })
                }

                Reload ()
                {
                    // Use the debounced render method to prevent multiple rapid re-renders
                    this.#debouncedRender()
                }
            },
            _02: class Marquee_02 { },
        },
        slider: {
            _01: class Slider_01 { },
            _02: class Slider_02 { },
        },
    }
})()
