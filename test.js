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
