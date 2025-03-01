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
    static #cacheCredit = false

    Error (n, m)
    {
        console.error(` 💢 ERROR → ⭕ RedFlow → ${n} → ${m}`)
    }

    Success (n, m)
    {
        console.log(` ✅ SUCCESS → ⭕ RedFlow → ${n} → ${m}`)
    }

    Credit ()
    {
        if (RF_Log.#cacheCredit) return
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
        RF_Log.#cacheCredit = true
    }

    constructor() { }
}

/**
 * RF_Lib is a utility class for dynamically loading external JavaScript libraries.
 * It caches loaded scripts to prevent duplicate loads and optimizes performance by preloading.
 */
class RF_Lib
{
    /**
     * A cache object to store promises for already loaded scripts.
     * @type {Object<string, Promise<void>>}
     * @private
     */
    static #cacheScript = {};

    /**
     * The CDN URL for the GSAP library.
     * @type {string}
     * @private
     */
    static #cdnGsap = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js';

    /**
     * The CDN URL for the jQuery library.
     * @type {string}
     * @private
     */
    static #cdnJquery = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';

    /**
     * Dynamically loads a script from a given URL.
     * If the script is already cached or exists in the document, returns the existing promise.
     * Otherwise, it preloads the script and appends it to the document head.
     *
     * @param {string} u - The URL of the script to load.
     * @returns {Promise<void>} A promise that resolves when the script is loaded.
     * @private
     */
    #loadScript (u)
    {
        // Return cached promise if the script is already being loaded or loaded.
        if (RF_Lib.#cacheScript[u]) return RF_Lib.#cacheScript[u];

        // If the script element already exists in the document, assume it's loaded.
        if (document.querySelector(`script[src="${u}"]`)) {
            RF_Lib.#cacheScript[u] = Promise.resolve();
            return RF_Lib.#cacheScript[u];
        }

        // Preload the script if not already preloaded.
        if (!document.querySelector(`link[rel="preload"][href="${u}"]`)) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = u;
            link.as = 'script';
            document.head.appendChild(link);
        }

        // Create and append the script element, caching the promise for future requests.
        RF_Lib.#cacheScript[u] = new Promise((resolve, reject) =>
        {
            const script = document.createElement('script');
            script.src = u;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${u}`));
            document.head.appendChild(script);
        });
        return RF_Lib.#cacheScript[u];
    }

    /**
     * Loads multiple libraries specified by an array of library names.
     * Currently supported libraries are 'gsap' and 'jquery'.
     *
     * @param {Array<string>} libs - An array of library names to load.
     * @returns {Promise<Array<void>>} A promise that resolves when all requested libraries are loaded.
     */
    loadLibs (libs)
    {
        return Promise.all(
            libs.map((lib) =>
            {
                if (lib === 'gsap') return this.#loadScript(RF_Lib.#cdnGsap);
                if (lib === 'jquery') return this.#loadScript(RF_Lib.#cdnJquery);
                // For unsupported libraries, simply resolve immediately.
                return Promise.resolve();
            })
        );
    }
}



const ss = new RF_Lib()
ss.

class RF
{
    constructor()
    {
        // Create a single logger instance
        console.log('sss')
        //this.log = new RF_Log()
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
