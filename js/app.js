

//objet application: définir les méthodes propriétés
const app={
    contentElement: document.getElementById('content'),
    cachePages: new Map(),
    defaultPage: 'home'
};


// méthodes d'initialisation de l'application
app.init = function(){
    // initialisation de la base de données
    db.init();


    location.href = `#${app.defaultPage}`;
    app.loadPage(app.defaultPage);
    app.activePage(app.defaultPage);
    //event listener qui écoute le changement d'URL
window.addEventListener('hashchange', function(element) {
    // one passe la nouvelle URL à la casse URL en javascript
    // pour qu'il viennte la décomposer
    const url = new URL(element.newURL);
    // on retire le # du hash pour avoir la valeur
    const hash = url.hash.replace('#', '');

    // on charge la page
    app.loadPage(hash);
    app.activePage(hash);
    
})
};

app.activePage = (pageName) => {   
    const activeElement = document.querySelector('a.active')
    if(activeElement){
        activeElement.classList.remove('active');
    }
    document.querySelector(`[href='#${pageName}']`).classList.add('active');
}



app.loadPage = async (pageName) => {
    // on vérifie si la page est déjà en cache
    if(app.cachePages.has(pageName)){
        app.contentElement.innerHTML = app.cachePages.get(pageName);
        return;
    }
    // on charge la page
const response = await axios.get(`pages/${pageName}.html`)
.catch(() => null)
if(response === null){
    location.href = '#404';
}
else if (response.status === 200){
    const content = response.data;
    app.cachePages.set(pageName, content);
    app.contentElement.innerHTML = content;
}
};


// lancement de l'application
(function(){
    app.init();
})();


