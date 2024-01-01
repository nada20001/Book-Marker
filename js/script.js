var webSiteName = document.querySelector("#siteName");
var webSiteUrl = document.querySelector("#siteUrl");
var submitButton = document.querySelector("#submit");
var search = document.querySelector("#searchBookmarkInput");
var temp;

if (localStorage.getItem("allBookMarks") == null) {
  var bookMarks = [];
} else {
  var bookMarks = JSON.parse(localStorage.getItem("allBookMarks"));
  display();
}

// Submit 'add or update'
submitButton.onclick = function () {
  if (validateName() == true && validateUrl() == true) {
    var bookmark = {
      bookMarkName: webSiteName.value,
      bookMarkUrl: webSiteUrl.value,
    };

    if (submitButton.innerHTML == "Update") {
      afterUpdate();
      display();
    } else {
      bookMarks.push(bookmark);
      localStorage.setItem("allBookMarks", JSON.stringify(bookMarks));
      // console.log(bookMarks);
      display();
    }
  } else {
    alert("Enter a valid input");
  }
};

// display
function display() {
  var card = "";
  for (i = 0; i < bookMarks.length; i++) {
    card += `
    <div class="box col-md-12  d-flex justify-content-between">
                  <h3 class="">${bookMarks[i].bookMarkName}</h3>
                                    <div class="btns">

                  <button  class="btn btn-info "><a target="_blank"  href="${bookMarks[i].bookMarkUrl}">Visit</a></button>
                  <button onclick="updateItem(${i})"  class="btn btn-warning ">Update</button>
                  <button onclick="deleteBookmark(${i})"  class="btn btn-danger ">Delete</button>
              </div>
                            </div>

    
    `;
    document.querySelector("#savedBookMark").innerHTML = card;
  }
}
// Update
function updateItem(i) {
  temp = i;
  webSiteName.value = bookMarks[i].bookMarkName;
  webSiteUrl.value = bookMarks[i].bookMarkUrl;
  submitButton.innerHTML = "Update";
}
function afterUpdate() {
  bookMarks[temp].bookMarkName = webSiteName.value;
  bookMarks[temp].bookMarkUrl = webSiteUrl.value;
  localStorage.setItem("allBookMarks", JSON.stringify(bookMarks));

  submitButton.innerHTML = "Submit";
  // console.log(bookMarks);
}
// Clear all
function clearAll() {
  webSiteName.value = "";
  webSiteUrl.value = "";
}
// Search
function searchBookmark() {
  var card = "";
  for (i = 0; i < bookMarks.length; i++) {
    if (
      bookMarks[i].bookMarkName
        .toLowerCase()
        .includes(search.value.toLowerCase())
    ) {
      card += `
    <div class="box col-md-12  d-flex justify-content-between">
                  <h3 class="">${bookMarks[i].bookMarkName}</h3>
                                                      <div class="btns">

                  <button  class="btn btn-info"><a target="_blank" href="${bookMarks[i].bookMarkUrl}">Visit</a></button>
                  <button onclick="updateItem(${i})"  class="btn btn-warning">Update</button>
                  <button onclick="deleteBookmark(${i})"  class="btn btn-danger">Delete</button>
                </div>
              </div>
    
    `;
    }
  }
  document.querySelector("#savedBookMark").innerHTML = card;
}
// Delete
function deleteBookmark(index) {
  bookMarks.splice(index, 1);
  // console.log(bookMarks);
  localStorage.removeItem("allBookMarks", JSON.stringify(bookMarks));
  display();
}
// Validation
function validateName() {
  var nameRegex = /\w/;
  var name = webSiteName.value;
  if (nameRegex.test(name) == true) {
    return true;
  } else {
    return false;
  }
}
function validateUrl() {
  var urlRegex = /https?:\/\/(www.)?\w+.\w+/gi;
  var url = webSiteUrl.value;
  if (urlRegex.test(url) == true) {
    return true;
  } else {
    return false;
  }
}
