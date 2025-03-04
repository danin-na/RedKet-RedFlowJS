const RF = (() =>
{

    function log ()
    {
        class Log
        {
            static #cacheCredit = false

            static credit = () =>
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

            static error = console.error.bind(console, '💢 ERROR → ⭕ RedFlow →')
            static success = console.log.bind(console, '✅ SUCCESS → ⭕ RedFlow →')
            static info = console.info.bind(console, '❔ INFO → ⭕ RedFlow →')
            static warn = console.warn.bind(console, '⚠️ WARN → ⭕ RedFlow →')
            static debug = console.debug.bind(console, '🐞 DEBUG → ⭕ RedFlow →')
        }

        return {
            credit: Log.credit,
            error: Log.error,
            success: Log.success,
            info: Log.info,
            warn: Log.warn,
            debug: Log.debug,
        }
    }

    function lib ()
    {
        class Lib
        {
            static #cacheScript = {}
            static #cdnGsap = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js'
            static #cdnJquery = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'

            static #script (u)
            {
                // if script exist in cache
                if (Lib.#cacheScript[u]) return Lib.#cacheScript[u]

                // if script exist in html doc
                if (document.querySelector(`script[src="${u}"]`)) {
                    Lib.#cacheScript[u] = Promise.resolve()
                    return Lib.#cacheScript[u]
                }

                // preload the script
                if (!document.querySelector(`link[rel="preload"][href="${u}"]`)) {
                    const link = document.createElement('link')
                    link.rel = 'preload'
                    link.href = u
                    link.as = 'script'
                    document.head.appendChild(link)
                }

                // create the script
                return (Lib.#cacheScript[u] = new Promise((resolve, reject) =>
                {
                    const script = document.createElement('script')
                    script.src = u
                    script.async = true
                    script.onload = () => resolve()
                    script.onerror = () => reject(new Error(`Failed to load script: ${u}`))
                    document.head.appendChild(script)
                }))
            }

            static load (libs)
            {
                return Promise.all(
                    libs.map((lib) =>
                    {
                        if (lib === 'gsap') return Lib.#script(Lib.#cdnGsap)
                        if (lib === 'jquery') return Lib.#script(Lib.#cdnJquery)
                        return Promise.resolve()
                    })
                )
            }
        }

        return {
            load: Lib.load,
        }
    }

    log.credit()
    log.success('Constructor', 'RF instance initialized.')

    return {
        Worker: {
            Icon_01: (config) => ({
                work: () =>
                {
                    // Ensure that 'e' is defined in your context or passed as needed.
                    lib.load([])
                        .then(() =>
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

                            // Use the logger instance from rf for success logging
                            log.success('Icon_01', 'work executed successfully.')
                        })
                        .catch((error) =>
                        {
                            log.error('Icon_01', error.message)
                        })
                },
            }),
        },

        Component: {
            Marquee_01: (config) =>
            {
                const instances = []
                return {
                    create: () =>
                    {
                        lib.load(['gsap'])
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
                                log.success('Marquee_01', 'Components created successfully.')
                            })
                            .catch((error) =>
                            {
                                log.error('Marquee_01', error.message)
                            })
                    },
                    reload: () =>
                    {
                        instances.forEach((instance) => instance.reload())
                        log.success('Marquee_01', 'Components reloaded successfully.')
                    },
                }
            },
        },
    }
})()