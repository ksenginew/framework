const TYPE = Symbol()

export function render(comp, target) {
    if (comp[TYPE] !== 0) throw Error()
    if (typeof comp.name === "function") return render(comp.name(comp.props), target)
    let el = document.createElement(comp.name)
    for (const prop in comp.props) {
        if (Object.hasOwnProperty.call(comp.props, prop)) {
            const val = comp.props[prop];
            el.setAttribute(prop, val)
        }
    }
    for (const child of comp.props.children) {
        if (child[TYPE] == 0)
            render(child, el)
        else {
            let tt = document.createTextNode(child)
            el.appendChild(tt)
        }
    }
    target.appendChild(el)
}

export function h(name, props, ...children) {
    props = props || {}
    props.children = props.children || children
    return {
        [TYPE]: 0,
        name,
        props
    }
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
            if (props?.class === 'rrr') console.log(el)

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