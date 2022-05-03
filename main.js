const routes = {
    '/about': {
        name: 'about',
        desc: '关于页面',
    },
    '/more': {
        name: 'more',
        desc: '更多页面',
    },
    '/other': {
        name: 'other',
        desc: '其他页面'
    },
    '/404': {
        name: '404',
        title: '404',
        desc: '未找到页面！'
    }

}


const root = document.getElementById('root');
const links = document.querySelector('.route-links');
links.addEventListener('click', async (e) => {
    if (e.target.matches('a')) {
        e.preventDefault();
        await useRouter(e);
    }
})

const useRouter = async function (e) {
    e = e || window.event;
    e.preventDefault();
    window.history.pushState({ path: window.location.pathname }, '', e.target.href);
    renderPage();
}

const renderPage = async function () {
    const pathname = window.location.pathname;
    const route = routes[pathname] || routes['/404'];
    const res = await fetch(`/routerTest/routePage/${route.name}.html`);
    root.innerHTML = await res.text();
    document.querySelector("meta[name='description']").setAttribute('content', route.desc);
    document.title = route.name;
}

window.onpopstate = renderPage;