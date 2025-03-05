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
        console.log(config)
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

const RF = (() =>
{

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

            static Error (contex, message) { console.error('💢 ERROR → ⭕ RedFlow →', contex, message) }
            static Succ (contex, message) { console.log('✅ SUCCESS → ⭕ RedFlow →', contex, message) }
            static Info (contex, message) { console.info('❔ INFO → ⭕ RedFlow →', contex, message) }
            static Warn (contex, message) { console.warn('⚠️ WARN → ⭕ RedFlow →', contex, message) }
            static Debug (contex, message) { console.debug('🐞 DEBUG → ⭕ RedFlow →', contex, message) }
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

    })();

    /* -------------------------------------------------------------------------- */
    /* ------------------------------- Components ------------------------------- */
    /* -------------------------------------------------------------------------- */

    const comp = (() =>
    {
        class Marquee_01
        {
            #rf = { e: {} }

            constructor({ tag, opt } = {})
            {
                this.#rf.e = {
                    tag: {
                        self: tag.self,
                        slider: tag.slider,
                    },
                    opt: {
                        ease: opt.ease || 'none',
                        duration: opt.duration || 30,
                        direction: opt.direction || 'left',
                    },
                    prog: {
                        currentProgress: 0,
                        delay: 200,
                        timer: null,
                        anim: null,
                    },
                    render: {
                        items: null,
                        width: 0,
                        xFrom: 0,
                        xTo: 0,
                    },
                }
            }

            #resetAnimation (anim)
            {
                if (!anim) return 0
                const progress = anim.progress()
                anim.progress(0).kill()
                return progress
            }

            #renderAnimation ()
            {
                const { e } = this.#rf

                e.prog.currentProgress = this.#resetAnimation(e.prog.anim)

                e.render.items = e.tag.self.querySelectorAll('[rf-component-self-selector]')
                e.render.width = parseInt(getComputedStyle(e.render.items[0]).width, 10)

                if (e.opt.direction === 'left') {
                    e.render.xFrom = 0
                    e.render.xTo = -e.render.width
                } else {
                    e.render.xFrom = -e.render.width
                    e.render.xTo = 0
                }

                e.prog.anim = gsap.fromTo(
                    e.render.items,
                    { x: e.render.xFrom },
                    {
                        x: e.render.xTo,
                        duration: e.opt.duration,
                        ease: e.opt.ease,
                        repeat: -1,
                    }
                )

                e.prog.anim.progress(e.prog.currentProgress)
            }

            Create ()
            {
                const { e } = this.#rf

                e.tag.slider.setAttribute('rf-component-self-selector', '')
                e.tag.self.append(e.tag.slider.cloneNode(true))

                this.#renderAnimation()
            }

            Reload ()
            {
                const { e } = this.#rf

                clearTimeout(e.prog.timer)
                e.prog.timer = setTimeout(() => this.#renderAnimation(), e.prog.delay)
            }

            Destroy ()
            {
                const { e } = this.#rf

                if (e.prog.anim) {
                    e.prog.anim.kill()
                    e.prog.anim = null
                }

                clearTimeout(e.prog.timer)
            }
        }

        return { marquee: { _01: Marquee_01 } }
    })()

})()

document.addEventListener('DOMContentLoaded', () =>
{
    // Create the Marquee component instance

    const marqueeComponent = RF.Component.Marquee_01({
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

    // Create the marquee components
    marqueeComponent.create()

    // Add a listener for window resize to reload the marquee components
    window.addEventListener('resize', () =>
    {
        marqueeComponent.reload()
    })
})
