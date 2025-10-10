const categoryContainer = document.getElementById("category-container")

const newsContainer = document.getElementById("newsContainer")

const  bookmarkContainer = document.getElementById("bookmarkContainer")

const bookmarkCount = document.getElementById("bookmarkCount")

const newsDetailsModal = document.getElementById('news-details-modal')

const modalContainer = document.getElementById('modalContainer')

let bookmarks = [] 

const loadCategory = () => {
    fetch("https://news-api-fs.vercel.app/api/categories")
        .then((res) => res.json())
        .then((data )=> {
            const categories = data.categories;
            showCategory(categories);
        })
        .catch((err) => {
            console.log(err);
        })
};

const showCategory = (categories) => {   //
      categories.forEach(cat => {
                categoryContainer.innerHTML += `
                 <li id="${cat.id}" class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">${cat.title}</li>
                `
            });
            categoryContainer.addEventListener('click', (e) =>{  //click function---------------->
                   
                // deleting border bottom------------------>
                const allLi = document.querySelectorAll('li') 
                allLi.forEach(li => {
                    li.classList.remove('border-b-4')
                })

                  // adding border bottom  indicator----------------->
                 if(e.target.localName === 'li'){   
                    // console.log(e.target.id)
                    showLoading()
                    e.target.classList.add('border-b-4');
                   loadNewsByCategory(e.target.id)

                 }
                 
            })

};

// 
const loadNewsByCategory = (categoryId)=> {
    console.log(categoryId)
    fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res)=> res.json())
    .then((data) => {
         
        showNewsByCategory(data.articles)
    })
    .catch(err =>{
      showError()
    })
}

const showNewsByCategory = (articles) => {
    if(articles.length ===0 ){
        showEmptyMessage()
        return
    }

    newsContainer.innerHTML = "" 

     articles.forEach(article => {
        newsContainer.innerHTML +=`
        <div class ="border border-gray-400 rounded-lg">
           <div>
           <img class="rounded-lg" src = "${article.image.srcset[5].url}"
           </div>
            <div id="${article.id}" class="p-2">
                <h1 class = "font-bold">${article.title} </h1>
                 <p class ="text-sm">${article.time}</p>
                 <button class="btn">Bookmark</button>
                 <button class="btn">View details</button>
            </div>
        </div>
        `
     })

     
}

newsContainer.addEventListener('click', (e)=>{
    // console.log(e.target)
     if(e.target.innerText === 'Bookmark'){
         handleBookmarks(e);
     }
     if(e.target.innerText === 'View details'){
        
      handleViewDetails(e)
     }
})

const handleBookmarks = (e) =>{
        const title = e.target.parentNode.children[0].innerText
        const id = e.target.parentNode.id
        //console.log(id);

        bookmarks.push({
            title: title,
            id: id
        })
       // console.log(Bookmarks)
       showBookmarks(bookmarks)
       bookmarkCount.innerText = bookmarks.length  // count the book mark 
}


const handleViewBook = (e)=>{
         const id = e.target.parentNode.id
         console.log(id);
}

const showBookmarks = (bookmarks)=>{

    console.log(bookmarks)
       bookmarkContainer.innerHTML=""

      bookmarks.forEach(bookmark =>{
              bookmarkContainer.innerHTML += `
               <div class="p-3 border border-gray-600 rounded-sm my-2">
                   <h1>${bookmark.title}</h1>
                   <button  onclick="handleDeleteBookmark('${bookmark.id}')"  class = "btn btn-xs">delete</button>
               </div>
              `
      })
}

const handleDeleteBookmark = (bookmarkId) =>{
     
     const filteredBookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
     bookmarks =filteredBookmarks
     showBookmarks(bookmarks)
}

handleViewDetails = (e)=>{   ///api call
        const id = e.target.parentNode.id
        // console.log(id)
        // newsDetailsModal.showModal()
        fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
        .then((res) => res.json())
        .then((data)=> {
               showDetailsNews(data.article)
        })
        .catch(err => {  // handle error
            console.log(err)
        })
}
  
//show in screen
const showDetailsNews = (article)=>{
     newsDetailsModal.showModal()
     console.log(article)

     modalContainer.innerHTML =`
       <h1>${article.title} </h1>
       <img src="${article.images[0].url}"/>
        <p>${article.content.join(" ")}</p>
     `
}

const showLoading = ()=>{
    newsContainer.innerHTML = `
       <div class="bg-red-500 text-white p-3">Loading.......</div>
    `
}

const showError = () =>{
     newsContainer.innerHTML = `
       <div class="bg-red-500 text-white p-3">Something went wrong</div>`
}

const showEmptyMessage = () =>{
  newsContainer.innerHTML = `
       <div class="bg-orange-500 text-white p-3">No news fount for this category</div>`
}

loadCategory();
loadNewsByCategory(`main`); //show main page direct












// const loadCategoryAsync = async() =>{
//     try{
//         const res = await fetch("https://news-api-fs.vercel.app/api/categories");
//         const data = await res.json();
//         console.log(data)

//     }catch(error){
//         console.log(error)
//     }
    
// }

// loadCategoryAsync();