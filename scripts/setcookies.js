$(document).ready(function () {
  var url = window.location.href;
  var nUrl = new URL(url);
  var consentUrlGolem = "https://www.golem.de/sonstiges/zustimmung/auswahl.html?";
  var consentUrlHeise = "https://www.heise.de/";
  var consentUrlSpiegel = "https://www.spiegel.de/";
  var consentUrlZeit = "https://www.zeit.de/zustimmung?";
  
  var redirect, firstCookie, secondCookie, firstCookieStorage, secondCookieStorage, firstCookieDomain,
    secondCookieDomain, firstCookieOptions, secondCookieOptions;

  redirect = firstCookie = secondCookie = firstCookieStorage = secondCookieStorage = firstCookieDomain =
    secondCookieDomain = "";

  firstCookieOptions = secondCookieOptions = "Secure; SameSite=None";
  
  if( url.includes(consentUrlGolem) ) {
    redirect = nUrl.searchParams.get("from");
    firstCookie = firstCookieStorage = "golem_iub";
    firstCookieDomain = ".golem.de";
  }
  else if( url.includes(consentUrlHeise) ) {
    redirect = "refresh";
    firstCookie = "hacc";
    firstCookieStorage = "heise_hacc";
    firstCookieDomain = "www.heise.de";
  }
  else if( url.includes(consentUrlSpiegel) ) {
    redirect = "refresh";
    firstCookie = "accessInfo";
    firstCookieStorage = "spiegel_accessInfo";
    firstCookieDomain = ".spiegel.de";
  }
  else if( url.includes(consentUrlZeit) ) {
    redirect = nUrl.searchParams.get("url");
    firstCookie = firstCookieStorage = "zeit_sso_201501";
    secondCookie = secondCookieStorage = "zeit_sso_session_201501";
    firstCookieDomain = secondCookieDomain = ".zeit.de";
    firstCookieOptions = secondCookieOptions = "Secure; SameSite=Lax";
  }

  if( !document.cookie.split(';').some((cookie) => cookie.trim().startsWith(firstCookie)) ) {
    var getFirst = browser.storage.sync.get(firstCookieStorage);
    getFirst.then((cookie) => {
      document.cookie = firstCookie + "=" + Object.values(cookie)[0] + "; domain=" + firstCookieDomain +
        "; path=/; " + firstCookieOptions;
    });
    
    if( secondCookie ) {
      var getSecond = browser.storage.sync.get(secondCookieStorage);    
      getSecond.then((cookie) => {
        document.cookie = secondCookie + "=" + Object.values(cookie)[0] + "; domain=" + secondCookieDomain +
          "; path=/; " + secondCookieOptions;
      });
    }

    if( redirect === "refresh" ) {
      window.location.reload();
    }
    else {
      window.location.replace(redirect);
    }
  }
});