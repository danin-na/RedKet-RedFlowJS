class Marquee01
{
    #Comp

    constructor(config = {})
    {

        //Set Attr
        this.#Comp = {}
        this.#Comp.el = {}
        this.#Comp.sync = {}
        this.#Comp.opt = {}
        this.#Comp.prog = {}

        /**
         * data-rf-comp-
         */

        this.#Comp.el.container = config.el.container
        this.#Comp.el.slide = config.el.slide

        this.#Comp.sync.container = null
        this.#Comp.sync.slide = null

        this.#Comp.opt.ease = config.opt.ease || 'none'
        this.#Comp.opt.direction = config.opt.direction || 'left'
        this.#Comp.opt.duration = config.opt.duration || 30

        this.#Comp.prog.val = 0
        this.#Comp.prog.time = null
        this.#Comp.prog.anim = null
        this.#Comp.prog.delay = 200

        this.#Comp.el.slide.setAttribute('data-slide-item', '')
        this.#Comp.el.container.append(this.#Comp.el.slide.cloneNode(true))
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
        const prog = this.#reset(this.#Comp.prog.anim)
        const items = this.#Comp.el.container.querySelectorAll('[data-slide-item]')
        const width = parseInt(getComputedStyle(items[0]).width, 10)
        const [xFrom, xTo] = this.#Comp.opt.direction === 'left' ? [0, -width] : [-width, 0]

        this.#Comp.prog.anim = gsap.fromTo(
            items,
            { x: xFrom },
            {
                x: xTo,
                duration: this.#Comp.opt.duration,
                ease: this.#Comp.opt.ease,
                repeat: -1,
            }
        )
        this.#Comp.prog.anim.progress(prog)
    }

    run ()
    {

        this.#render()
        window.addEventListener('resize', () =>
        {
            clearTimeout(this.#Comp.prog.time)
            this.#Comp.prog.time = setTimeout(() => this.#render(), this.#Comp.prog.delay)
        })
    }
}