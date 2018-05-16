const router = conf => (target, key, descriptor) => {
    conf.path = normalizePath(conf.path);

    routerMap.set({target: target, ...conf}, target[key])
}