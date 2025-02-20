class IconWorker
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

    run ()
    {
        document.addEventListener('DOMContentLoaded', () =>
        {
            document.querySelectorAll(this.#rf.worker.query.icon).forEach(e =>
            {
                e.innerHTML = decodeURIComponent(e.getAttribute(this.#rf.worker.attr.src))
            });
        });
    }
}

// Example configuration and usage:
const config = {
    rf: {
        worker: {
            query: {
                icon: '.icon'
            },
            attr: {
                src: 'data-svg-src' // The attribute name holding the encoded SVG data
            }
        }
    }
};
