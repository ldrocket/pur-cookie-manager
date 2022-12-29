function saveOptions(e) {
  e.preventDefault();
  
  browser.storage.sync.set({
    golem_iub: document.querySelector("#golem_iub").value,
    heise_hacc: document.querySelector("#heise_hacc").value,
    spiegel_accessInfo: document.querySelector("#spiegel_accessInfo").value,
    zeit_sso_201501: document.querySelector("#zeit_sso_201501").value,
    zeit_sso_session_201501: document.querySelector("#zeit_sso_session_201501").value
  });
}

function restoreOptions() {

  function onError(error) {
    console.log(`Error: ${error}`);
  }
  
  // Golem.de
  function setGolemIub(result) {
    document.querySelector("#golem_iub").value = result.golem_iub || "";
  }
  
  let getGolemIub = browser.storage.sync.get("golem_iub");
  getGolemIub.then(setGolemIub, onError);
  
  // heise online
  function setHeiseHacc(result) {
    document.querySelector("#heise_hacc").value = result.heise_hacc || "";
  }

  let getHeiseHacc = browser.storage.sync.get("heise_hacc");
  getHeiseHacc.then(setHeiseHacc, onError);
  
  
  // DER SPIEGEL
  function setSpiegelAccessInfo(result) {
    document.querySelector("#spiegel_accessInfo").value = result.spiegel_accessInfo || "";
  }
  
  let getSpiegelAccessInfo = browser.storage.sync.get("spiegel_accessInfo");
  getSpiegelAccessInfo.then(setSpiegelAccessInfo, onError);
  
  // ZEIT ONLINE
  function setZeitSso(result) {
    document.querySelector("#zeit_sso_201501").value = result.zeit_sso_201501 || "";
  }
  
  function setZeitSsoSession(result) {
    document.querySelector("#zeit_sso_session_201501").value = result.zeit_sso_session_201501 || "";
  }
  
  let getZeitSso = browser.storage.sync.get("zeit_sso_201501");
  getZeitSso.then(setZeitSso, onError);

  let getZeitSsoSession = browser.storage.sync.get("zeit_sso_session_201501");
  getZeitSsoSession.then(setZeitSsoSession, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);