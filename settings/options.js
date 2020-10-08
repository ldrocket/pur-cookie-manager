function saveOptions(e) {
  e.preventDefault();
  
  browser.storage.sync.set({
    golem_iub_value: document.querySelector("#golem_iub_value").value,
    golem_usub_value: document.querySelector("#golem_usub_value").value
  });
}

function restoreOptions() {

  function onError(error) {
    console.log(`Error: ${error}`);
  }
  
  function setGolemIubValue(result) {
    document.querySelector("#golem_iub_value").value = result.golem_iub_value || "";
  }
  
  function setGolemUsubValue(result) {
    document.querySelector("#golem_usub_value").value = result.golem_usub_value || "";
  }

  let getGolemIubValue = browser.storage.sync.get("golem_iub_value");
  getGolemIubValue.then(setGolemIubValue, onError);

  let getGolemUsubValue = browser.storage.sync.get("golem_usub_value");
  getGolemUsubValue.then(setGolemUsubValue, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
