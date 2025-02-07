class Icon01
{
    #e

    constructor(c = {})
    {
        this.#e = {
            tag: {
                self: c.tag.self,
            },
            set: {
                svgPath: c.set.svgPath,
            },
        }
        this.#render()
    }

    #render ()
    {
        if (this.#e.set.svgPath) {
            const decodedSvg = decodeURIComponent(this.#e.set.svgPath)
            this.#e.tag.self.innerHTML = decodedSvg
        }
    }

    static initAll ()
    {
        document.querySelectorAll('[data-svg]').forEach((el) => new Icon01(el))
    }
}

class Slider01
{
    #e

    constructor(c = {})
    {
        this.#e = {
            tag: {
                self: c.tag.self,
                mask: c.tag.mask,
                next: c.tag.next,
                prev: c.tag.prev,
                slides: c.tag.slides,
            },
            set: {
                ease: c.set.ease || 'none',
                duration: parseFloat(c.set.duration) || 0.5,
            },
            prog: {
                delay: 100,
                id: null,
                anim: null,
                currentSlide: 0,
                totalSlides: c.tag.slides.length,
                offsets: [],
            },
        }

        this.#run()

        this.#e.tag.next.addEventListener('click', () =>
        {
            this.#e.prog.currentSlide =
                this.#e.prog.currentSlide < this.#e.prog.totalSlides - 1 ? this.#e.prog.currentSlide + 1 : 0
            gsap.to(this.#e.tag.mask, {
                duration: this.#e.set.duration,
                ease: this.#e.set.ease,
                x: -this.#e.prog.offsets[this.#e.prog.currentSlide],
            })
        })

        this.#e.tag.prev.addEventListener('click', () =>
        {
            this.#e.prog.currentSlide =
                this.#e.prog.currentSlide > 0 ? this.#e.prog.currentSlide - 1 : this.#e.prog.totalSlides - 1
            gsap.to(this.#e.tag.mask, {
                duration: this.#e.set.duration,
                ease: this.#e.set.ease,
                x: -this.#e.prog.offsets[this.#e.prog.currentSlide],
            })
        })

        window.addEventListener('resize', () =>
        {
            clearTimeout(this.#e.prog.id)
            this.#e.prog.id = setTimeout(() => this.#run(), this.#e.prog.delay)
        })
    }

    #reset (animation)
    {
        if (!animation) return 0
        const savedProgress = animation.progress()
        animation.progress(0).kill()
        return savedProgress
    }

    #run ()
    {
        const prog = this.#reset(this.#e.prog.anim)
        this.#e.prog.offsets = []
        this.#e.tag.slides.forEach((slide) =>
        {
            this.#e.prog.offsets.push(slide.offsetLeft)
        })
        this.#e.prog.totalSlides = this.#e.tag.slides.length
        this.#e.prog.anim = gsap.set(this.#e.tag.mask, {
            x: -this.#e.prog.offsets[this.#e.prog.currentSlide],
        })
        this.#e.prog.anim.progress(prog)
    }
}

class RF
{
    static #components = {
        Icon01: Icon01,
        Slider01: Slider01,
        Marquee01: Marquee01,
    }

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
