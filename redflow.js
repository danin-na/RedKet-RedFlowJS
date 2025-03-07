class Icon_01
{
    #rf = {
        worker: {
            t: {
                tag: { icon: null },
                opt: { source: null },
            },
        },
    }

    constructor(config = {})
    {
        this.#rf.worker.t.tag.icon = config.rf.worker.tag.icon // rf-worker-tag-icon
        this.#rf.worker.t.opt.source = config.rf.worker.opt.source // rf-worker-tag-source
    }
    work ()
    {
        document.querySelectorAll(`[${this.#rf.worker.tag.icon}]`).forEach((e) =>
        {
            e.innerHTML = decodeURIComponent(e.getAttribute(this.#rf.worker.opt.source))
        })
        return this
    }
}

/* -------------------------------------------------------------------------- */
/*                                   RedFlow                                  */
/* -------------------------------------------------------------------------- */

const RedFlow = (() =>
{
    //ANCHOR - ✅ Finished
    /* -------------------------------------------------------------------------- */
    /* ------------------------------ Log Function ------------------------------ */
    /* -------------------------------------------------------------------------- */

    const log = (() =>
    {
        return class Log
        {
            static #cacheCredit = false

            static Credit ()
            {
                if (Log.#cacheCredit) return

                const commentTop = document.createComment(
                    '⭕ RedFlow - Official Webflow Library by RedKet © 2025 RedKet. All rights reserved. Unauthorized copying, modification, or distribution is prohibited. Visit: www.RedKet.com | www.Red.Ket'
                )
                const commentBottom = document.createComment(
                    '⭕ RedFlow | OFFICIAL WEBFLOW LIBRARY BY REDKET © 2025 REDKET | WWW.REDKET.COM | WWW.RED.KET'
                )

                document.body.prepend(commentTop)
                document.body.appendChild(commentBottom)

                console.log(
                    '%cRed%cFlow%c - Official Webflow Library by %cRed%cKet%c\nCopyright © 2025 RedKet. All rights reserved.\nUnauthorized copying, modification, or distribution is prohibited.\nVisit: www.RedKet.com | www.Red.Ket',
                    'color:#c33; background:#000; font-weight:bold; padding:2px 4px; border-radius:3px;',
                    'color:#dfdfdf; background:#000; font-weight:bold; padding:2px 4px; border-radius:3px;',
                    'color:#aaa; background:#000; padding:2px 4px; border-radius:3px;',
                    'color:#c33; background:#000; font-weight:bold; padding:2px 4px; border-radius:3px;',
                    'color:#dfdfdf; background:#000; font-weight:bold; padding:2px 4px; border-radius:3px;',
                    'color:#888; font-size:11px;'
                )
                Log.#cacheCredit = true
            }

            static Error (contex, message)
            {
                console.error('💢 ERROR → ⭕ RedFlow →', contex, message)
            }
            static Succ (contex, message)
            {
                console.log('✅ SUCCESS → ⭕ RedFlow →', contex, message)
            }
            static Info (contex, message)
            {
                console.info('❔ INFO → ⭕ RedFlow →', contex, message)
            }
            static Warn (contex, message)
            {
                console.warn('⚠️ WARN → ⭕ RedFlow →', contex, message)
            }
            static Debug (contex, message)
            {
                console.debug('🐞 DEBUG → ⭕ RedFlow →', contex, message)
            }
        }
    })()

    /* -------------------------------------------------------------------------- */
    /* ------------------------------ Lib Function ------------------------------ */
    /* -------------------------------------------------------------------------- */

    const lib = (() =>
    {
        return class Lib
        {
            static #cacheScript = {}
            static #cdnGsap = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js'
            static #cdnJquery = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'

            static #script (u)
            {
                if (Lib.#cacheScript[u]) return Lib.#cacheScript[u]

                if (document.querySelector(`script[src="${u}"]`)) {
                    Lib.#cacheScript[u] = Promise.resolve()
                    return Lib.#cacheScript[u]
                }

                if (!document.querySelector(`link[rel="preload"][href="${u}"]`)) {
                    const link = document.createElement('link')
                    link.rel = 'preload'
                    link.href = u
                    link.as = 'script'
                    document.head.appendChild(link)
                }

                return (Lib.#cacheScript[u] = new Promise((resolve) =>
                {
                    const script = document.createElement('script')
                    script.src = u
                    script.defer = true // Ensures scripts execute in order
                    script.onload = () =>
                    {
                        log.Succ('Lib', `✅ Loaded: ${u}`)
                        resolve()
                    }
                    script.onerror = () =>
                    {
                        log.Error('Lib', `❌ Failed to load script: ${u}`)
                        resolve() // Resolve to prevent promise rejection outside scope
                    }
                    document.head.appendChild(script)
                }))
            }

            static Load (libs)
            {
                return Promise.all(
                    libs.map((lib) =>
                    {
                        if (lib === 'gsap') return Lib.#script(Lib.#cdnGsap)
                        if (lib === 'jquery') return Lib.#script(Lib.#cdnJquery)
                        if (lib.startsWith('http')) return Lib.#script(lib) // Allow direct URL input
                        log.Warn('Lib', `⚠️ Unknown library requested: ${lib}`)
                        return Promise.resolve() // Resolve instead of rejecting
                    })
                )
            }
        }
    })()

    /* -------------------------------------------------------------------------- */
    /* ------------------------------- Components ------------------------------- */
    /* -------------------------------------------------------------------------- */

    const comp = (() =>
    {
        class Marquee_01
        {
            #rf = {
                component: {
                    e: {
                        id: { self: null, slider: null },
                        tag: { self: null, slider: null },
                        opt: { ease: null, duration: null, direction: null },
                        prog: { delay: null, time: null, anim: null },
                    },
                },
            }

            #debouncedRender

            constructor(config = {})
            {
                const tag = config.tag || {}
                const opt = config.opt || {}

                this.#rf.component.e.tag.self = tag.self
                this.#rf.component.e.tag.slider = tag.slider

                this.#rf.component.e.opt.ease = opt.ease || 'none'
                this.#rf.component.e.opt.duration = opt.duration || 30
                this.#rf.component.e.opt.direction = opt.direction || 'left'

                this.#rf.component.e.prog.delay = 200
                this.#rf.component.e.prog.time = null
                this.#rf.component.e.prog.anim = null

                this.#rf.component.e.tag.slider.setAttribute('rf-component-self-selector', '')
                this.#rf.component.e.tag.self.append(this.#rf.component.e.tag.slider.cloneNode(true))

                // Create debounced version of #render using the custom debounce function
                this.#debouncedRender = this.#debounce(this.#render.bind(this), this.#rf.component.e.prog.delay)
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
                console.log('RENDER')
                var prog = this.#reset(this.#rf.component.e.prog.anim)
                var items = this.#rf.component.e.tag.self.querySelectorAll('[rf-component-self-selector]')
                var width = parseInt(getComputedStyle(items[0]).width, 10)
                var xFrom, xTo

                if (this.#rf.component.e.opt.direction === 'left') {
                    xFrom = 0
                    xTo = -width
                } else {
                    xFrom = -width
                    xTo = 0
                }

                this.#rf.component.e.prog.anim = gsap.fromTo(
                    items,
                    { x: xFrom },
                    {
                        x: xTo,
                        duration: this.#rf.component.e.opt.duration,
                        ease: this.#rf.component.e.opt.ease,
                        repeat: -1,
                    }
                )
                this.#rf.component.e.prog.anim.progress(prog)
            }

            Create ()
            {
                lib.Load(['gsap']).then(() =>
                {
                    this.#render()
                })
            }

            Reload ()
            {
                // Use the debounced render method to prevent multiple rapid re-renders
                this.#debouncedRender()
            }
        }

        return { marquee: { _01: Marquee_01 } }
    })()

    /* -------------------------------------------------------------------------- */
    /* ------------------------ Exposed RF API (Component) ---------------------- */
    /* -------------------------------------------------------------------------- */

    return {
        Component: {
            Marquee: {
                _01 ({ id, opt })
                {
                    const instances = []
                    document.querySelectorAll(`[${id.self}]`).forEach((el) =>
                    {
                        instances.push(
                            new comp.marquee._01({
                                tag: {
                                    self: el,
                                    slider: el.querySelector(`[${id.slider}]`),
                                },
                                opt: {
                                    ease: el.getAttribute(`${opt.ease}`),
                                    duration: parseFloat(el.getAttribute(`${opt.duration}`)),
                                    direction: el.getAttribute(`${opt.direction}`),
                                },
                            })
                        )
                    })
                    return {
                        create ()
                        {
                            instances.forEach((i) => i.Create())
                        },
                        reload ()
                        {
                            instances.forEach((i) => i.Reload())
                        },
                    }
                },
            },
        },
    }
})()

document.addEventListener('DOMContentLoaded', () =>
{
    const M1 = RedFlow.Component.Marquee._01({
        id: {
            self: 'rf-component-e-id-self="marquee_01"',
            slider: 'rf-component-e-id-slider',
        },
        opt: {
            ease: 'rf-component-e-opt-ease',
            duration: 'rf-component-e-opt-duration',
            direction: 'rf-component-e-opt-direction',
        },
    })
    M1.create()

    const M2 = RedFlow.Component.Marquee._01({
        id: {
            self: 'rf-component-e-id-self="marquee_02"',
            slider: 'rf-component-e-id-slider',
        },
        opt: {
            ease: 'rf-component-e-opt-ease',
            duration: 'rf-component-e-opt-duration',
            direction: 'rf-component-e-opt-direction',
        },
    })

    const M3 = RedFlow.Component.Marquee._01({
        id: {
            self: 'rf-component-e-id-self="marquee_03"',
            slider: 'rf-component-e-id-slider',
        },
        opt: {
            ease: 'rf-component-e-opt-ease',
            duration: 'rf-component-e-opt-duration',
            direction: 'rf-component-e-opt-direction',
        },
    })

    M2.create()
    M3.create()

    window.addEventListener('resize', () =>
    {
        M1.reload()
    })
})
