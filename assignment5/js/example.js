/* ADD NEW ITEM TO END OF LIST 
* create new list and get first element of the given list
* create new tag at the end of the list and name the tag
*/      
let groceriesItem = document.createTextNode('cream');
let itemList = document.createElement('li');  
let orgList = document.getElementsByTagName('ul')[0];
orgList.appendChild(itemList);
itemList.appendChild(groceriesItem);                                               
                                           
/* ADD NEW ITEM START OF LIST
* Add kale tag to the list
* create new tag at the start of the list and name the tag
*/
groceriesItem = document.createTextNode('kale'); 
itemList = document.createElement('li');                  
itemList.appendChild(groceriesItem);                      
orgList.insertBefore(itemList, orgList.firstChild);        
               
/* ADD A CLASS OF COOL TO ALL LIST ITEMS 
* Get all the tags in the list 
* Get length to use for the for-loop
*/
let listTags = document.getElementsByTagName('li'); 
const listLength = listTags.length; 
for (let i = 0; i < listLength; ++i) {
    listTags[i].className = 'cool';
}

/* ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING 
* Create a span to add the add on header at h2
* span contain the length of the groceries list
*/     
itemList = document.createElement("SPAN");            
groceriesItem = document.createTextNode(listLength); 
itemList.appendChild(groceriesItem);

let addOnHeading = document.querySelector('h2');
addOnHeading.appendChild(itemList); 