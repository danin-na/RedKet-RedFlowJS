class Icon_01
{
    #rf = {
        worker: {
            tag: { target: null },
            opt: { source: null },
        },
    }

    constructor(config = {})
    {
        this.#rf.worker.tag.target = config.rf.worker.id.target // data-rf-worker-id-targetID
        this.#rf.worker.opt.source = config.rf.worker.opt.source // data-rf-worker-tag-source
        console.log(config)
    }
    work ()
    {
        document.querySelectorAll(`[${this.#rf.worker.tag.target}]`).forEach((e) =>
        {
            e.innerHTML = decodeURIComponent(e.getAttribute(this.#rf.worker.opt.source))
        })
        return this
    }
}


class Marquee_xx
{
    #rf = {
        component: {
            e: {
                tag: { self, slider },
                opt: { ease, duration, direction },
                prog: { delay, time, anim }
            }
        }
    }


    constructor(config = {})
    {
        this.#rf.component.e.tag.self = config.rf.component.e.tag.self                          // rf-component-e-tag-self
        this.#rf.component.e.tag.slider = config.rf.component.e.tag.slider                      // rf-component-e-tag-slider

        this.#rf.component.e.opt.ease = config.rf.component.e.opt.ease || 'none';               // rf-component-e-opt-ease
        this.#rf.component.e.opt.duration = config.rf.component.e.opt.duration || 30;           // rf-component-e-opt-duration
        this.#rf.component.e.opt.direction = config.rf.component.e.opt.direction || 'left';     // rf-component-e-opt-diraction

        this.#rf.component.e.prog.delay = 200
        this.#rf.component.e.prog.time = null;
        this.#rf.component.e.prog.anim = null;

        // Set data attribute using new naming convention
        this.#rf.component.e.tag.slider.setAttribute('rf-component-self-selector', '');
        this.#rf.component.e.tag.self.append(this.#rf.component.e.tag.slider.cloneNode(true));
    }

    #reset (animation)
    {
        if (!animation) return 0;
        const savedProgress = animation.progress();
        animation.progress(0).kill();
        return savedProgress;
    }

    #render ()
    {
        const prog = this.#reset(this.#rf.component.e.prog.anim);
        const items = this.#rf.component.e.tag.self.querySelectorAll('[rf-component-self-selector]');
        const width = parseInt(getComputedStyle(items[0]).width, 10);
        const [xFrom, xTo] = this.#rf.component.e.opt.direction === 'left'
            ? [0, -width]
            : [-width, 0];

        this.#rf.component.e.prog.anim = gsap.fromTo(
            items,
            { x: xFrom },
            {
                x: xTo,
                duration: this.#rf.component.e.opt.duration,
                ease: this.#rf.component.e.opt.ease,
                repeat: -1,
            }
        );
        this.#rf.component.e.prog.anim.progress(prog);
    }

    run ()
    {
        this.#render();
        window.addEventListener('resize', () =>
        {
            clearTimeout(this.#rf.component.e.prog.time);
            this.#rf.component.e.prog.time = setTimeout(() => this.#render(), this.#rf.component.e.prog.delay);
        });
    }
}
