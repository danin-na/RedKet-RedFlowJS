class RF
{

    static #CACHE_CREDIT = false
    static #CACHE_SCRIPT = {}

    static #cdn_gsap = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js'
    static #cdn_jquary = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'

    static #log_error (n, m)
    {
        console.error(` 💢 ERROR → ⭕ RedFlow → ${n} → ${m}`)
    }

    static #log_success (n, m)
    {
        console.log(` ✅ SUCCESS → ⭕ RedFlow → ${n} → ${m}`)
    }

    static #log_credit ()
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
            '%cRed%cFlow%c- official Webflow Library by %cRed%cKet%c\nCopyright Â© 2025 RedKet. All rights reserved.\nUnauthorized copying, modification, or distribution is prohibited.\nVisit: www.RedKet.com | www.Red.Ket',
            'color:#c33;background:#000;font-weight:bold;padding:2px 4px;border-radius:3px;',
            'color:#dfdfdf;background:#000;font-weight:bold;padding:2px 4px;border-radius:3px;',
            'color:#aaa;background:#000;padding:2px 4px;border-radius:3px;',
            'color:#c33;background:#000;font-weight:bold;padding:2px 4px;border-radius:3px;',
            'color:#dfdfdf;background:#000;font-weight:bold;padding:2px 4px;border-radius:3px;',
            'color:#888;font-size:11px;'
        )
    }

    static #loadScript (u)
    {
        // Return the cached promise if already loaded.
        if (RF.#CACHE_SCRIPT[u]) {
            return RF.#CACHE_SCRIPT[u]
        }
        // If the script is already in the DOM, resolve immediately.
        if (document.querySelector(`script[src="${u}"]`)) {
            RF.#CACHE_SCRIPT[u] = Promise.resolve()
            return RF.#CACHE_SCRIPT[u]
        }
        // Add a preload link hint if not already added.
        if (!document.querySelector(`link[rel="preload"][href="${u}"]`)) {
            const link = document.createElement('link')
            link.rel = 'preload'
            link.href = u
            link.as = 'script'
            document.head.appendChild(link)
        }
        // Load the script and cache the promise.
        return (RF.#CACHE_SCRIPT[u] = new Promise((resolve, reject) =>
        {
            const script = document.createElement('script')
            script.src = u
            script.async = true
            script.onload = () =>
            {
                resolve()
            }
            script.onerror = () =>
            {
                RF.#log_error('loadScript', `Failed to load script: ${u}`)
                reject(new Error(`Failed to load script: ${u}`))
            }
            document.body.appendChild(script)
        }))
    }

    async #createComponent (u, c, n, config = null)
    {
        try {
            await Promise.all(u.map((url) => RF.#loadScript(url)))
            return config ? new c(config) : new c()
        } catch (e) {
            RF.#log_error(n, e.message)
            return null
        }
    }

    Component = {
        Marquee01: {
            create: (config) => this.#createComponent([RF.#cdn_gsap], RF.#components.Marquee01, 'Marquee 01', config),
        },
        create: {
            Icon01: (config) => this.#createComponent([], RF.#components.Icon01, 'Icon 01', config),
            Slider01: (config) => this.#createComponent([RF.#cdn_gsap], RF.#components.Slider01, 'Slider 01', config),
        },
    }

    constructor()
    {
        if (!RF.#CACHE_CREDIT) {
            RF.#log_credit()
            RF.#CACHE_CREDIT = true
        }
        RF.#log_success('Constructor', 'instance initialized.')
    }
}