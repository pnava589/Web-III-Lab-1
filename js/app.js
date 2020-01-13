// add code here -- do your data fetch and manipulations after DOM loaded
    document.addEventListener("DOMContentLoaded", function() {
    
    run();

    }, false);


    function run()
    {
        hideElement("#selector");
        readJson();
        clear();
    }

    async function readJson()
    {
        const result = await fetch('http://www.randyconnolly.com/funwebdev/3rd/api/movie/movies.php');
        let list = await result.json();
        unHideElement("#selector");
        hideElement("#loader");
        const sortedList = sortList(list);
        populateList(sortedList);
    }

    function sortList(list)
    {
        list.sort(function(a,b)
        {
            var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
            if(nameA < nameB){return -1;}
            if(nameA > nameB){return 1;}
            else {return 0;}
        })
    
    return list;
    
    }

    function populateList(list)
    {
        console.log(list);
        const select = getElement("#movieChooser");
        for(item of list)
        {
            let option = document.createElement("option");
            option.setAttribute("value",item.id);
            option.textContent = item.title;
            select.appendChild(option);
        } 
        getSelection(list,select);
    }


    function getSelection (list,select)
    {
        select.onchange = function ()
        {
            let found = list.find(s => s.id == select.value);
            if (typeof(found) != 'undefined'){clickAdd(found);}
        }

    }
    
    function clickAdd(selection)
    
    {
        const addButton = getElement("#btnAdd");
        addButton.onclick = function(){addImage(selection);}
    }
    
    function addImage(item)
    {
        const listBullet = document.createElement("li");
        listBullet.classList.add("panel-block");
        const figure = document.createElement("figure");
        figure.classList.add("media-left");
        const image = document.createElement("img");
        const Link = 'https://image.tmdb.org/t/p/w92'+item.poster;
        image.setAttribute("src",Link);
        const title = document.createElement("p");
        title.innerHTML = item.title;
        figure.appendChild(image);
        listBullet.appendChild(figure);
        listBullet.appendChild(title);
        const favorites = getElement("#favorites");
        favorites.appendChild(listBullet);
    
    }

    function clear()
    {
        const clear = getElement("#btnClear");
        clear.onclick = function() 
        {
            const favorites = getElement("#favorites");
            favorites.innerHTML = "";
        }
    }

    function hideElement(reference)
    {
        const element = getElement(reference);
        element.classList.add("is-hidden");
    }

    function unHideElement(reference)
    {
        const element = getElement(reference);
        element.classList.remove("is-hidden");
    }

    function getElement(reference)
    {
        return document.querySelector(reference);
    }