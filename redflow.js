class Icon_01
{
    #rf = {
        worker: {
            t: {
                tag: { icon: null },
                opt: { source: null },
            }
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
    #rf = {
        element: {
            id: { self: null, slider: null },
            tag: { self: null, slider: null },
            opt: { ease: null, duration: null, direction: null },
            prog: { delay: null, time: null, anim: null, current: null },
            render: { items: null, width: null, xFrom: null, xTo: null },
        },
    }

    constructor(c = {})
    {
        const { element: e } = this.#rf

        e.tag.self = c.tag.self
        e.tag.slider = c.tag.slider

        e.opt.ease = c.opt.ease || 'none'
        e.opt.duration = c.opt.duration || 30
        e.opt.direction = c.opt.direction || 'left'

        e.prog.current = 0
        e.prog.delay = 200
        e.prog.time = null
        e.prog.anim = null
    }

    #anim_reset (anim)
    {
        if (!anim) return 0
        const progressValue = anim.progress()
        anim.progress(0).kill()
        return progressValue
    }

    #anim_render ()
    {
        const { element: e } = this.#rf

        e.prog.current = this.#anim_reset(e.prog.anim)

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
        e.prog.anim.progress(e.prog.current)
    }

    create ()
    {
        const { element: e } = this.#rf

        e.tag.slider.setAttribute('rf-component-self-selector', '')
        e.tag.self.append(e.tag.slider.cloneNode(true))
        this.#anim_render()
    }

    reload ()
    {
        const { element: e } = this.#rf

        clearTimeout(e.prog.time)
        e.prog.time = setTimeout(() => this.#anim_render(), e.prog.delay)
    }

    destroy ()
    {
        const { element: e } = this.#rf

        if (e.prog.anim) {
            e.prog.anim.kill();
            e.prog.anim = null;
        }
        clearTimeout(e.prog.time);
    }
}

class RF_Log
{
    static log_error (n, m)
    {
        console.error(` 💢 ERROR → ⭕ RedFlow → ${n} → ${m}`)
    }

    static log_success (n, m)
    {
        console.log(` ✅ SUCCESS → ⭕ RedFlow → ${n} → ${m}`)
    }

    static log_credit ()
    {
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
    }
}

class RF
{
    static #CACHE_SCRIPT = {}
    static #CACHE_CREDIT = false

    static #cdn_gsap = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js'
    static #cdn_jquary = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'

    static #loadScript (u)
    {
        if (RF.#CACHE_SCRIPT[u]) return RF.#CACHE_SCRIPT[u]
        if (document.querySelector(`script[src="${u}"]`)) {
            RF.#CACHE_SCRIPT[u] = Promise.resolve()
            return RF.#CACHE_SCRIPT[u]
        }
        if (!document.querySelector(`link[rel="preload"][href="${u}"]`)) {
            const link = document.createElement('link')
            link.rel = 'preload'
            link.href = u
            link.as = 'script'
            document.head.appendChild(link)
        }
        return (RF.#CACHE_SCRIPT[u] = new Promise((resolve, reject) =>
        {
            const script = document.createElement('script')
            script.src = u
            script.async = true
            script.onload = () => resolve()
            script.onerror = () =>
            {
                RF_Log.log_error('loadScript', `Failed to load script: ${u}`)
                reject(new Error(`Failed to load script: ${u}`))
            }
            document.head.appendChild(script)
        }))
    }

    static #loadLibs (libs)
    {
        return Promise.all(
            libs.map((lib) =>
            {
                if (lib === 'gsap') return RF.#loadScript(RF.#cdn_gsap)
                if (lib === 'jquery') return RF.#loadScript(RF.#cdn_jquary)
                return Promise.resolve()
            })
        )
    }

    constructor()
    {
        if (!RF.#CACHE_CREDIT) {
            RF_Log.log_credit()
            RF.#CACHE_CREDIT = true
        }
        RF_Log.log_success('Constructor', 'instance initialized.')

        this.marqueeInstances = []
    }

    // New method to reload all marquee instances
    reloadMarquees ()
    {
        this.marqueeInstances.forEach(instance => instance.reload())
    }

    Worker = {
        Icon_01: (config) => ({
            work: () =>
                RF.#loadLibs([]).then(() =>
                {
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
                }),
        }),
    }

    Component = {
        Marquee_01: (config) =>
        {
            // Capture the manager instance for later use.
            const self = this
            return {
                create: () =>
                    RF.#loadLibs(['gsap']).then(() =>
                    {
                        document.querySelectorAll(`[${config.id.self}]`).forEach((e) =>
                        {
                            const instance = new Marquee_01({
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
                            instance.create()
                            // Save the instance for later reloads.
                            self.marqueeInstances.push(instance)
                        })
                    }),
            }
        },
    }
}


document.addEventListener('DOMContentLoaded', () =>
{
    const RedFlow = new RF()

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
