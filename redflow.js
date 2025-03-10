/*
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
    */

/* -------------------------------------------------------------------------- */
/*                                   RedFlow                                  */
/* -------------------------------------------------------------------------- */

const RedFlow = (() =>
{
    /* -------------------------------------------------------------------------- */
    /* ------------------------------ Log Function ------------------------------ */
    /* -------------------------------------------------------------------------- */

    const log = (() =>
    {
        'use strict'

        const credit = {
            commentTop:
                '⭕ RedFlow - Official Webflow Library by RedKet © 2025 RedKet.\n All rights reserved. Unauthorized copying, modification, or distribution is prohibited.\n Visit: www.RedKet.com | www.Red.Ket',
            commentBottom: '⭕ RedFlow | OFFICIAL WEBFLOW LIBRARY BY REDKET © 2025 REDKET | WWW.REDKET.COM | WWW.RED.KET',
            logMessage: `%cRed%cFlow%c - Official Webflow Library by %cRed%cKet%c\nCopyright © 2025 RedKet. All rights reserved.\nUnauthorized copying, modification, or distribution is prohibited.\nVisit: www.RedKet.com | www.Red.Ket`,
            logStyle: [
                'color:#c33; background:#000; font-weight:bold; padding:2px 4px; border-radius:3px;',
                'color:#dfdfdf; background:#000; font-weight:bold; padding:2px 4px; border-radius:3px;',
                'color:#aaa; background:#000; padding:2px 4px; border-radius:3px;',
                'color:#c33; background:#000; font-weight:bold; padding:2px 4px; border-radius:3px;',
                'color:#dfdfdf; background:#000; font-weight:bold; padding:2px 4px; border-radius:3px;',
                'color:#888; font-size:11px;',
            ],
        }

        let cacheCredit = false

        /* ------------------------------- Public API ------------------------------- */

        return {
            credit ()
            {
                if (cacheCredit) return
                document.body.prepend(document.createComment(credit.commentTop))
                document.body.appendChild(document.createComment(credit.commentBottom))
                console.log(credit.logMessage, ...credit.logStyle)
                cacheCredit = true
            },
            error (context, message)
            {
                console.error(`💢 ERROR → ⭕ RedFlow → ${context}`, message)
            },

            success (context, message)
            {
                console.log(`✅ SUCCESS → ⭕ RedFlow → ${context}`, message)
            },

            info (context, message)
            {
                console.info(`❔ INFO → ⭕ RedFlow → ${context}`, message)
            },

            warn (context, message)
            {
                console.warn(`⚠️ WARN → ⭕ RedFlow → ${context}`, message)
            },

            debug (context, message)
            {
                console.debug(`🐞 DEBUG → ⭕ RedFlow → ${context}`, message)
            },
        }
    })()

    /* -------------------------------------------------------------------------- */
    /* ------------------------------ Lib Function ------------------------------ */
    /* -------------------------------------------------------------------------- */

    const lib = (() =>
    {
        'use strict'

        const cdn = {
            gsap: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js',
            jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
        }

        const cacheScript = {}

        function loadScript (url)
        {
            if (cacheScript[url]) return cacheScript[url]
            if (document.querySelector(`script[src="${url}"]`)) {
                cacheScript[url] = Promise.resolve()
                return cacheScript[url]
            }
            if (!document.querySelector(`link[rel="preload"][href="${url}"]`)) {
                const link = document.createElement('link')
                link.rel = 'preload'
                link.href = url
                link.as = 'script'
                document.head.appendChild(link)
            }
            cacheScript[url] = new Promise((resolve) =>
            {
                const script = document.createElement('script')
                script.src = url
                script.defer = true
                script.onload = () =>
                {
                    log.success(url, 'Loaded')
                    resolve()
                }
                script.onerror = () =>
                {
                    log.error(url, 'Failed to load')
                    resolve()
                }
                document.head.appendChild(script)
            })
            return cacheScript[url]
        }

        /* ------------------------------- Public API ------------------------------- */

        return {
            load (libs)
            {
                const promises = libs.map((lib) =>
                {
                    if (cdn[lib]) return loadScript(cdn[lib])
                    if (lib.startsWith('http')) return loadScript(lib)
                    log.warn(lib, 'Unknown library requested')
                    return Promise.resolve()
                })
                return Promise.all(promises)
            },
        }
    })()

    //! Under construct
    /* -------------------------------------------------------------------------- */
    /* ------------------------------- Components ------------------------------- */
    /* -------------------------------------------------------------------------- */

    const comp = (() =>
    {
        class Marquee_01
        {
            #e = {}

            constructor(config = { tag: {}, opt: {} })
            {
                this.#e = {
                    tag: {
                        self: config.tag.self,
                        slider: config.tag.slider,
                    },
                    opt: {
                        ease: config.opt.ease || 'none',
                        duration: config.opt.duration || 30,
                        direction: config.opt.direction || 'left',
                    },
                    prog: {
                        delay: 200,
                        anim: null,
                    },
                }
            }

            #render ()
            {
                var items = this.#e.tag.self.querySelectorAll('[rf-component-self-selector]')
                var width = parseInt(getComputedStyle(items[0]).width, 10)
                var xFrom, xTo

                if (this.#e.opt.direction === 'left') {
                    xFrom = 0
                    xTo = -width
                } else {
                    xFrom = -width
                    xTo = 0
                }

                this.#e.prog.anim = gsap.fromTo(
                    items,
                    { x: xFrom },
                    {
                        x: xTo,
                        duration: this.#e.opt.duration,
                        ease: this.#e.opt.ease,
                        repeat: -1,
                    }
                )

                console.log('rendering', width, xFrom, xTo)
            }

            Create ()
            {
                lib.load(['gsap']).then(() =>
                {
                    this.#e.tag.slider.setAttribute('rf-component-self-selector', '')
                    this.#e.tag.self.append(this.#e.tag.slider.cloneNode(true))
                    this.#render()
                })
            }

            Reload ()
            {
                this.#render()
            }
        }

        return { marquee: { _01: Marquee_01 } }
    })()

    /* -------------------------------------------------------------------------- */
    /* --------------------------------- execute -------------------------------- */
    /* -------------------------------------------------------------------------- */

    log.credit()

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

    window.addEventListener('resize', () =>
    {
        M1.reload()
    })
})
