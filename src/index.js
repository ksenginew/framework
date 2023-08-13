const COMPONENT = Symbol()

export function render(comp, target) {
    comp.c()
    comp.m(target)
}

export function h(el, props, ...children) {
    if (typeof el == 'function') {
        let comp = el(props, children)
        comp.c()
        return comp
    }
    let comp;
    let carr = []
    return {
        [COMPONENT]: true,
        c() {
            if(props?.class === 'rrr') console.log(el)
            comp = document.createElement(el)
            if (props)
                for (const prop in props) {
                    if (Object.hasOwnProperty.call(props, prop)) {
                        const val = props[prop];
                        comp.setAttribute(prop, val)
                    }
                }
            for (const child of children) {
                if (child[COMPONENT]) {
                    child.c()
                    carr.push(child)
                } else if (typeof child === 'string') {
                    let tt = document.createTextNode(child)
                    carr.push({ m(target) { target.appendChild(tt) } })
                }
            }
        },
        m(target) {
            carr.forEach(c => c.m(comp))
            target.appendChild(comp)
        }
    }
}
export function Fragment(...args) {
    return JSON.stringify(args, void 0, 2)
}