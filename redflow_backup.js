class Sample_Comp
{
    #Comp = {
        el: { container, slide },
        sync: { container, slide },
        opt: { ease, direction, duration },
        prog: { val, time, anim, delay },
    }

    /*
    el :
    
    data-rf-comp-el-container
    data-rf-comp-el-slide

    sync :
    
    data-rf-comp-sync-container
    data-rf-comp-sync-slide

    opt :

    data-rf-comp-opt-ease
    data-rf-comp-opt-duration
    data-rf-comp-opt-direction

    prog :

    data-rf-comp-prog-val
    data-rf-comp-prog-anim
    data-rf-comp-prog-time
    data-rf-comp-prog-delat

    */
    constructor()
    {
        // el
        this.#Comp.el.container
        this.#Comp.el.slide

        // sync
        this.#Comp.sync.container
        this.#Comp.sync.slide

        // opt
        this.#Comp.opt.ease
        this.#Comp.opt.duration
        this.#Comp.opt.direction

        // prog
        this.#Comp.prog.val
        this.#Comp.prog.anim
        this.#Comp.prog.time
        this.#Comp.prog.delay
    }
}

class Icon_01
{
    #rf;

    constructor(config)
    {
        this.#rf = {};
        this.#rf.worker = {};
        this.#rf.worker.query = {};
        this.#rf.worker.attr = {};
        //
        this.#rf.worker.query.icon = config.rf.worker.query.icon;
        this.#rf.worker.attr.src = config.rf.worker.attr.src;
    }

    work ()
    {
        document.querySelectorAll(this.#rf.worker.query.icon).forEach(e =>
        {
            e.innerHTML = decodeURIComponent(e.getAttribute(this.#rf.worker.attr.src))
        });
        return this
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

class KK_Log
{
    static log_error (n, m)
    {
        console.error(` 💢 ERROR → ⭕ RedFlow → ${n} → ${m}`);
    }

    static log_success (n, m)
    {
        console.log(` ✅ SUCCESS → ⭕ RedFlow → ${n} → ${m}`);
    }

    static log_credit ()
    {
        document.body.insertAdjacentHTML(
            'afterbegin',
            `<!-- ⭕ RedFlow - Official Webflow Library by RedKet -- Copyright © 2025 RedKet. All rights reserved. -->
             <!-- Unauthorized copying, modification, or distribution is prohibited. -- Visit: www.RedKet.com | www.Red.Ket -->`
        );
        document.body.insertAdjacentHTML(
            'beforeend',
            `<!-- ⭕ RedFlow | OFFICIAL WEBFLOW LIBRARY BY REDKET © 2025 REDKET | WWW.REDKET.COM | WWW.RED.KET -->`
        );
        console.log(
            '%cRed%cFlow%c- official Webflow Library by %cRed%cKet%c\nCopyright © 2025 RedKet. All rights reserved.\nUnauthorized copying, modification, or distribution is prohibited.\nVisit: www.RedKet.com | www.Red.Ket',
            'color:#c33;background:#000;font-weight:bold;padding:2px 4px;border-radius:3px;',
            'color:#dfdfdf;background:#000;font-weight:bold;padding:2px 4px;border-radius:3px;',
            'color:#aaa;background:#000;padding:2px 4px;border-radius:3px;',
            'color:#c33;background:#000;font-weight:bold;padding:2px 4px;border-radius:3px;',
            'color:#dfdfdf;background:#000;font-weight:bold;padding:2px 4px;border-radius:3px;',
            'color:#888;font-size:11px;'
        );
    }
}

class KK extends KK_Log
{
    static #w = {
        Icon_01: Icon_01
    }

    static #components = {
        Slider01: Slider01,
        Marquee01: Marquee01,
    };

    static #CACHE_CREDIT = false;
    static #CACHE_SCRIPT = {};

    static #cdn_gsap = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js';
    static #cdn_jquary = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';

    static #loadScript (u)
    {
        // Return the cached promise if already loaded.
        if (KK.#CACHE_SCRIPT[u]) {
            return KK.#CACHE_SCRIPT[u];
        }
        // If the script is already in the DOM, resolve immediately.
        if (document.querySelector(`script[src="${u}"]`)) {
            KK.#CACHE_SCRIPT[u] = Promise.resolve();
            return KK.#CACHE_SCRIPT[u];
        }
        // Add a preload link hint if not already added.
        if (!document.querySelector(`link[rel="preload"][href="${u}"]`)) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = u;
            link.as = 'script';
            document.head.appendChild(link);
        }
        // Load the script and cache the promise.
        return (KK.#CACHE_SCRIPT[u] = new Promise((resolve, reject) =>
        {
            const script = document.createElement('script');
            script.src = u;
            script.async = true;
            script.onload = () =>
            {
                resolve();
            };
            script.onerror = () =>
            {
                KK.log_error('loadScript', `Failed to load script: ${u}`);
                reject(new Error(`Failed to load script: ${u}`));
            };
            document.body.appendChild(script);
        }));
    }

    async #createComponent (u, c, n, config = null)
    {
        try {
            await Promise.all(u.map((url) => KK.#loadScript(url)));
            return config ? new c(config) : new c();
        } catch (e) {
            KK.log_error(n, e.message);
            return null;
        }
    }

    Worker = {
        Icon_01: (config) => this.#createComponent([], KK.#w.Icon_01, 'Icon_01', config)
    }
    Component = {
        /** 
         * config = { el : { container : null, slide : null }, opt : { ease : null, duration: null, direction : null } }
         */
        marquee_01: (config) => this.#createComponent([KK.#cdn_gsap], KK.#components.Marquee01, 'Marquee 01', config),
        slider_01: (config) => this.#createComponent([KK.#cdn_gsap], KK.#components.Slider01, 'Slider 01', config),
    };

    constructor()
    {
        if (!KK.#CACHE_CREDIT) {
            KK.log_credit();
            KK.#CACHE_CREDIT = true;
        }
        KK.log_success('Constructor', 'instance initialized.');
    }
}

document.addEventListener('DOMContentLoaded', () =>
{
    const RedFlow = new RF()

    document.querySelectorAll('[data-rf-comp-el-container]').forEach((e) =>
    {
        RedFlow.Worker.Icon_01()
        /*
        if (e.getAttribute('data-rf-comp-el-container') == 'marquee_01') {

            const config = {
                el: {
                    container: e,
                    slide: e.querySelector('[data-rf-comp-el-slide'),
                },
                opt: {
                    ease: e.getAttribute('data-rf-comp-opt-ease'),
                    duration: parseFloat(e.getAttribute('data-rf-comp-opt-duration')),
                    direction: e.getAttribute('data-rf-comp-opt-direction'),
                },
            }

            RedFlow.Component.marquee_01(config).then((marquee) => marquee.run())
        }

        if (e.getAttribute('data-rf-comp-el-container') == 'slider_01') {
            const config = {}

            RedFlow.Component.slider_01(config).then((slider) => { slider })
        }
            */

    })

    /*

    

    document.querySelectorAll('[data-rf-c="marquee01"]').forEach((el) => {

    // Slider01
    document.querySelectorAll('[data-rf-c="slider01"]').forEach((el) => {
        RedFlow.comp.create.Slider01({
            tag: {
                self: el,
                mask: el.querySelector('[data-rf-c-tag-mask]'),
                next: el.querySelector('[data-rf-c-tag-next]'),
                prev: el.querySelector('[data-rf-c-tag-perv]'),
                slides: el.querySelectorAll('[data-rf-c-tag-slide'),
            },
            set: {
                ease: el.getAttribute('data-rf-c-set-ease'),
                duration: el.getAttribute('data-rf-c-set-duration'),
            },
        })
    })

    // Icon01
    document.querySelectorAll('[data-rf-c="icon01"]').forEach((el) => {
        RedFlow.comp.create.Icon01({
            tag: {
                self: el,
            },
            set: {
                svgPath: el.getAttribute('data-rf-c-set-svgpath'),
            },
        })
    })
    */
})
