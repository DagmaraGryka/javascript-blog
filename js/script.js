'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';




function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('event');
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}


function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);


  let html = '';

  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */
    // const linkHTML = '<li><a href="#"><span></span></a></li>';
    // const linkHTML = '<li><a href="#' + '"><span>' + '</span></a></li>';
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    //titleList.innerHTML = titleList.innerHTML + linkHTML;
    // element.insertAdjacentHTML(position, text); ?????????????
    // linkHTML.insertAdjacentHTML(?, HTML); ???????

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();


function calculateTagsParams(tags){

  const params = { min: 999999, max: 0};

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if(tags[tag] > params.max){
      params.max = tags[tag];
    } else if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }

  return params;
}


function calculateTagsClass(count, params){

}


function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll('.post');
  console.log(articles);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = ' ';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag);

      /* generate HTML of the link */ // ???
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  console.log(tagList);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  let allTagsHTML = '';

  /*[NEW] START LOOP: for each tag in allTags */
  for(let tag in allTags){
    /*[NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML +=  '<li> <a class="'+ calculateTagsClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"> ' + tag + ' </a>';
    allTagsHTML += '<li><a class="' + calculateTagsClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"> ' + tag + ' </a></li>';
    /*[NEW] END lOOP: for each tag in allTags */
  }

  /* [NEW] add htm; from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}

generateTags();


function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);
  /* START LOOP: for each active tag link */
  for(const activeTagLink of activeTagLinks){
    /* remove class active */
    activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(targetTagLinks);
  /* START LOOP: for each found tag link */
  for(let targetTagLink of targetTagLinks){
    /* add class active */
    targetTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */
  const linkTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(linkTags);
  /* START LOOP: for each link */
  for(let linkTag of linkTags){
    /* add tagClickHandler as event listener for that link */
    linkTag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();


function generateAuthors(){

  const articles = document.querySelectorAll('.post'); //find articles
  console.log(articles);

  for(let article of articles){  //start loop

    const authorsWrapper = article.querySelector(optArticleAuthorSelector); // find authors wrapper
    console.log(authorsWrapper);

    let html = ' '; // make html variable with empty string

    const tagAuthor = article.getAttribute('data-author'); // get tags from data-author attribute
    console.log(tagAuthor);

    const linkHTML = '<a href="#author-' + tagAuthor + '">' + tagAuthor + '</a>'; // generate HTML of the link
    console.log(linkHTML);

    html = html + linkHTML; // add generated code to html variable

    authorsWrapper.innerHTML = html; // insert HTML of all the links into the author wrapper
  }

}

generateAuthors();


function authorClickHandler(event){

  event.preventDefault(); //prevent default action for this event

  const clickedElement = this; //make new constant named "clickedElement" and give it the value of "this"
  console.log(clickedElement);

  const href = clickedElement.getAttribute('href'); //make a new constant "href" and read the attribute "href" of the clicked element
  console.log(href);

  const author = href.replace('#author-', ''); //make a new constant  and extract it from the "href" constant
  console.log(author);

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]'); //find all author links with class active
  console.log(activeAuthorLinks);

  for(const activeAuthorLink of activeAuthorLinks){ // for each active tag link
    activeAuthorLink.classList.remove('active'); //remove class active
  }

  const targetAuthorLinks = document.querySelectorAll('a[href="' + href + '"]'); // find all author links with "href" attribute equal to the "href" constant
  console.log(targetAuthorLinks);

  for(const targetAuthorLink of targetAuthorLinks){ //each found tag link
    targetAuthorLink.classList.add('active'); //add class active
  }

  generateTitleLinks('[data-author="' + author + '"]'); //execute function "generateTitleLinks" with article selector as argument
}


function addClickListenersToAuthors(){

  const linkAuthors = document.querySelectorAll('a[href^="#author-"]'); // find all links to tags
  console.log(linkAuthors);

  for(const linkAuthor of linkAuthors){
    linkAuthor.addEventListener('click', authorClickHandler); // add authorClickHandler as event listener for that link
  }

}

addClickListenersToAuthors();
