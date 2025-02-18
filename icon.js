class Icon01
{
    #w

    constructor(config = {})
    {
        // Set up component data
        this.#w = {}
        this.#w.el = {}
        this.#w.el.self = config.tag.self

        this.#w.opt = {}
        this.#w.opt.svgPath = config.set.svgPath

        // Render the icon
        this.#render()
    }

    #render ()
    {
        if (this.#w.opt.svgPath) {
            const decodedSvg = decodeURIComponent(this.#w.opt.svgPath)
            this.#w.el.self.innerHTML = decodedSvg
        }
    }

    static initAll ()
    {
        document.querySelectorAll('[data-svg]').forEach((el) =>
        {
            new Icon01({
                tag: { self: el },
                set: { svgPath: el.getAttribute('data-svg') }
            })
        })
    }
}