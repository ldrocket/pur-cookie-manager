$(document).ready(function () {
  if($('div.modal__content').length) {
    setTimeout(function () {
      location.reload();
    }, 3000);
  }
});

function onError(error) {
  console.log(`Error: ${error}`);
}

function onGotGolemIubValue(item) {
  document.cookie = "golem_iub=" + item.golem_iub_value + "; domain=.golem.de; path=/";
}

function onGotGolemUsubValue(item) {
  document.cookie = "golem_usub=" + item.golem_usub_value + "; domain=.golem.de; path=/";
}

let getGolemIubValue = browser.storage.sync.get("golem_iub_value");
getGolemIubValue.then(onGotGolemIubValue, onError);

let getGolemUsubValue = browser.storage.sync.get("golem_usub_value");
getGolemUsubValue.then(onGotGolemUsubValue, onError);
