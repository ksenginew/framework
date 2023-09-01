const TYPE = Symbol()

export function render(comp, target) {
    if (comp[TYPE] !== 0) throw Error()
    if (typeof comp.name === "function") return render(comp.name(comp.props), target)
    const { children, ...props } = comp.props
    let el = document.createElement(comp.name)
    for (const prop in props) {
        if (Object.hasOwnProperty.call(props, prop)) {
            const val = props[prop];
            if (/^on/.test(prop))
                el.addEventListener(prop.slice(2).toLowerCase(), val)
            else if (prop === 'style' && typeof val == 'object')
                for (const p in prop) {
                    if (Object.hasOwnProperty.call(prop, p)) {
                        const v = prop[p];
                        el.style[p] = v
                    }
                }
            else
                el.setAttribute(prop, val)
        }
    }
    for (const child of children) {
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
}
export function Fragment(...args) {
    return JSON.stringify(args, void 0, 2)
}
