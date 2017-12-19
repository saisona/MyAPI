function getNavigator () {
  let browserName = navigator.appName;
  let fullVersion = '' + parseFloat(navigator.appVersion);
  let nameOffset, verOffset, ix;
  const nAgt = navigator.userAgent;
  
  if ((verOffset = nAgt.indexOf("Opera")) !== -1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf("Version")) !== -1)
      fullVersion = nAgt.substring(verOffset + 8);
  }
  else if ((verOffset = nAgt.indexOf("MSIE")) !== -1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = nAgt.substring(verOffset + 5);
  }
  else if ((verOffset = nAgt.indexOf("Chrome")) !== -1) {
    browserName = "Chrome";
    fullVersion = nAgt.substring(verOffset + 7);
  }
  else if ((verOffset = nAgt.indexOf("Safari")) !== -1) {
    browserName = "Safari";
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf("Version")) !== -1)
      fullVersion = nAgt.substring(verOffset + 8);
  }
  else if ((verOffset = nAgt.indexOf("Firefox")) !== -1) {
    browserName = "Firefox";
    fullVersion = nAgt.substring(verOffset + 8);
  }
  else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
    if (browserName.toLowerCase() === browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
  }
  if ((ix = fullVersion.indexOf(";")) !== -1)
    fullVersion = fullVersion.substring(0, ix);
  if ((ix = fullVersion.indexOf(" ")) !== -1)
    fullVersion = fullVersion.substring(0, ix);
  
  let majorVersion = parseInt('' + fullVersion, 10);
  if (isNaN(majorVersion)) {
    fullVersion = '' + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
  }
  
  return {
    browserName,
    fullVersion,
    majorVersion,
    nAgt
  };
}

function generateCollect () {
  const navigator_data = getNavigator();
  const connection = window.navigator.connection;
  if (!navigator.getBattery) {
    return getGeolocation().then(geolocation => {
      return {
        payload: {
          connection: connection.effectiveType,
          downlink: connection.downlink,
          platform: window.navigator.platform,
          navigator: {
            name: navigator_data.browserName,
            fullVersion: navigator_data.fullVersion,
            agent: navigator_data.nAgt
          },
          geolocation: {
            latitude: geolocation.coords.latitude,
            longitude: geolocation.coords.longitude,
            accuracy: geolocation.coords.accuracy + 'm',
            altitude: geolocation.coords.altitude
          }
        }
      };
    }).catch(err => {
      return {
        payload: {
          connection: connection.effectiveType,
          downlink: connection.downlink,
          platform: window.navigator.platform,
          navigator: {
            name: navigator_data.browserName,
            fullVersion: navigator_data.fullVersion,
            agent: navigator_data.nAgt
          },
          geolocation: {
            err: err
          }
        }
      };
    });
  } else
    return navigator.getBattery().then(battery => {
      return getGeolocation().then(geolocation => {
        return {
          payload: {
            connection: connection.effectiveType,
            downlink: connection.downlink,
            platform: window.navigator.platform,
            battery: `${battery.level * 100}%`,
            navigator: {
              name: navigator_data.browserName,
              fullVersion: navigator_data.fullVersion,
              agent: navigator_data.nAgt
            },
            geolocation: {
              latitude: geolocation.coords.latitude,
              longitude: geolocation.coords.longitude,
              accuracy: geolocation.coords.accuracy + 'm',
              altitude: geolocation.coords.altitude
            }
          }
        };
      }).catch(err => {
        return {
          payload: {
            connection: connection.effectiveType,
            downlink: connection.downlink,
            platform: window.navigator.platform,
            battery: `${battery.level * 100}%`,
            navigator: {
              name: navigator_data.browserName,
              fullVersion: navigator_data.fullVersion,
              agent: navigator_data.nAgt
            },
            geolocation: {
              err: err
            }
          }
        };
      });
    });
}

function getGeolocation () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options_geolocation);
  });
}

const options_geolocation = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};







