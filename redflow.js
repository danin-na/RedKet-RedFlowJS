/*
class Icon_01
{
    #rf = {
        worker: {
            tag: { targetID: null },
            opt: { source: null },
        },
    }

    constructor(config = {})
    {
        this.#rf.worker.tag.targetID = config.rf.worker.tag.targetID // rf-worker-tag-targetID
        this.#rf.worker.opt.source = config.rf.worker.opt.source // rf-worker-tag-source
        console.log(config)
    }
    work ()
    {
        document.querySelectorAll(`[${this.#rf.worker.tag.targetID}]`).forEach((e) =>
        {
            e.innerHTML = decodeURIComponent(e.getAttribute(this.#rf.worker.opt.source))
        })
        return this
    }
}
*/

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

    constructor(config = {})
    {
        this.#rf.component.e.tag.self = config.tag.self
        this.#rf.component.e.tag.slider = config.tag.slider

        this.#rf.component.e.opt.ease = config.opt.ease || 'none'
        this.#rf.component.e.opt.duration = config.opt.duration || 30
        this.#rf.component.e.opt.direction = config.opt.direction || 'left'

        this.#rf.component.e.prog.delay = 200
        this.#rf.component.e.prog.time = null
        this.#rf.component.e.prog.anim = null

        // Set data attribute using new naming convention
        this.#rf.component.e.tag.slider.setAttribute('rf-component-self-selector', '')
        this.#rf.component.e.tag.self.append(this.#rf.component.e.tag.slider.cloneNode(true))
    }

    #reset (animation)
    {
        if (!animation) return 0
        const savedProgress = animation.progress()
        animation.progress(0).kill()
        return savedProgress
    }

    #render ()
    {
        const prog = this.#reset(this.#rf.component.e.prog.anim)
        const items = this.#rf.component.e.tag.self.querySelectorAll('[rf-component-self-selector]')
        const width = parseInt(getComputedStyle(items[0]).width, 10)
        const [xFrom, xTo] = this.#rf.component.e.opt.direction === 'left' ? [0, -width] : [-width, 0]

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

    create ()
    {
        this.#render()
        window.addEventListener('resize', () =>
        {
            clearTimeout(this.#rf.component.e.prog.time)
            this.#rf.component.e.prog.time = setTimeout(() => this.#render(), this.#rf.component.e.prog.delay)
        })
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

    static loadLibs (libs)
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
    }

    Component = {
        Marquee_01: (config) => ({
            create: () =>
                RF.loadLibs(['gsap']).then(() =>
                {
                    document.querySelectorAll(`[${config.id.self}]`).forEach((e) =>
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
                    })
                }),
        }),
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
