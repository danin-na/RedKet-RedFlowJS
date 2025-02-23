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
        this.#rf.worker.tag.targetID = config.rf.worker.tag.targetID // data-rf-worker-tag-targetID
        this.#rf.worker.opt.source = config.rf.worker.opt.source // data-rf-worker-tag-source
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

        this.Worker = {
            Icon_01: (config) => ({
                work: () => RF.loadLibs([]).then(() => new Icon_01(config).work()),
            }),
            Slider_01: (config) => ({
                run: () => RF.loadLibs(['gsap']).then(() => new Slider_01(config).work()),
            }),
        }
    }
}

document.addEventListener('DOMContentLoaded', () =>
{
    const RedFlow = new RF()

    RedFlow.Worker.Icon_01({
        rf: {
            worker: {
                tag: { targetID: 'data-rf-worker-tag-targetid="icon_01"' },
                opt: { source: 'data-rf-worker-opt-source' },
            },
        },
    }).work()
})
