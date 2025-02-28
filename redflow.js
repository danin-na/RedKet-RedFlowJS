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

    create ()
    {
        const { e } = this.#rf

        e.tag.slider.setAttribute('rf-component-self-selector', '')
        e.tag.self.append(e.tag.slider.cloneNode(true))

        this.#renderAnimation()
    }

    reload ()
    {
        const { e } = this.#rf

        clearTimeout(e.prog.timer)
        e.prog.timer = setTimeout(() => this.#renderAnimation(), e.prog.delay)
    }

    destroy ()
    {
        const { e } = this.#rf

        if (e.prog.anim) {
            e.prog.anim.kill()
            e.prog.anim = null
        }

        clearTimeout(e.prog.timer)
    }
}

class RF_Log
{
    static #_cacheCredit = false

    constructor() { }

    static error (n, m)
    {
        console.error(` 💢 ERROR → ⭕ RedFlow → ${n} → ${m}`)
    }

    static success (n, m)
    {
        console.log(` ✅ SUCCESS → ⭕ RedFlow → ${n} → ${m}`)
    }

    static credit ()
    {
        if (RF_Log.#_cacheCredit) return
        document.body.insertAdjacentHTML(
            'afterbegin',
            `<!-- ⭕ RedFlow - Official Webflow Library by RedKet -- Copyright © 2025 RedKet. All rights reserved. -->
             <!-- Unauthorized copying, modification, or distribution is prohibited. -- Visit: www.RedKet.com | www.Red.Ket -->`
        )
        document.body.insertAdjacentHTML(
            'beforeend',
            `<!-- ⭕ RedFlow | OFFICIAL WEBFLOW LIBRARY BY REDKET © 2025 REDKET | WWW.REDKET.COM | WWW.RED.KET -->`
        )
        console.log(
            '%cRed%cFlow%c- official Webflow Library by %cRed%cKet%c\nCopyright © 2025 RedKet. All rights reserved.\nUnauthorized copying, modification, or distribution is prohibited.\nVisit: www.RedKet.com | www.Red.Ket',
            'color:#c33;background:#000;font-weight:bold;padding:2px 4px;border-radius:3px;',
            'color:#dfdfdf;background:#000;font-weight:bold;padding:2px 4px;border-radius:3px;',
            'color:#aaa;background:#000;padding:2px 4px;border-radius:3px;',
            'color:#c33;background:#000;font-weight:bold;padding:2px 4px;border-radius:3px;',
            'color:#dfdfdf;background:#000;font-weight:bold;padding:2px 4px;border-radius:3px;',
            'color:#888;font-size:11px;'
        )
        RF_Log.#_cacheCredit = true
    }
}

class RF_Scripts
{
    static _CACHE_SCRIPT = {}
    static _cdn_gsap = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js'
    static _cdn_jquery = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'

    static loadScript (u)
    {
        if (RF_Scripts._CACHE_SCRIPT[u]) return RF_Scripts._CACHE_SCRIPT[u]
        if (document.querySelector(`script[src="${u}"]`)) {
            RF_Scripts._CACHE_SCRIPT[u] = Promise.resolve()
            return RF_Scripts._CACHE_SCRIPT[u]
        }
        if (!document.querySelector(`link[rel="preload"][href="${u}"]`)) {
            const link = document.createElement('link')
            link.rel = 'preload'
            link.href = u
            link.as = 'script'
            document.head.appendChild(link)
        }
        return (RF_Scripts._CACHE_SCRIPT[u] = new Promise((resolve, reject) =>
        {
            const script = document.createElement('script')
            script.src = u
            script.async = true
            script.onload = () => resolve()
            script.onerror = () => reject(new Error(`Failed to load script: ${u}`))
            document.head.appendChild(script)
        }))
    }

    static loadLibs (libs)
    {
        return Promise.all(
            libs.map((lib) =>
            {
                if (lib === 'gsap') return RF_Scripts.loadScript(RF_Scripts._cdn_gsap)
                if (lib === 'jquery') return RF_Scripts.loadScript(RF_Scripts._cdn_jquery)
                return Promise.resolve()
            })
        )
    }
}

class RF
{
    constructor()
    {
        // Create a single logger instance
        console.log('sss')
        this.log = new RF_Log()
        this.log.log_credit()
        this.log.log_success('Constructor', 'instance initialized.')
    }

    Worker = {
        Icon_01: (config) => ({
            work: () =>
            {
                RF_Scripts.loadLibs([])
                    .then(() =>
                    {
                        // Assuming 'e' is defined in your context.
                        new Marquee_01({
                            tag: {
                                self: e,
                                slider: e.querySelector(`[${config.id.slider}]`),
                            },
                            opt: {
                                ease: e.getAttribute(config.opt.ease),
                                duration: parseFloat(e.getAttribute(config.opt.duration)),
                                direction: e.getAttribute(config.opt.direction),
                            },
                        }).create()
                        // Use the logger instance from RF manager
                        this.log.log_success('Icon_01', 'work executed successfully.')
                    })
                    .catch((error) =>
                    {
                        this.log.log_error('Icon_01', error.message)
                    })
            },
        }),
    }

    Component = {
        Marquee_01: (config) =>
        {
            const instances = []
            return {
                create: () =>
                {
                    RF_Scripts.loadLibs(['gsap'])
                        .then(() =>
                        {
                            document.querySelectorAll(`[${config.id.self}]`).forEach((e) =>
                            {
                                const marqueeInstance = new Marquee_01({
                                    tag: {
                                        self: e,
                                        slider: e.querySelector(`[${config.id.slider}]`),
                                    },
                                    opt: {
                                        ease: e.getAttribute(config.opt.ease),
                                        duration: parseFloat(e.getAttribute(config.opt.duration)),
                                        direction: e.getAttribute(config.opt.direction),
                                    },
                                })
                                marqueeInstance.create()
                                instances.push(marqueeInstance)
                            })
                            this.log.log_success('Marquee_01', 'Components created successfully.')
                        })
                        .catch((error) =>
                        {
                            this.log.log_error('Marquee_01', error.message)
                        })
                },
                reload: () =>
                {
                    instances.forEach((instance) => instance.reload())
                    this.log.log_success('Marquee_01', 'Components reloaded successfully.')
                },
            }
        },
    }
}

document.addEventListener('DOMContentLoaded', () =>
{
    const RedFlow = new RF()
    const RedFlow2 = new RF()

    RedFlow.Component.Marquee_01({
        id: {
            self: 'rf-component-e-id-self="marquee_01"',
            slider: 'rf-component-e-id-slider',
        },
        opt: {
            ease: 'rf-component-e-opt-ease',
            duration: 'rf-component-e-opt-duration',
            direction: 'rf-component-e-opt-direction',
        },
    }).create()
})
