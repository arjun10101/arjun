let conf;

function initRemoteConfig() {
  const remoteConfig = firebase.remoteConfig();
  remoteConfig.settings.minimumFetchIntervalMillis = 20000;

  remoteConfig
      .fetchAndActivate()
      .then(() => {
        conf = remoteConfig.getString("SettingsV3");
      })
      .catch((err) => {
        console.log("config error: " + err);
      });
}

async function sendConfig() {
  while(conf === undefined)
  {
    await sleep(2000)
  }
  window.unityInstance.SendMessage('MainMenuManagers', 'ActivateRemoteSettings', conf === undefined ? "" : conf);
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}