class Marquee01
{
    #Comp;

    constructor(c = {})
    {
        // Initialize the new structure
        this.#Comp = {
            el: {
                container: c.tag?.self,
                slide: c.tag?.item,
            },
            sync: {
                container: null, // reserved for future synchronization logic
                slide: null,
            },
            opt: {
                ease: c.set?.ease || "none",
                direction: c.set?.direction || "left",
                duration: parseFloat(c.set?.duration) || 30,
            },
            prog: {
                val: 0,     // previously "self"
                time: null, // previously "id"
                anim: null,
                delay: 200,
            },
        };

        // Set up the slide element and duplicate it for the marquee effect
        this.#Comp.el.slide.setAttribute("data-ff", "");
        this.#Comp.el.container.append(this.#Comp.el.slide.cloneNode(true));

        // Start the render loop
        this.#render();

        // Update the animation on window resize
        window.addEventListener("resize", () =>
        {
            clearTimeout(this.#Comp.prog.time);
            this.#Comp.prog.time = setTimeout(() => this.#render(), this.#Comp.prog.delay);
        });
    }

    // Resets an ongoing animation and returns its progress value
    #reset (animation)
    {
        if (!animation) return 0;
        const savedProgress = animation.progress();
        animation.progress(0).kill();
        return savedProgress;
    }

    // Renders (or re-renders) the marquee animation using GSAP
    #render ()
    {
        const prog = this.#reset(this.#Comp.prog.anim);
        const items = this.#Comp.el.container.querySelectorAll("[data-ff]");
        const width = parseInt(getComputedStyle(items[0]).width, 10);
        const [xFrom, xTo] = this.#Comp.opt.direction === "left"
            ? [0, -width]
            : [-width, 0];

        this.#Comp.prog.anim = gsap.fromTo(
            items,
            { x: xFrom },
            {
                x: xTo,
                duration: this.#Comp.opt.duration,
                ease: this.#Comp.opt.ease,
                repeat: -1,
            }
        );
        this.#Comp.prog.anim.progress(prog);
    }
}
